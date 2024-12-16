import { Router } from 'express';
import { HospitalController } from '../controllers/hospital.controller';

const router = Router();
const hospitalController = new HospitalController();

router.get("/", hospitalController.getHospitals.bind(hospitalController));

export default router;