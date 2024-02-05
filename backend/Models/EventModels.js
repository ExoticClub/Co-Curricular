const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const EventSchema=new Schema(
    {
        Name:{
            type:String,
            require:true,
            unique:true
        },
        Date:{
            type:String,
            require:true
        },
        Time:{
            type:String,
            require:true
        },
        Venue:{
            type:String,
            require:true
        },
        Participants:{
            type:Array,
            require:true
        },
        Rules:{
            type:String,
            require:true
        },
        POMap:{
            type:Array,
            require:true
        },
        SIC:{
            type:String,
            require:true
        },
        FIC:{
            type:String,
            require:true
        },
        HODA:{
            type:Array,
            require:true
        },
        CoCA:{
            type:Array,
            require:true
        },
        VPA:{
            type:Array,
            require:true
        },
        PA:{
            type:Array,
            require:true
        }

    }
);

module.exports=mongoose.model("Event",EventSchema);