// src/app.js

import "dotenv/config";

import express from "express";
import routes from "./routes/promptRoutes.js";

const app = express();
app.use(express.json());

app.use(routes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
