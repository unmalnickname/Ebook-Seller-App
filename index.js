const express = require("express");
const key = require("./config/keys");
const stripe = require("stripe")(key.stripeSecretKey);
const bodyParse = require("body-parser");
const exphbs = require("express-handlebars");

const app = express();

//handlebars middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Body parse Middleware
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false }));

// static folder
app.use(express.static(`${__dirname}/public`));
// todo lo que esta linea dice es que el folder que proveera losa archivos estaticos
//esta en esa dirreciond el systema en la carpeta public

// Index  Route
app.get("/", (req, res) => {
  res.render("index");
  stripePublishableKey: keys.stripePublishableKey;
});

// app.get("/success", (req, res) => {
//   res.render("success");
// });
//charge Route–
app.post("/charge", (req, res) => {
  const amount = 2500;
  // console.log(req.body);
  // res.send("hello fromt thes server");
  stripe.customers
    .create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken
    })
    .then((customer) =>
      stripe.charges.create({
        amount,
        description: "Web Development Ebook",
        currency: "usd",
        customer: customer.id
      })
    )
    .then((charge) => res.render("success"));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("El servidor funciona");
});
