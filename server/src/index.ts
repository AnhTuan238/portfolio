import { appConfig } from "@/config";
import app from "@/server";
import { connectDB } from "@/database";

(async () => {
  await connectDB();

  app.listen(appConfig.port, () => {
    console.log("Server is running on port", appConfig.port);
  });
})();
