const express = require('express');
const path = require('path');
const cors = require('cors');

require('./db/mongoose');
// get the item api
const items = require('./routes/api/items');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');

const app = express();

// allow cors
app.use(cors());

// bodyParser
app.use(express.json());

// use routes
app.use('/api/items', items);
app.use('/api/users', users);
app.use('/api/auth', auth);

// server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/build'));

  // load unwanted route here
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}
const port = process.env.PORT;

app.listen(port, () => console.log(`server start at port ${port}`));
