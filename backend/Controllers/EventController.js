const EventModule=require("../Models/EventModels");
const mongoose=require("mongoose");

// ----------- CREATE -------------

const CreateEvent=async(req,res)=>{
    const{Name,Date,Time,Venue,Participants,Rules,POMap,SIC,FIC,HODA,CoCA,VPA,PA}=req.body;
    try{
        const Event=await EventModule.create({Name,Date,Time,Venue,Participants,Rules,POMap,SIC,FIC,HODA,CoCA,VPA,PA});
        res.status(200).json(Event);
    }
    catch(e){
        res.status(400).json({error:e.message})
    }
}

// -------------- READ --------------

const GetEvent=async(req,res)=>{
    try{
        const Event=await EventModule.find();
        res.status(200).json(Event);
    }
    catch(e){
        res.status(400).json({error:e.message})
    }
}

const GetEventId=async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Event Not Found"})
    }
    try{
        const Event=await EventModule.findById(id);
        res.status(200).json(Event)
    }
    catch(e){
        res.status(400).json({error:e.message})
    }
}

// ------------- UPDATE ---------------

const PatchEvent=async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Event Not Found"})
    }
    try{
        const Event=await EventModule.findByIdAndUpdate({
            _id:id,
        },{
            ...req.body
        });
        res.status(200).json(Event);
    }
    catch(e){
        res.status(400).json({error:e.message})
    }
}

// ---------------- DELETE ------------------

const DeleteEvent=async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Event Not Found"})
    }
    try{
        const Event=await EventModule.findByIdAndDelete(id);
        res.status(200).json(Event);
    }
    catch(e){
        res.status(400).json({error:e.message})
    }
}

module.exports={CreateEvent,GetEvent,GetEventId,PatchEvent,DeleteEvent}