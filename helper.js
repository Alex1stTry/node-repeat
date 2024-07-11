const {} = require('./users.json')
const fs = require('node:fs/promises')
const path = require("node:path");

let users = []
const pathToFile = path.join(__dirname, 'users.json')

const writer = async (user) => {
    await fs.writeFile(pathToFile, JSON.stringify(user))
}

const reader = async () => {
    const data = await fs.readFile(pathToFile, "utf-8");
    users = JSON.parse(data)
    return users
}




module.exports = {
    writer,
    reader
}
