import express from "express";
import cors from "cors";
import apiRoutes from "./api-routes";

const app = express();

app.use(express.json());
app.use(cors({
  origin: "*",
  methods: "*",
  allowedHeaders: "*",
}));

app.use("/", apiRoutes);

export default app;
