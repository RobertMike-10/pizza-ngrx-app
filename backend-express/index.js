const express = require("express");
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//usign CORS
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:4200'
}));

app.listen(3000, () => {
  console.log("El servidor está inicializado en el puerto 3000");
 });


 //read toppings
 app.get('/api/toppings', function (req, res) { 
  var fs = require('fs');
  var obj = JSON.parse(fs.readFileSync('db.json', 'utf8'));    
  var resp =obj.toppings; 
  res.status(200).json(resp);
});

 //read pizzas
 app.get('/api/pizzas', function (req, res) {   
    var fs = require('fs');
    var obj = JSON.parse(fs.readFileSync('db.json', 'utf8'));    
    var resp =obj.pizzas;   
    res.status(200).json(resp);
  });

app.put('/api/pizzas/:id', function (req, res) {
  console.log("Write pizza");
  var fs = require('fs');
  var obj = JSON.parse(fs.readFileSync('db.json', 'utf8'));    
  var pizzas =obj.pizzas;
  const pizzaId = req.params.id; 
  var pizza = req.body;  
  var newArray = pizzas.map((p) => {
    if(p.id === pizza.id){
      p = Object.assign({},p,pizza);
    }
    return p;
  }); 

  obj.pizzas = newArray;    //copio el array actualizado 
  console.log(obj.pizzas);
  let data = JSON.stringify(obj);
  //escribo a disco  
  fs.writeFileSync('db.json', data);
  res.status(200).json(req.body); 
});

app.post('/api/pizzas', function (req, res) {
    console.log("Write new pizza");
    var fs = require('fs');
    var obj = JSON.parse(fs.readFileSync('db.json', 'utf8'));    
    var pizzas =obj.pizzas;
    var pizza = req.body;
    const pizzaId = pizzas.length+1;
    pizza.id = pizzaId;
    var newArray = [...pizzas, pizza];
    obj.pizzas = newArray;    //copio el array actualizado 
   
    const data = JSON.stringify(obj);
    console.log(data);
    //escribo a disco  
    fs.writeFileSync('db.json', data);
    res.status(200).json(req.body);    
});

app.delete('/api/pizzas/:id', function (req, res) {
    console.log("Delete pizza");
    var fs = require('fs');
    var obj = JSON.parse(fs.readFileSync('db.json', 'utf8'));    
    var pizzas =obj.pizzas;
    const pizzaId = parseInt(req.params.id);    
    const newArray = pizzas.filter(p => p.id!==pizzaId);     
    obj.pizzas = newArray;    //copio el array actualizado
    console.log(newArray);
    let data = JSON.stringify(obj);
    //escribo a disco  
    fs.writeFileSync('db.json', data);
    res.status(200).json(req.body); 
});