const express = require("express");
const app = express();
const request = require("request");
const dotenv = require("dotenv");

app.set("view engine" , "ejs");
dotenv.config();
app.use("/public" , express.static("public"));

app.get("/" , (req,res)=>{
    res.render("homepage");
});
app.get("/result" , (req,res)=>{
    //console.log(req);
    //console.log(req.query.movieName)
    //const query = req.query.search;
    const url = `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${req.query.movieName}`
    request(url , function(error , response , body ){
        if(!error && response.statusCode == 200){
            const data = JSON.parse(body);
            //console.log(data);
            res.render("moviepage" , {movie:data});
        }else{
            res.send("Uh ohh ! There is Error!");
        }
    });

});
app.get("/result/:id" , (req,res)=>{
    const url = `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&i=${req.params.id}`
    request( url , function(error , response , body ){
        if(!error && response.statusCode == 200){
            const data = JSON.parse(body);
            //console.log(data)
            res.render("name", {movie:data})
        }else{
            res.send("Uh ohh ! There is Error!")
        }
    });
});

app.get("/aboutme" , (req,res)=>{
    res.render("aboutme")
})

app.get("/myproject", (req,res)=>{
    res.render("myproject")
})

app.get("*" , (req,res)=>{
    res.send("Matlab Kuch Bhi , Bhai Aesa thodi naa hota hai !")
});
app.listen(process.env.PORT,function(){
    console.log(`Server has startred at port ${process.env.PORT}`);
});