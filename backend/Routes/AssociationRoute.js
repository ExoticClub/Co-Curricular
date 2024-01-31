const{CreateAssociation,GetAssociation,PatchAssociation}=require("../Controllers/AssociationController");
const express=require("express");
const router=express.Router();

router.post("/",CreateAssociation);
router.get("/",GetAssociation);
router.patch("/:id",PatchAssociation);

module.exports=router;