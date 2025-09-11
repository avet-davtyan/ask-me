import express from "express";
import cors from "cors";
import apiRoutes from "./api-routes";
import { errorHandler } from "./util/error-handler.util";
import { requestPrepare } from "./util/request.util";

const app = express();

app.use(express.json());
app.use(cors({
  origin: "*",
  methods: "*",
  allowedHeaders: "*",
}));

app.use(requestPrepare);
app.use("/", apiRoutes);
app.use(errorHandler);

export default app;
