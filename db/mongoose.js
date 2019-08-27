const mongoose = require('mongoose');

mongoose
  .connect('mongodb://127.0.0.1:27017/react-todo-app', {
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true
  })
  .then(() => console.log('mongoose connected'))
  .catch(err => console(err));
