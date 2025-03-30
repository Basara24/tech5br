import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database"; // Importe sua instância do Sequelize
import UserModel from "./UserModel"; // Importe o modelo de usuários

class EventsModel extends Model {
  public id!: number;
  public name!: string;
  public date!: string;
  public location!: string;
  public description!: string;
  public image_url?: string;
  public organizer_id!: number;
}

// Inicialização do modelo
EventsModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    organizer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UserModel, // Referencia a tabela de usuários
        key: "id",
      },
      onDelete: "CASCADE", // Se um organizador for deletado, seus eventos são excluídos
    },
  },
  {
    sequelize,
    tableName: "events",
  }
);

// Definição da relação com UserModel
EventsModel.belongsTo(UserModel, { foreignKey: "organizer_id", as: "organizer" });

export default EventsModel;