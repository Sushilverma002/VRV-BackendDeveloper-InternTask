import ConnectDb from "./config/databaseConfig.js";
import express from "express";
import router from "./routes/index.js";
const app = express();
const port = process.env.PORT || 4001;

app.use(express.json());
app.use("/api/v1/user", router);

const start = async () => {
  try {
    await ConnectDb(process);
    app.listen(port, () => {
      console.log(`Yes I am connected at PORT: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
