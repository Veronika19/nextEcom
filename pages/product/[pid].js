import Head from 'next/head';
import Image from 'next/image';
import baseUrl from '../../helpers/baseUrl';

import { useRef, useEffect } from 'react';

const Product = ({ product }) => {
  const modalRef = useRef(); // creating a reference for the delete modal

  useEffect(() => {
    M.Modal.init(modalRef.current);
  }, []);

  const deleteModal = () => {
    // attaching out reference to modal
    return (
      <div id="modal1" className="modal" ref={modalRef}>
        <div className="modal-content">
          <h4>{product.name}</h4>
          <p>Do you want to delete this product ?</p>
        </div>
        <div className="modal-footer">
          <button
            className="modal-close btn waves-effect waves-light #b71c1c red darken-4"
            type="submit"
            name="action"
          >
            Delete
            <i className="material-icons right">remove</i>
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>{product.name}</title>
      </Head>
      <div>
        <Image src={product.mediaUrl} width={500} height={250} alt={product.name} />
      </div>
      {product.name}
      <p>{product.description}</p>
      <button className="btn waves-effect waves-light" type="submit" name="action">
        Add
        <i className="material-icons right">add</i>
      </button>
      <div>
        <button
          data-target="modal1"
          className="btn modal-trigger waves-effect waves-light #b71c1c red darken-4"
          type="submit"
          name="action"
        >
          Delete
          <i className="material-icons right">remove</i>
        </button>
        {deleteModal()}
      </div>
    </>
  );
};

// export async function getServerSideProps(context) {
//   const {
//     params: { pid },
//   } = context;

//   const res = await fetch(`http://localhost:3000/api/product/${pid}`);
//   const data = await res.json();
//   console.log(data);
//   return {
//     props: { product: data }, // will be passed to the page component as props
//   };
// }

export async function getStaticProps(context) {
  const {
    params: { pid },
  } = context;

  const res = await fetch(`${baseUrl}/api/product/${pid}`);
  const data = await res.json();
  // console.log(data);
  return {
    props: { product: data }, // will be passed to the page component as props
  };
}

export async function getStaticPaths() {
  const res = await fetch(`http://localhost:3000/api/product`);
  const products = await res.json();

  const paths = products.map((product) => ({
    params: { pid: product._id },
  }));
  return {
    paths,
    fallback: false, // See the "fallback" section below
  };
}

export default Product;
