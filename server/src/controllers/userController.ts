import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
      } as any,
    });

    const token = jwt.sign(
      { userId: newUser.id },
      process.env.SECRET as string,
      {
        expiresIn: '1h',
      }
    );

    res.status(201).json({ message: 'User registered', token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!existingUser) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: existingUser.id },
      process.env.SECRET as string,
      {
        expiresIn: '1h',
      }
    );

    return res.status(200).json({
      message: 'User logged in',
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const isAuth = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const decodedToken = jwt.verify(token, process.env.SECRET as string) as {
      userId: number;
    };

    // console.log(decodedToken);

    if (!decodedToken) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: decodedToken.userId,
      },
    });

    if (!user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    return res.status(200).json({
      message: 'Authenticated',
      user: {
        id: user.id,
        createdAt: user.createdAt,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export { router as userController };
