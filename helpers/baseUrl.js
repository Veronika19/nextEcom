const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'https://next-ecom-delta.vercel.app'
    : 'http://localhost:3000';

console.log('================================', baseUrl);

export default baseUrl;
