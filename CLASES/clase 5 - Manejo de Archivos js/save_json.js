const fs = require('fs')

const DB = {
    name: 'florencia',
    lasNAme: 'Diaz',
    edad: 21
}

const jsonString = JSON.stringify(DB)

fs.promises.writeFile('DB.json', jsonString).then(e => {
    console.log('DB saved');
}).catch(e=>{
    console.log(error);
})