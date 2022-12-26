import type { NextApiRequest, NextApiResponse } from 'next';

// Handles responses for unauthorised internal access
const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  res.status(401).json({ message: 'Unauthorised API access. User is not a Food Bank staff.' });
};
export default handler;
