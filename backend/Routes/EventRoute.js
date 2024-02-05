const{CreateEvent,GetEvent,GetEventId,PatchEvent,DeleteEvent}=require("../Controllers/EventController");
const express=require("express");
const router=express.Router();

router.post("/",CreateEvent);
router.get("/",GetEvent);
router.get("/:id",GetEventId);
router.patch("/:id",PatchEvent);
router.delete("/:id",DeleteEvent);

module.exports=router;