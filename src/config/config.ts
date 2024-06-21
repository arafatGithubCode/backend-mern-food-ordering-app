import "dotenv/config";

const dev = {
  app: {
    port: process.env.PORT || 7001,
  },
  db: {
    url: process.env.MONGODB_CONNECT_STRING || "mongodb://localhost:27017",
  },
};

export default dev;
