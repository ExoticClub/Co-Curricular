const{CreateSummary,GetSummary,GetSummaryId,PatchSummary,DeleteSummary}=require("../Controllers/SummaryController");
const express=require("express");
const router=express.Router();

router.post("/",CreateSummary);
router.get("/",GetSummary);
router.get("/:id",GetSummaryId);
router.patch("/:id",PatchSummary);
router.delete("/:id",DeleteSummary);

module.exports=router;