// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import initDB from '../../helpers/initDB';
import Product from '../../models/Product';

import validCreateProduct from './validations/createProduct';

initDB();

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      await getAllProducts(req, res);
      break;

    case 'POST':
      await createProduct(req, res);
      break;
  }
};

async function getAllProducts(req, res) {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (err) {
    console.log(err);
  }
}

async function createProduct(req, res) {
  const reqData = req.body;
  const { errors, isValid } = validCreateProduct(reqData);
  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { name, price, description, mediaUrl } = req.body;
  const saveData = await new Product({ name, price, description, mediaUrl }).save();
  return res.status(200).json(saveData);
}
