const express = require('express')
const { connection } = require('./db')
const { myrouter } = require('./routes/api.routes')
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello world,This is your favourite zzwiggy app!')
})
app.use('/api', myrouter)

app.listen('6500', async () => {
    try {
        await connection;
        console.log("connected to database!")
    } catch (error) {
        console.log(error)
    }

    console.log("Listening at port 6500!")
})