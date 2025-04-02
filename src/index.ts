import express from "express";
import sequelize from "./config/database"; // Instância do Sequelize
import userRoutes from "./routes/userRoutes";
import eventsRoutes from "./routes/EventsRoutes";
import SignatureRouter from "./routes/SignatureRoutes";
import RegistrationRouter from "./routes/ResgistrationRoutes";

const app = express();
const port = 3000;

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
