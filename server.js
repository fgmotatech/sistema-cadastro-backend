import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";

import usuarioRoutes from "./routes/usuarioRoutes.js";

import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(helmet());
app.use(
  cors({
    origin: [
      "https://fgmotatech.github.io",
      "https://crud-cadastro-frontend.netlify.app",
    ],
  }),
);
app.use(express.json());

app.use("/usuario", usuarioRoutes);
app.use("/login", authRoutes);

app.listen(5000, () => {
  console.log("Rodando na porta: 5000");
});
