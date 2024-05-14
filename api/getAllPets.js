const fs = require('fs');
const filePath = 'pets.json';

function getPets(callback) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                return callback(null, []);
            } else {
                return callback(err);
            }
        }
        try {
            const pets = JSON.parse(data);
            callback(null, pets);
        } catch (parseError) {
            callback(parseError);
        }
    });
}



module.exports={getPets}