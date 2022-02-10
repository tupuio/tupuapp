module.exports = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    NEXTAUTH_URL: process.env.DEPLOY_PRIME_URL, // read from netlify env
  },
};
