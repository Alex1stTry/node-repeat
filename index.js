const express = require('express');
const {reader, addUser, writer} = require("./helper");


const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (res) => {
    res.send('hello')
})

app.get('/users', async (req, res) => {
    try {
        const users = await reader();
        res.json(users)
    } catch (e) {
        res.status(400).json(e.message)
    }
})

app.post('/users', async (req, res) => {
    try {
        const {name, email, password} = req.body
        const users = await reader();
        const newUser = {
            id: users.length ? users[users.length - 1].id + 1 : 1,
            name,
            email,
            password
        }
        const oldUser = users.find(user => user.email === email)
        if (oldUser) {
            res.status(409).json("User already exist")
        } else {
            await addUser(newUser)
            res.json(newUser)
        }
    } catch (e) {
        res.status(400).json(e.message)
    }
})
app.delete('/users/:id', async (req, res) => {
    try {
        const users = await reader()
        const userId = +req.params.id;
        console.log(users)
        const userIndex = users.findIndex(user => user.id === userId)
        if (userIndex === -1) {
            return res.status(404).json('User not found')
        }
        users.splice(userIndex, 1)
        console.log(users)
        await writer(users)
        res.status(204).end()
    } catch (e) {
        res.status(400).json(e.message)
    }
})

app.listen(3100, () => {
    console.log('server started')
})