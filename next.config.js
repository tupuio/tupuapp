module.exports = {
  reactStrictMode: true,
  env: {
    NEXTAUTH_URL: process.env.DEPLOY_PRIME_URL, // read from netlify env
  },
};
