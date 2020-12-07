require('dotenv').config();

const express = require('express')
const app = express();
const port = process.env.PORT || 9000;

const bodyParser = require('body-parser')
const cors = require('cors');

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

