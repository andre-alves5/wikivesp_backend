import env from "./config/env.js";
import { MongoHelper } from "./config/db_connection.js";

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import("./app.js")).default;
    app.listen(env.port, () =>
      console.log(`Server running at http://localhost:${env.port}`)
    );
  })
  .catch(console.error);
