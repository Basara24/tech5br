import express from "express";
import sequelize from "./config/database"; // Instância do Sequelize
import userRoutes from "./routes/userRoutes";
import eventsRoutes from "./routes/EventsRoutes";
import SignatureRouter from "./routes/SignatureRoutes";
import RegistrationRouter from "./routes/ResgistrationRoutes";

const cors = require("cors");
const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:5173", // Substitua pelo endereço do seu frontend
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Se estiver lidando com cookies ou sessões
    optionsSuccessStatus: 204,
  })
);

app.use(express.json());
app.use(userRoutes);
app.use(eventsRoutes);
app.use(SignatureRouter);
app.use(RegistrationRouter);

sequelize
  .sync({ alter: true }) // Sincroniza o banco de dados
  .then(() => {
    console.log("Database pai ta on!!!");
  })
  .catch((error) => {
    console.log("fudeu a baiana", error);
  });

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
