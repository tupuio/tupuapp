const getEnv = (name) => process.env[`XATA_${name}`];

// Temporary workaround because we are putting a hardcoded team in `BASE_URL`. This line removes it
const baseURL = process.env.XATA_URL;

const env = {
  BASE_URL: `${baseURL}/xata`,
  PRIV_BASE_URL: `${baseURL}/_priv`,
  PRIV_API_USERNAME: getEnv("PRIV_API_USERNAME") || "nextauth",
  PRIV_API_PASSWORD: getEnv("PRIV_API_PASSWORD"),
};

export default env;

if (process.env.NODE_ENV !== "test") {
  const optional = ["JWT_SECRET", "VERCEL_ENV"];

  for (const [key, value] of Object.entries(env)) {
    if (!value && !optional.includes(key)) {
      throw new Error(`Missing env variable XATA_${key}`);
    }
  }
}
