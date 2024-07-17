const express = require('express');
const {reader, writer} = require("./helper");


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
        res.status(500).json(e.message)
    }
})
app.get('/users/:id', async (req, res) => {
    try {
        const userId = +req.params.id
        const users = await reader()
        const user = users.find(user=> user.id === userId)
        res.status(200).json(user)
    } catch (e) {
        res.status(500).json(e.message)
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
            users.push(newUser)
            await writer(users)
            res.status(201).json(newUser)
        }

    } catch (e) {
        res.status(500).json(e.message)
    }
})
app.delete('/users/:id', async (req, res) => {
    try {
        const users = await reader()
        const userId = +req.params.id;
        const userIndex = users.findIndex(user => user.id === userId)
        if (userIndex === -1) {
            return res.status(404).json('User not found')
        }
        users.splice(userIndex, 1)
        await writer(users)
        res.status(204).end()
    } catch (e) {
        res.status(500).json(e.message)
    }
})

app.put('/users/:id', async (req, res) => {
    try {
        const users = await reader()
        const {name, email} = req.body
        const userId = +req.params.id
        const index = users.findIndex(user => user.id = userId)
        if (index === -1) {
            res.status(404).json('user not found')
        }
        users[index] = {
            ...users[index],
            name,
            email
        }
        await writer(users)
        res.status(200).json(users[index])

    } catch (e) {
        res.status(500).json(e.message)
    }
})


app.listen(3100, () => {
    console.log('server started')
})