// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import initDB from '../../helpers/initDB';
import Product from '../../models/Product';

initDB();

export default async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (err) {
    console.log(err);
  }
};
