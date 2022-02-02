require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT =process.env.PORT;
const pg = require('pg');
const server = express();
const axios = require('axios');
server.use(cors());
const client = new pg.Client(process.env.DATABASE_URL);
//const cors = require('cors');
//let userSearch =  "Spider-Man: No Way Home";
let url =(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.APIKEY}`)


server.get('/trending',handel);
server.get('/search',search);
server.post('/addMovie',AddMovie);
server.use('/getMovies',GetMovies) 

server.put ('/update/:id',UpdateMovie);
server.delete('/delete/:id',DeleteMovie);
server.get('/getMovie/:id',GetMovieId);


server.use(handleServerError) 
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
    let searchedMovie=request.query.searchedMovie;
    console.log(searchedMovie);
    let url = `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.APIKEY}&query=${searchedMovie}`;
   
    axios.get(url)
    .then((result) =>{
        console.log(result);
       
          let newArr =result.data.results.map(x => {return new Dataa(x.id,x.title,x.release_date,x.poster_path,x.overview)})
     res.status(200).json(newArr)
    
    }).catch((err)=>{
        console.log("error")
    })
}



function AddMovie (req,res){
    const movie = request.body; 
    let sql = `INSERT INTO  movies(title,release_date,poster_path,overview,original_name) VALUES($1,$2,$3,$4,$5) RETURNING *`
    let values = [movie.title,movie.release_date,movie.poster_path,movie.overview,movie.original_name]; 
    client.query(sql,values).then(data=>{response.status(200).json(data.rows)}).catch(error=>{
        handleServerError(error,request,response);
    });


}




function GetMovies (request,response)
{
    let sql='SELECT * FROM movies;';
    client.query(sql).then(data=>{
    response.status(200).json(data.rows)
    }).catch(error=>{
        handleServerError(error,request,response);
    });
}
function notFoundHandler(req,res){
    res.status(404).send("This page is not found")
 }
 function handleServerError (Error,request,response){                      
    const error = {
        status : 500,
        message : Error
    };
    response.status(500).send(error);
}
 
 client.connect().then(()=>{
    server.listen(PORT,()=>{
    console.log(`listining to port ${PORT}`)
    });
});
 
//  server.listen(PORT,()=>{
//      console.log(`listining to port ${PORT}`)
//  })
