const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const SummarySchema=new Schema(
    {
        Event_ID:{
            type:String,
            require:true
        },
        Summarys:{
            type:String,
            require:true
        },
        Feedback:{
            type:Array,
            require:true
        },
        Certificate:{
            type:Array,
            require:true
        }

    }
);

module.exports=mongoose.model("Summary",SummarySchema);