const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

require('./db/mongoose');
// get the item api
const items = require('./routes/api/items');

const app = express();

// bodyParser
app.use(bodyParser.json());

// use routes
app.use('/api/items', items);

// server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/build'));

  // load unwanted route here
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server start at port ${port}`));
