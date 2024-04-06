import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import User from '@/modals/User';
import { getServerSession } from 'next-auth/next';
import connect from '@/utils/db';
import { authOptions } from '../auth/[...nextauth]/route';
import { NextResponse } from 'next/server'; 



export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });
  
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    await connect();
  
    try {
      const email = session.user?.email;
      const user = await User.findOne({ email });
      console.log(user)
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const { username, mobileNumber } = user;
  
      return res.status(200).json({ username, mobileNumber });
    } catch (error) {
      console.error('Error fetching user details:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }