const {getPets}=require("./getAllPets")
const {writePetToFile}=require("./addPet")

function deletePet(petId, callback) {
    
    getPets((err, pets) => {
        if (err) return callback(err);
        const index = pets.findIndex(pet => pet.id === parseInt(petId));
        console.log("Index:", index);
        
        if (index === -1) {
            return callback(new Error('Pet not found'));
        }     
        pets.splice(index, 1);
        writePetToFile(pets, callback);
    });
}
module.exports={deletePet}