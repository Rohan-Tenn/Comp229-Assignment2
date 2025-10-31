import express from 'express';

import {
    createEducation,
    getAllEducations,
    getEducationById,
    updateEducationById,
    deleteAllEducations,
    deleteEducationById
} from '../controllers/education.controller.js';


const router = express.Router();
router.get('/api/qualifications', getAllEducations); 
router.get('/api/qualifications/:id', getEducationById);
router.post('/api/qualifications', createEducation);
router.put('/api/qualifications/:id', updateEducationById);
router.delete('/api/qualifications/:id', deleteEducationById);
router.delete('/api/qualifications', deleteAllEducations);




export default router;