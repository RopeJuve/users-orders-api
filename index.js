import express from 'express';
import dotenv from 'dotenv';
import usersRouter from './routers/usersRouter.js';
dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/users', usersRouter);



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
