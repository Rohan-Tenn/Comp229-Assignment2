// CRUD for contact model



import ContactModel from "../models/contact.model.js";

export const getAllContacts = async (req, res) => {

    try{
         const contacts = await ContactModel.find();
         res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getContactById = async (req, res) => {

    try{
         const contact = await ContactModel.findById(req.params.id);
         if (!contact){
            return res.status(404).json({message: "Contact not found" })
         }
         res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


export const createContact = async (req, res) => {

    try{
        const newContact = new ContactModel(req.body);
        const savedContact = await newContact.save();

         res.status(200).json(savedContact);
         
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}



export const updateContactById = async (req, res) => {

    try{
         const updatedcontact = await ContactModel.findByIdAndUpdate(req.params.id, req.body, { new: true});

         if (!updatedcontact){
            return res.status(404).json({message: "Contact not found" })
         }
         res.status(200).json(updatedcontact);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


export const deleteContactById = async (req, res) => {

    try{
         const deletedContact = await ContactModel.findByIdAndDelete(req.params.id);

         if (!deletedContact){
            return res.status(404).json({message: "Contact not found" })
         }
         res.status(200).json(deletedContact);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const deleteAllContacts = async (req, res) => {

    try{
         const deleteAllContacts = await ContactModel.deleteMany();
         res.status(200).json({message: "All deleted"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
