import { getSession, Session } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function logcheck(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session: Session | null = await getSession(req, res);
    if (session) {
      // User is logged in
      res.status(200).json({ 
        message: 'You are logged in.',
        logged: true
      });
    } else {
      // User is not logged in
      res.status(401).json({ 
        message: 'You must be logged in to access this resource.',
        logged: false
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

//this creates: */api/auth/logcheck   //to check if user is logged in