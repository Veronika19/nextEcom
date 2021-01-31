import Product from '../../../models/Product';

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      await getProduct(req, res);
      break;

    case 'DELETE':
      await deleteProduct(req, res);
      break;
  }
}

async function getProduct(req, res) {
  const {
    query: { pid },
  } = req;
  const resData = await Product.findOne({ _id: pid });
  return res.status(200).json(resData);
}

async function deleteProduct(req, res) {
  const {
    query: { pid },
  } = req;
  const resData = await Product.findOneAndDelete({ _id: pid });
  return res.status(200).json(resData);
}
