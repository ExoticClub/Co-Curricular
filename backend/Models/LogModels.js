const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const LogSchema=new Schema(
    {
        Name:{
            type:String,
            require:true
        },
        RegNo:{
            type:String,
            require:true,
            unique:true
        },
        Department:{
            type:String,
            require:true
        },
        Password:{
            type:String,
            require:true
        },
        Role:{
            type:String,
            require:true
        }

    }
);

module.exports=mongoose.model("Log",LogSchema);