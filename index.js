const express = require('express');
const { writer, reader} = require("./helper");



const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.send('Hello')
})

app.get('/users', async (req, res) => {
    try {
       const users = await reader();

    } catch (e) {
        res.status(400).json(e.message)
    }
})

app.post('/users', async (req, res) => {
    try {
        const {name, email, password} = req.body
        const users = await reader();
        const newUser = {
            id: users[users.length - 1].id + 1,
            name,
            email,
            password
        }
        console.log(newUser)
        console.log(users)
        // const oldUser = users.find(user => user.email === email)
        // if (oldUser){
        //     res.status(409).json("User already exist")
        // }
        // await writer(newUser)
    } catch (e) {
        res.status(400).json(e.message)
    }
})

app.listen(3100, () => {
    console.log('server started')
})