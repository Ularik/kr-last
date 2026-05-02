import path from "path";

const rootPath = __dirname;

const config = {
  rootPath,
  publicPath: path.join(rootPath, "public"),
  db: "mongodb://localhost/juise_shop",
  jwtSecret: process.env.JWT_SECRET || "default_fallback",
  refreshSecret: process.env.REFRESH_SECRET || "secret",
  clientID: process.env.CLIENT_ID || "...",
  clientSecret: process.env.CLIENT_SECRET || "...",
};

export default config;
