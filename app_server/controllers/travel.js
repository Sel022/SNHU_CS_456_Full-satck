// var fs = require('fs');
// var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));
const tripsEndpoint = 'http://localhost:3000/api/trips';  
const options = {  
method: 'GET',  
headers: {  
'Accept': 'application/json'
 }  
}  

// const travel = (req, res) => {
//     res.render('travel',{title: 'Travlr Getaways- Travel', trips});
// };
const travel = async function(req, res, next){
    await fetch(tripsEndpoint, options)
    .then(res=>res.json())
    .then(json=>{
        let message = null;
        if(!(json instanceof Array)){
            message = "Api lookup error";
            json = [];
        }else{
            if(!json.length){
                message = "No Trips exists in database!"
            }
        }
        res.render('travel',{title: 'Travlr Getaways- Travel', trips:json});
    })
    .catch(err=>res.status(500).send(err.message))
}
module.exports = {
    travel
};