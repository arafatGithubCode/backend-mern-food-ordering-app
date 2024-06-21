import app from "./app";
import dev from "./config/config";
import connectDB from "./config/db";

const PORT = dev.app.port;

app.listen(PORT, async () => {
  console.log(`Server started on localhost:${PORT}`);
  await connectDB();
});
