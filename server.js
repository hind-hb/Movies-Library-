require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT =process.env.PORT;
const server = express();
const axios = require('axios');
server.use(cors());
//const cors = require('cors');
let userSearch =  "Spider-Man: No Way Home";
let url =(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.APIKEY}`)


server.get('/trending',handel);
server.get('/search',search);
server.use('*',notFoundHandler);


function Dataa(id,title,release_date,poster_path,overview) {
    this.id=id;
    this.title=title;
    this.release_date=release_date;
    this.poster_path=poster_path;
    this.overview=overview;

}

function handel(req,res){ 
  console.log(url);
   
    axios.get(url)
    .then((result) =>{
        console.log(result);
    
          let newArr =result.data.results.map(x => {return new Dataa(x.id,x.title,x.release_date,x.poster_path,x.overview)})
     res.status(200).json(newArr)
    
    }).catch((err)=>{
        console.log("error")
    })

}

function search(req,res){
    let url = `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.APIKEY}&query=${userSearch}`;
   
    axios.get(url)
    .then((result) =>{
        console.log(result);
       
          let newArr =result.data.results.map(x => {return new Dataa(x.id,x.title,x.release_date,x.poster_path,x.overview)})
     res.status(200).json(newArr)
    
    }).catch((err)=>{
        console.log("error")
    })
}
function notFoundHandler(req,res){
    res.status(404).send("This page is not found")
 }
 
 
 
 
 server.listen(PORT,()=>{
     console.log(`listining to port ${PORT}`)
 })
