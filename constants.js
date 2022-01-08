const getEnv = (name) => process.env[`XATA_${name}`];

const env = {
  BASE_URL: process.env.XATA_DATA_URL,
  PRIV_BASE_URL: `${process.env.XATA_URL}/_priv`,
  PRIV_API_USERNAME: getEnv("PRIV_API_USERNAME") || "nextauth",
  PRIV_API_PASSWORD: getEnv("PRIV_API_PASSWORD"),
  XATA_BRANCH: getEnv("BRANCH"),
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
