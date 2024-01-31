const mongoose=require("mongoose")
const Schema=mongoose.Schema;

const AssociationSchema=new Schema({
    Name:{
        type:String,
        require:true,
        unique:true
    },
    OBs:{
        type:Array,
        require:true
    }
});

module.exports=mongoose.model("Association",AssociationSchema);