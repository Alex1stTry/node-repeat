const fs = require('node:fs/promises')
const path = require("node:path");

const pathToFile = path.join(__dirname, 'users.json')

const reader = async () => {
    const data = await fs.readFile(pathToFile, "utf-8");
    return data ? JSON.parse(data) : []
}

const writer = async (users) => {
    await fs.writeFile(pathToFile, JSON.stringify(users))
}

module.exports = {
    reader,
    writer
}
