const express=require("express");
const app=express();
const mongoose=require("mongoose");
const LogRoute=require("./Routes/LogRoute");
const cors = require('cors');
const AssociationRoute=require("./Routes/AssociationRoute");
const EventRoute=require("./Routes/EventRoute");
const SummaryRoute=require("./Routes/SummaryRoute");

const Port=4689;
const Uri="mongodb+srv://teamexotic:Kishor-2005@exotic.ru2tbx8.mongodb.net/?retryWrites=true&w=majority"


app.get("/",(req,res)=>{
    res.send("Hello !")
})
app.use(express.json());
app.use(cors());
app.use((req,res,next)=>{
    console.log(req.method);
    next();
});

mongoose.connect(Uri)
.then(()=>{
    app.listen(Port,()=>{
        console.log("Listening To Port ",Port)
        console.log("DB Connect Sucessfully...")
    })
})
.catch((e)=>{
    console.log(e)
})

app.use("/api/log",LogRoute);
app.use("/api/Association",AssociationRoute);
app.use("/api/event",EventRoute);
app.use("/api/summary",SummaryRoute);