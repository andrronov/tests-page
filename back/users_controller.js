const mongoose = require('mongoose');

// Подключение к базе данных
mongoose.connect('mongodb://localhost/usersDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Определение схемы пользователя
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

// Модель пользователя
const User = mongoose.model('User', userSchema);

// Регистрация пользователя
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Создание нового пользователя
  const newUser = new User({
    username,
    password
  });

  // Сохранение пользователя в базе данных
  newUser.save((err) => {
    if (err) {
      res.status(500).json({ message: 'Ошибка при сохранении пользователя' });
    } else {
      res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
    }
  });
});