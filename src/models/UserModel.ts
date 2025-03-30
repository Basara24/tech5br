import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import EventsModel from "./EventsModel";

class UserModel extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public cpf!: string;
  public type!: "usuario" | "organizador";
  public assinatura_status!: "ativa" | "expirada" | "cancelada";
}

UserModel.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    type: {
      type: DataTypes.ENUM("usuario", "organizador"),
      allowNull: false,
      defaultValue: "usuario",
    },
    assinatura_status: {
      type: DataTypes.ENUM("ativa", "expirada", "cancelada"),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "UserModel",
    tableName: "users",
  }
);

// Relacionamento com Eventos (um organizador pode ter vários eventos)
UserModel.hasMany(EventsModel, { foreignKey: "organizer_id", as: "eventos" });
EventsModel.belongsTo(UserModel, { foreignKey: "organizer_id", as: "organizer" });

export default UserModel;
