import Product from '../../../models/Product';

export default async function handler(req, res) {
  console.log('=== request', req.method);
  console.log('=== pid', req.query.pid);
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
  console.log('======inside========');
  const {
    query: { pid },
  } = req;
  const resData = await Product.findOneAndDelete({ _id: pid });
  console.log('=======res', resData);
  return res.status(200).json(resData);
}
