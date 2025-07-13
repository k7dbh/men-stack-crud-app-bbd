const express = require('express')
const app = express();

// GET / (home)
app.get('/', (req, res) => {
    res.send('hello, friend')
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})