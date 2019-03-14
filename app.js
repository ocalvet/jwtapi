const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.json({ hi: 'Master of none!'});
});

app.get('/public', (req, res) => {
    res.json({ visible: 'Everyone can see this line' });
});

app.get('/private', (req, res) => {
    res.json({ visible: 'Only you can see it' });
});

app.get('/private', (req, res) => {
    res.json({ visible: 'Only you can see it' });
});

app.listen(3080, () => {
    console.log('Listening on 3080');
});
