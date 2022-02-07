DROP TABLE IF EXISTS movies;
    
   CREATE TABLE IF NOT EXISTS movies
    (id  int ,
   title VARCHAR(255),
   release_date VARCHAR(1000),
   poster_path VARCHAR(1000),
   overview VARCHAR(1000),
   original_name VARCHAR(1000)) ;
