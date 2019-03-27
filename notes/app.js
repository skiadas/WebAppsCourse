const express = require('express')
const app = express()
const port = 3000

const tasks = [];

app.get('/', (req, res) => res.json({ tasks: tasks }));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
