const express = require('express');

const app = express();

const port = 3001;

const getroute = require('./routes/routes')

app.use('/',getroute)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
