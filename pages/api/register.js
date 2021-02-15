import validateUser from '../api/validations/createUser';
import User from '../../models/User';
import initDB from '../../helpers/initDB';

initDB();

export default async function handler(req, res) {
  const reqData = req.body;
  const { errors, isValid } = validateUser(reqData);
  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    // const resData = await User.find();
    const checkIfExists = await User.findOne({ email: reqData.email });
    if (checkIfExists !== null) {
      return res.status(400).json({ err: 'User email already exists' });
    }
    const resData = await new User(reqData).save();
    return res.status(200).json(resData);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.response);
  }
}
