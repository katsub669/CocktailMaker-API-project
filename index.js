import express from "express";
import axios from "axios";

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
const port =3000;


app.get('/', (req, res) => {
    res.render("index.ejs");
});

app.post("/random", async (req, res) => {
    try {
//getting random cocktail > sending as a drink
let result = await axios(`https://www.thecocktaildb.com/api/json/v1/1/random.php`);
res.render("index.ejs", {drink: result.data.drinks[0]});
    }
    catch (error) {
        console.error(error);
      }
 });


app.post("/cocktail", async (req, res) => {
    try {
//getting cocktail from the main form
let enteredCocktail = req.body['cocktail'];
//using API to get the array of cocktails related to inputted data
let result = await axios(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${enteredCocktail}`);
res.render("index.ejs", {content: result.data.drinks});
    }
    catch (error) {
        console.error(error);
      }
 });
 
app.post("/receipe", async (req, res) => {
    try {

        //getting the cocktail on which the user have pressed > providing user with info about the cocktail
        let chosenCocktail = req.body['chosenCocktail'];
        let result = await axios(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${chosenCocktail}`);

        res.render("index.ejs", {drink: result.data.drinks[0]});
    }

     catch (error) {
        console.error(error);
    }
});


app.listen(port, () => {console.log(`server is on port ${port}`)});