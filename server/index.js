require('dotenv').config();
const express = require('express');

const app = express();

app.use(express.static(__dirname + '/octopus/resources/pages'));

let port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});