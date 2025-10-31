import express from 'express';

import {
    createContact,
    getAllContacts,
    getContactById,
    updateContactById,
    deleteAllContacts,
    deleteContactById
} from '../controllers/contact.controller.js';


const router = express.Router();
router.get('/api/contacts', getAllContacts); 
router.get('/api/contacts/:id', getContactById);
router.post('/api/contacts', createContact);
router.put('/api/contacts/:id', updateContactById);
router.delete('/api/contacts/:id', deleteContactById);
router.delete('/api/contacts', deleteAllContacts);




export default router;