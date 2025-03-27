import express from 'express';
import sequelize from './config/database';
import userRoutes from './routes/userRoutes';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(express.json());
app.use(userRoutes);

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