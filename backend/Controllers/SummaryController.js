const SummaryModule=require("../Models/SummaryModel");
const mongoose=require("mongoose");

// ----------- CREATE -------------

const CreateSummary=async(req,res)=>{
    const{Event_ID,Summarys,Feedback,Certificate}=req.body;
    try{
        const Summary=await SummaryModule.create({Event_ID,Summarys,Feedback,Certificate});
        res.status(200).json(Summary);
    }
    catch(e){
        res.status(400).json({error:e.message})
    }
}

// -------------- READ --------------

const GetSummary=async(req,res)=>{
    try{
        const Summary=await SummaryModule.find();
        res.status(200).json(Summary);
    }
    catch(e){
        res.status(400).json({error:e.message})
    }
}

const GetSummaryId=async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Summary Not Found"})
    }
    try{
        const Summary=await SummaryModule.findById(id);
        res.status(200).json(Summary)
    }
    catch(e){
        res.status(400).json({error:e.message})
    }
}

// ------------- UPDATE ---------------

const PatchSummary=async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Summary Not Found"})
    }
    try{
        const Summary=await SummaryModule.findByIdAndUpdate({
            _id:id,
        },{
            ...req.body
        });
        res.status(200).json(Summary);
    }
    catch(e){
        res.status(400).json({error:e.message})
    }
}

// ---------------- DELETE ------------------

const DeleteSummary=async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Summary Not Found"})
    }
    try{
        const Summary=await SummaryModule.findByIdAndDelete(id);
        res.status(200).json(Summary);
    }
    catch(e){
        res.status(400).json({error:e.message})
    }
}

module.exports={CreateSummary,GetSummary,GetSummaryId,PatchSummary,DeleteSummary}