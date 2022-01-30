const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

const recipeData = require('Movie Data/data.json');

app.get('/favorite',fav);
app.get('/',recipesHandler);
app.get('*',notFoundHndler);
app.get('/not',notFoundHndler1);




 function fav(req,res){
     return res.status(200).send("Welcome to Favorite Page")
 }

 function Recipes(title,poster_path,overview)
 {
     this.title=title;
     this.poster_path=poster_path;
     this.overview=overview;
    
}



function recipesHandler(req,res){
    let recipes=[];
    recipeData.data.map(recipe =>{
        let oneRecipe = new Recipe(recipe.title, recipe.poster_path,recipe.overview)
        recipes.push(oneRecipe)
    })

    console.log(recipes)
    return res.status(200).json(recipes)

}

function notFoundHndler(req,res){
    return res.status(404).send('page not found error')}
    
 function notFoundHndler1(req,res){
        return res.status(500).json.send('Sorry, something went wrong')}

 app.listen(3000, ()=>{

    console.log('listening to port 3000')
})