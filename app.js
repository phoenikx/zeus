var express=require("expresss"),
    app=express(),
    bodyparser=require("body-parser");
    
app.listen(process.env.PORT,process.env.IP,function(err)
{
    if(err)
    {
        console.log(err);
    }
    else{
        console.log("server started");
    }
})