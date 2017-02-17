var express=require("express"),
    app=express(),
    bodyparser=require("body-parser");

app.use(express.static("public"));
app.set("view engine","ejs");


app.get("/",function(req,res)
{
   res.render("index");
});

app.post("/download",function(req,res)
{
    
});

app.listen(process.env.PORT,process.env.IP,function(err)
{
    if(err)
    {
        console.log(err);
    }
    else{
        console.log("server started");
    }
});
