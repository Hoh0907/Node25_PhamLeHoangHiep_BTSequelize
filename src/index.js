const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static("."));
const cors = require('cors');
app.use(cors());
app.listen(8080);
const mysql = require('mysql2');
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "db_food",
    port: 3306
})
const rootRoute = require('./routers/index');
app.use('/api', rootRoute);