import { createClient } from "redis";

const redis = createClient({
  username: "default",
  password: "n0LwhSHBiNyXGl6qe8wr9KtKTzR73QiU",
  socket: {
    host: "redis-13784.crce182.ap-south-1-1.ec2.cloud.redislabs.com",
    port: 13784,
  },
});

// 🔥 Always handle errors
redis.on("error", (err) => {
  console.error("Redis Client Error:", err);
});

// 🔥 Connect once (important)
await redis.connect();

console.log("Redis connected successfully");

export default redis;
