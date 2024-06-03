const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
const port = process.env.DB_PORT || 8080;

app.use(bodyParser.json());
app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
