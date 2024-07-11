const fs = require('node:fs/promises')
const path = require("node:path");

let users = []

const pathToFile = path.join(__dirname, 'users.json')

const reader = async () => {
    const data = await fs.readFile(pathToFile, "utf-8");
    users = JSON.parse(data)
    return users
}

const writer = async () => {
    await fs.writeFile(pathToFile, JSON.stringify(users, null))
}

const addUser = async (user) => {
    const users = await readUsers();
    users.push(user);
    await writeUsers(users);
};

module.exports = {
    writer,
    reader,
    addUser
}
