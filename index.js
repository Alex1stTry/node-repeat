const fs = require('node:fs/promises');
const path = require('node:path')

const foo = async () => {

    // const pathToHomeWork = path.join(__dirname, 'task.txt')
    // await fs.writeFile(pathToHomeWork, 'Створити папку "baseFolder". В ній створити 5 папок, в кожній з яких створити по 5 файлів з розширенням txt.\n' +
    //     'Вивести в консоль шляхи до кожного файлу чи папки, також вивести поряд інформацію про те, чи є це файл чи папка.')


    const myFolder = path.join(__dirname, 'baseFolder')

    const mainFolder = ['folder1', 'folder2', 'folder3', 'folder4', 'folder5']
    const files = ['text1.txt', 'text2.txt', 'text3.txt', 'text4.txt', 'text5.txt']

    for (const folder of mainFolder) {
        const allFolders = path.join(myFolder, folder);

        await fs.mkdir(allFolders, {recursive: true})

        const stat = await fs.stat(allFolders)
         console.log(allFolders)
         console.log(`Dir? - ${stat.isDirectory()}`)
         console.log('_________')

        for (const file of files) {
            const allFiles = path.join(myFolder, folder, file)

            await fs.writeFile(allFiles, 'Hello')

            const stat = await fs.stat(allFiles)
            console.log(allFiles)
            console.log(`File? - ${stat.isFile()}`)
            console.log('_________')
        }
    }
}

void foo()