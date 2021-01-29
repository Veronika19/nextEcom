// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import initDB from '../../helpers/initDB';

initDB();
export default (req, res) => {
  res.statusCode = 200;
  res.json({ name: 'John Doe' });
};
