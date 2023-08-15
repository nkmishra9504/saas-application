import express, { Request, Response } from 'express';
import router from './Route/routes';

const app = express();
const PORT = 5050;

app.use(express.json());

app.use('/api', router);

app.listen(PORT, ()=>{
    console.log('Server started')
})