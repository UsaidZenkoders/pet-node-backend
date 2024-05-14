const filePath = 'pets.json';
const {getPets}=require("./getAllPets")
const fs=require("fs")

function addNewPet(newPet, callback) {
    getPets((err, pets) => {
        if (err) return callback(err);
        newPet.id = pets.length > 0 ? pets[pets.length - 1].id + 1 : 1;
        pets.push(newPet);
        writePetToFile(pets, callback);
    });
}
function writePetToFile(pets, callback) {
    const json = JSON.stringify(pets, null, 2);
    fs.writeFile(filePath, json, 'utf8', callback);
}

module.exports={addNewPet,writePetToFile}