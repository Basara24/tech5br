import express from 'express';
import sequelize from './config/database';
import UserModel from './models/UserModel';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/', async(req, res) => {
    const users = await UserModel.findAll();
    res.send(users);
})

// sync database

sequelize
    .sync({ alter: true })
    .then(() => {
        console.log('Database pai ta on!!!');
    })

    .catch((error) => {
        console.log('fudeu a baiana', error)
    });
    

app.listen(port, () =>{
    console.log('Server is running on port ' + port);
});