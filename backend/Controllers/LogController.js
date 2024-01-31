const LogModule=require("../Models/LogModels");
const mongoose=require("mongoose");

// ----------- CREATE -------------

const CreateLog=async(req,res)=>{
    const{Name,RegNo,Department,Password}=req.body;
    try{
        const Log=await LogModule.create({Name,RegNo,Department,Password});
        res.status(200).json(Log);
    }
    catch(e){
        res.status(400).json({error:e.message})
    }
}

// -------------- READ --------------

const GetLog=async(req,res)=>{
    try{
        const Log=await LogModule.find();
        res.status(200).json(Log);
    }
    catch(e){
        res.status(400).json({error:e.message})
    }
}

const GetLogId=async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Log Not Found"})
    }
    try{
        const Log=await LogModule.findById(id);
        res.status(200).json(Log)
    }
    catch(e){
        res.status(400).json({error:e.message})
    }
}

// ------------- UPDATE ---------------

const PatchLog=async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Log Not Found"})
    }
    try{
        const Log=await LogModule.findByIdAndUpdate({
            _id:id,
        },{
            ...req.body
        });
        res.status(200).json(Log);
    }
    catch(e){
        res.status(400).json({error:e.message})
    }
}

// ---------------- DELETE ------------------

const DeleteLog=async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Log Not Found"})
    }
    try{
        const Log=await LogModule.findByIdAndDelete(id);
        res.status(200).json(Log);
    }
    catch(e){
        res.status(400).json({error:e.message})
    }
}

module.exports={CreateLog,GetLog,GetLogId,PatchLog,DeleteLog}