const http = require("http");
const url = require("url");
const {getPets} = require("./api/getAllPets");
const {addNewPet} = require("./api/addPet");
const {updatePet} = require("./api/updatePet");
const {deletePet} = require("./api/deletePet");

const PORT = 3000;

const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url, true);
  const { pathname } = reqUrl;


// GET REQUEST FOR RETRIEVING ALL PETS 
  if (req.method === "GET" && pathname === "/getPets") {
    getPets((err, pets) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Internal Server Error" }));
        return;
      }
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(pets));
    });


// POST REQUEST FOR ADD A NEW PET 

  } else if (req.method === "POST" && pathname === "/addPet") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const newPet = JSON.parse(body);
      addNewPet(newPet, (err) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: err.message }));
          return;
        }
        res.writeHead(201, { "Content-Type": "application/json" });
       
        res.end(JSON.stringify(newPet));
      });
    });


// PUT REQUEST FOR UPDATING A NEW PET USING ID



  } else if (req.method === "PUT" && pathname.startsWith("/updatePet/")) {
    const petId = parseInt(pathname.split("/").pop());
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const updatedPet = JSON.parse(body);
      updatedPet.id = petId;
      updatePet(updatedPet, (err) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Internal Server Error" }));
          return;
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        const response = {
          message: "Pet updated successfully",
          data: updatedPet,
        };
        res.end(JSON.stringify(response));
      });
    });
  } 
  
  
  
  // DELETE REQUEST FOR DELETING A PET USING ID

  
  else if (req.method === "DELETE" && pathname === "/deletePet") {
    const petId = reqUrl.query.id;
    console.log(petId);
    deletePet(petId, (err) => {
      if (err) {
        console.error(err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Internal Server Error" }));
        return;
      }
      res.writeHead(200, { "Content-Type": "application/json" });
      const response = {
        message: "Pet deleted successfully",
        deletedPetId: petId,
      };
      res.end(JSON.stringify(response));
    });
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not Found" }));
  }
});



server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
