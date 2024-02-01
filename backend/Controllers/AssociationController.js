const AssociationModel=require("../Models/AssociationModel");
const mongoose=require("mongoose");

// ============= C R E D ===============

// ------------ CREATE ---------------

const CreateAssociation=async (req,res)=>{
    const{Name,OBs,LastModifedBy}=req.body
    try{
        const Association=await AssociationModel.create({Name,OBs,LastModifedBy});
        res.status(200).json(Association)
    }
    catch(e){
        res.status(400).json({error:e.message})
    }
}

// -------------- READ --------------

const GetAssociation=async(req,res)=>{
    try{
        const Association=await AssociationModel.find();
        res.status(200).json(Association);
    }
    catch(e){
        res.status(400).json({error:e.message})
    }
}

// ------------- EDIT --------------

const PatchAssociation=async(req,res)=>{
    const {id}=req.params;
    try{
        const Association=await AssociationModel.findByIdAndUpdate({
            _id:id
        },{
            ...req.body
        });
        res.status(200).json(Association);
    }
    catch(e){
        res.status(400).json({error:e.message});
    }
}

// -------------------- DELETE ----------------------

// ---- FOR SECURITY ISSUSE DELETE WAS NOT ADDED ----

module.exports={CreateAssociation,GetAssociation,PatchAssociation};