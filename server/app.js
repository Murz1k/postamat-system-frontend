const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static('src'));
app.get('*', (req, res) => {
  res.sendFile(
    path.resolve(
      __dirname, 'src', 'index.html'
    )
  )
});

module.exports = app;
