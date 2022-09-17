const express = require("express");
const db = require("./db.js");
const app = express();
//const bcrypt = require("bcrypt");

 
app.set("views", "./views/layouts")
app.set("view engine", "ejs")


const DB = new db("data");
// middleware https://expressjs.com/es/api.html#express.urlencoded
app.use(express.urlencoded({ extended: true }));
// middleware https://expressjs.com/es/api.html#express.json
app.use(express.json());

 
app.get("/altaproductos", (req, res) => {
  res.render("altaproductos", { layout: "altaproductos" });

});

app.get("/productos", async (req, res) => {
  const productos = await DB.getAllProducts();
  res.render("productos", { layout: "productos", productos });
});



app.post("/api/productos", async (req, res) => {
  console.log(req.body);
  const { nombre, precio, urlimagen } = req.body;
  const data = await DB.createProduct({ nombre, precio, urlimagen });
  return res.redirect("/altaproductos");
});


app.listen(8080, () => {
  console.log("Iniciado");
});


 