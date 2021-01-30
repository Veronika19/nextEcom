import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import baseUrl from '../helpers/baseUrl';

const Home = ({ products }) => {
  // console.log(props.name);
  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>
      <div className="rootcard">
        {products.map((each) => {
          return (
            <div className="card" key={each._id}>
              <div className="card-image">
                <Image src={each.mediaUrl} width="330" height="220" />
                <span className="card-title">{each.name}</span>
              </div>
              <div className="card-content">
                <p>{each.description.substring(0, 100)}</p>
              </div>
              <div className="card-action">
                <Link href="/product/[pid]" as={`/product/${each._id}`}>
                  <a>This is a link</a>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch(`${baseUrl}/api/product`);
  const posts = await res.json();
  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: { products: posts },
  };
}

export default Home;
