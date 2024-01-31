const{CreateLog,GetLog,GetLogId,PatchLog,DeleteLog}=require("../Controllers/LogController");
const express=require("express");
const router=express.Router();

router.post("/",CreateLog);
router.get("/",GetLog);
router.get("/:id",GetLogId);
router.patch("/:id",PatchLog);
router.delete("/:id",DeleteLog);

module.exports=router;