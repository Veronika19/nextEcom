import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from '../../models/User';
import validateLoginUser from '../api/validations/login';
import initDB from '../../helpers/initDB';

initDB();

export default async function handler(req, res) {
  console.log(req.body);
  const reqData = req.body;
  const { errors, isValid } = validateLoginUser(reqData);
  if (!isValid) {
    return res.status(422).json(errors);
  }

  try {
    const userData = await User.findOne({ email: reqData.email });
    if (userData === null) {
      return res.status(400).json({ msg: 'Email id or password is invalid' });
    }

    const match = await bcrypt.compare(reqData.password, userData.password);
    if (match) {
      // user matched , create JWT
      const payload = { id: userData.id, name: userData.name };
      //sign token
      // expire in 2 hour
      const token = jwt.sign(payload, process.env.secretkey, { expiresIn: '2h' });
      return res.status(200).json({
        status: 'success',
        msg: 'User logged in successfully',
        token: 'Bearer ' + token,
      });
    } else {
      return res.status(404).json({ msg: 'Email id or password is invalid' });
    }
  } catch (err) {
    return res.status(400).json(err.message);
  }
}
