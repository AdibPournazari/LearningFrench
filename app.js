const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const database = require('./databaseConfig.js');
const path = require('path');
const port = process.env.PORT || 8080;

database.connect( _ => {
    app.use(bodyParser.json());
    app.use(cors());
    app.use(express.static(path.join(__dirname, 'public')));

    app.use('/', require('./routing.js'));
    app.use('/api', require('./api.js'));

    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    })
});

