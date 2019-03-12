const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.json({ hi: 'Master of none!'});
});

app.listen(3080, () => {
    console.log('Listening on 3080');
});
