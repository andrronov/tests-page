import express from 'express';
import router from './routes/user_routes.js';
import bodyParser from 'body-parser';

const PORT = process.env.PORT || 3003

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});