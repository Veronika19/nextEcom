const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://next-ecom-delta.vercel.app'
    : 'http://localhost:3000';

console.log('================================', baseUrl);

export default baseUrl;
