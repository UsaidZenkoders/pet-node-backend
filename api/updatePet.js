const {writePetToFile}=require("./addPet")
const {getPets}=require("./getAllPets")
function updatePet(updatedPet, callback) {
    getPets((err, pets) => {
        if (err) return callback(err);
        const index = pets.findIndex(pet => pet.id === updatedPet.id);
        if (index === -1) {
            return callback(new Error('Pet not found'));
        }
        pets[index] = updatedPet;
        writePetToFile(pets, callback);
    });
}
module.exports={updatePet}