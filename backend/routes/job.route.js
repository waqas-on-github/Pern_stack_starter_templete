import { Router } from "express";
import { createJob , deleteJob, getOneJob, getAllJobs, deleteAllJobs, updateJob} from "../controlers/job.contrler.js";

const router = Router()

router.get('/jobs' , getAllJobs)  
router.get("/:id" , getOneJob)

router.post('/new', createJob)


router.delete("/delete" , deleteAllJobs)
router.delete('/delete/:id' , deleteJob )

router.put('/update/:id' , updateJob)

export {
    router
}