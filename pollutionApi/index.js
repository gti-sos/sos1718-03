var pollutionApi = {};
var BASE_API_PATH = "/api/v1";
module.exports = pollutionApi;

pollutionApi.register = function (app,db){
    
console.log("Registering for index...");

    //GET al conjunto de recursos    
app.get(BASE_API_PATH+"/pollution-cities",(req,res)=>{
    console.log(Date() + " - GET /pollution-cities");
   
    db.find({}, (err, pollutionCities) => {
    if (err) {
        console.error("Error accesing DB");
        res.sendStatus(500);
         return;
    }
    
    res.send(pollutionCities);
});

});

//GET a un recurso concreto /station
app.get(BASE_API_PATH+"/pollution-cities/:station",(req,res)=>{
    var station = req.params.station;
     console.log(Date() + " - GET /pollution-cities/"+ station);
     
    db.find({}, (err, pollutionCities) => {
   
    var filteredCities = pollutionCities.filter((c)=>{
        return (c.station == station);
});

    if (err) {
            console.error(" Error accesing DB");
            res.sendStatus(500);
            return;
        }
        
   res.send(filteredCities[0]);
});
});

// POST al conjunto de recursos   
app.post(BASE_API_PATH+"/pollution-cities",(req,res)=>{ 
    console.log(Date() + " - POST /pollution-cities");
    var city = req.body;
    db.insert(city); 
    res.sendStatus(201);
});

//POST a un recurso
app.post(BASE_API_PATH + "/pollution-cities/:station",(req,res)=>{
    var station = req.params.station;
     console.log(Date() + " - GET /pollution-cities/"+ station);
    res.sendStatus(405);
}); 



//DELETE a un conjunto recursos
app.delete(BASE_API_PATH+"/pollution-cities",(req,res)=>{
    console.log(Date() + " - DELETE /pollution-cities");
    db.find({}, (err, pollutionCities) => {
        for (var i = 0; i < pollutionCities.length; i++) {
            db.remove({});
        }
    });
    res.sendStatus(200);
 });


//DELETE a un recurso concreto
app.delete(BASE_API_PATH+"/pollution-cities/:station",(req,res)=>{
    var station = req.params.station;
    console.log(Date() + " - DELETE /pollution-cities/"+ station);
    db.remove({station: station});
   res.sendStatus(200);
}); 




//PUT a un conjunto
app.put(BASE_API_PATH+"/pollution-cities",(req,res)=>{
    console.log(Date() + " - PUT /pollution-cities");
    res.sendStatus(405);
});  

//PUT a un recurso concreto
app.put(BASE_API_PATH+"/pollution-cities/:station",(req,res)=>{
    var station = req.params.station;
    var updateCities = req.body;
    
    console.log(Date() + " - PUT /pollution-cities/"+station);
    
    if(station != updateCities.station){
        res.sendStatus(409);
        return;
    }
   
   db.update({"station": station}, updateCities, (err,numUpdated)=>{
        console.log("Updated: "+numUpdated);
    });
   
    res.sendStatus(200);
});

    
    
}