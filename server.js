require('dotenv').config();
const express = require('express');
const cors = require('cors');


const app = express();
const PORT =process.env.PORT;
const server = express();
const axios = require('axios');
app.use(cors());
let userSearch = "movie";
//const recipeData = require('./Movie_Data/data.json');
let numberOfRecipes=4;
let url =(`https://api.themoviedb.org/3/trending/all/week?api_key= ${process.env.APIKEY} &number=${numberOfRecipes}`)

//app.get('/',recipesHandler);
//app.get('/favorite',fav);
//app.get('/not',notFoundHndler1);

server.get('/trending',handel)
server.get('/search',search)
server.use('*',notFoundHandler)


function dataa(id,title,release_date,poster_path,overview) {
    this.id=id;
    this.title=title;
    this.release_date=release_date;
    this.poster_path=poster_path;
    this.overview=overview;

}

function handel(req,res){ 
   let newArr=[];
    axios.get(url)
    .then((result) =>{
        result.data.dataa.forRach(dataa => { 
           newArr.push(new dataa (dataa.id,dataa.title,dataa.release_date,dataa.poster_path,data.overview));
          // let da = result.data.dataa.map(dataa => {
             //  return new dataa(dataa.id,dataa.title,dataa.release_date,dataa.poster_path,data.overview)
           });
        
        res.status(200).json(da)
    console.log(data);
    }).catch((err)=>{})

}
function search(req,res){
    let url =(`https://api.themoviedb.org/3/trending/all/week?api_key= ${process.env.APIKEY} &number=${numberOfRecipes} &query=${userSearch}`)
    axios.get(url)
    .then(result=>{
        result.data.dataa.forRach(dataa => { 
            newArr.push(new dataa (dataa.id,dataa.title,dataa.release_date,dataa.poster_path,data.overview));
    
    res.status(200).json(recipes);  
 }).catch(err=>{

})
});}

//  function fav(req,res){
//      return res.status(200).send("Welcome to Favorite Page")
 

//  function Recipes(title,poster_path,overview)
//  {
//      this.title=title;
//      this.poster_path=poster_path;
//      this.overview=overview;
    
// }



// function recipesHandler(req,res){
//     let recipes=[];
//    // recipeData.data.map(recipe =>{
        
//         let oneRecipe = new Recipes(recipeData.title, recipeData.poster_path,recipeData.overview)
//         recipes.push(oneRecipe)
//         console.log(recipeData)

// //    })

//     console.log(recipes)
//     return res.status(200).json(recipes)

// }


    
//  function notFoundHndler1(req,res){
//         return res.status(500).json.send('Sorry, something went wrong')}

//  app.listen(3000, ()=>{

//     console.log('listening to port 3000')
// })



function notFoundHandler(req,res){
    res.status(404).send("This page is not found")
 }
 
 // function errorHandler (){}
 
 
 
 server.listen(PORT,()=>{
     console.log(`listining to port ${PORT}`)
 })
