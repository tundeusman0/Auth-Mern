const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGODB_URL, {
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true
  })
  .then(() => console.log('mongoose connected'))
  .catch(err => console(err));
