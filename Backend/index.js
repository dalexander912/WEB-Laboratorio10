import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { PORT } from "./Keys/keys.js";
import routes from "./Routes/route.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use('/api', routes);

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

/*
Usuario creado para pruebas:
  {
    "name": "DanielAlexander912",
    "email": "00232622@uca.edu.sv",
    "password": "pass1234"
  }
*/