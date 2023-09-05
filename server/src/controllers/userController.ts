import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import { createClient } from '@supabase/supabase-js';

const router = Router();
const prisma = new PrismaClient();

// Multer setup for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);

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
      return res
        .status(401)
        .json({ message: 'Invalid credentials - user not found' });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ message: 'Invalid credentials - password is incorrect' });
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
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'Token has expired' });
    }

    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const uploadProfilePicture = async (req: any, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const decodedToken = jwt.verify(token, process.env.SECRET as string) as {
      userId: number;
    };

    if (!decodedToken) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    // Handle file upload
    upload.single('profilePicture')(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(400).json({ message: 'Error uploading file' });
      }

      const file = req.file; // req.file contains the uploaded file

      if (!file) {
        return res
          .status(400)
          .json({ message: 'Profile picture not provided' });
      }

      // Generate a unique filename for the uploaded image (you can use a UUID library)
      const fileName = `${decodedToken.userId}_avatar.jpg`;

      // Upload the image to Superbase storage
      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(fileName, file.buffer); // Use file.buffer to access the file data

      if (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: 'Error uploading profile picture' });
      }

      // Optionally, you can save the filename in your database for the user
      // Update the user's profile with the new profile picture filename in your Prisma code here

      return res.status(200).json({ message: 'Profile picture uploaded' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export { router as userController };
