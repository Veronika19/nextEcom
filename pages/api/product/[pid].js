import Product from '../../../models/Product';

export default async function handler(req, res) {
  const {
    query: { pid },
  } = req;
  const resData = await Product.findOne({ _id: pid });
  res.status(200).json(resData);
}
