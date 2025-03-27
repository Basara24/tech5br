import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    'eventos',
    'root',
    '2005',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
)

export default sequelize;   