'use client';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export function LoginSignup() {
  return (
    <div className='mx-4 flex justify-center'>
      <Form className='flex flex-col rounded-xl border p-4 sm:w-[400px]'>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control type='email' placeholder='Enter email' />
          <Form.Text className='text-muted'>
            We&apos;ll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Password' />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicCheckbox'></Form.Group>
        <Button className='bg-slate-700' variant='secondary' type='submit'>
          Submit
        </Button>
      </Form>
    </div>
  );
}
