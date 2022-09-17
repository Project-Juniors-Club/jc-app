import { NextApiRequest, NextApiResponse } from 'next';
import { sampleUserData } from '../../../utils/sample-data';
import { apiHandler } from '../../../helpers/api/api-handler';
import { usersRepo } from '../../../helpers/api/users-repo';
import { omit } from '../../../helpers/api/omit';

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!Array.isArray(sampleUserData)) {
      throw new Error('Cannot find user data');
    }

    res.status(200).json(sampleUserData);
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

function getUsers(req, res) {
    // return users without hashed passwords in the response
    const response = usersRepo.getAll().map(x => omit(x, 'hash'));
    return res.status(200).json(response);
}

export default apiHandler({
    get: getUsers
});



