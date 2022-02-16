require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT =process.env.PORT;
const pg = require('pg');
const server = express();
const axios = require('axios');
server.use(cors());
server.use(express.json());
//const client = new pg.Client(process.env.DATABASE_URL);

const client = new pg.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
})
let url =(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.APIKEY}`)


server.get('/trending',handel);
server.get('/favorite',favr);
server.get('/search',search);
server.post('/addMovie',AddMovie);
server.use('/getMovies',GetMovies) 
server.put ('/update/:id',UpdateMovie);
server.delete('/delete/:id',DeleteMovie);
server.get('/getMovie/:id',GetMovieId);

server.use('*',notFoundHandler);
server.use(handleServerError) 


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
    let searchedMovie=req.query.searchedMovie;
    //console.log(searchedMovie);
    //let url = `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.APIKEY}&query=${searchedMovie}`;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.APIKEY}&language=en-US&query=${searchedMovie}&page=1`
    axios.get(url)
    .then((result) =>{
       // console.log(result);
       
          let newArr =result.data.results.map(x => {return new Dataa(x.id,x.title,x.release_date,x.poster_path,x.overview)})
     res.status(200).json(newArr)
    
    }).catch((err)=>{
        console.log("error")
    })
}

function favr(req,res){
    return res.status(200).send("Welcome to Favorite page")
}

function AddMovie (req,res){
    const movie = request.body; 
    let sql = `INSERT INTO  movies(title,release_date,poster_path,overview,original_name) VALUES($1,$2,$3,$4,$5) RETURNING *`
    let values = [movie.id,movie.title,movie.release_date,movie.poster_path,movie.overview,movie.original_name]; 
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

function UpdateMovie (request,response){

    const id = request.params.id;
    const movie = request.body; 
    const sql = `UPDATE movies 
    SET title=$1,release_date=$2, poster_path=$3, overview=$4,original_name=$5
    WHERE id = $6 RETURNING *;`;
    let values = [movie.id,movie.title,movie.release_date,movie.poster_path,movie.overview,movie.original_name,id]; 
    client.query (sql,values).then(data=>{
        response.status(200).json(data.rows);
    }).catch(error=>{
        console.log(error);
        handleServerError(error,request,response);
    });
} 
function DeleteMovie(request,response){
    const id = request.params.id;

    const sql = `DELETE FROM movies WHERE id=${id};`; 
    client.query(sql).then(()=>{
        response.status(200).json("Movie has been deleted");
    }).catch(error=>{
        handleServerError(error,request,response);
    });
}
function GetMovieId (request,response){
    const id = request.params.id;

    const sql = `SELECT * FROM movies WHERE id=$1;`;
    const values = [id]; 
    client.query(sql,values).then(data=>{
        response.status(200).json(data.rows)
        }).catch(error=>{
            
            handleServerError(error,request,response);
        });
}

function notFoundHandler(req,res){
    res.status(404).send("This page is not found")
 }
 function handleServerError (Error,request,response){                      
    const err = {
        status : 500,
        message : Error
    };
    response.status(500).send(err);
}
 
 client.connect().then(()=>{
    server.listen(PORT,()=>{
    console.log(`listining to port ${PORT}`)
    });
});
 
//  server.listen(PORT,()=>{
//      console.log(`listining to port ${PORT}`)
//  })
