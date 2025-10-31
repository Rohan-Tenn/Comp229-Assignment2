// CRUD for project model

import ProjectModel from "../models/project.model.js";

export const getAllProjects = async (req, res) => {

    try{
         const projects = await ProjectModel.find();
         res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getProjectById = async (req, res) => {

    try{
         const project = await ProjectModel.findById(req.params.id);
         if (!project){
            return res.status(404).json({message: "Project not Found" })
         }
         res.status(200).json(project);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


export const createProject = async (req, res) => {

    try{
        const newProject = new ProjectModel(req.body);
        const savedProject = await newProject.save();

         res.status(200).json(savedProject);
         
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}



export const updateProjectById = async (req, res) => {

    try{
         const updatedproject = await ProjectModel.findByIdAndUpdate(req.params.id, req.body, { new: true});

         if (!updatedproject){
            return res.status(404).json({message: "Project not Found" })
         }
         res.status(200).json(updatedproject);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


export const deleteProjectById = async (req, res) => {

    try{
         const deletedproject = await ProjectModel.findByIdAndDelete(req.params.id);

         if (!deletedproject){
            return res.status(404).json({message: "Project not Found" })
         }
         res.status(200).json(deletedproject);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const deleteAllProjects = async (req, res) => {

    try{
         const deleteAllProjects = await ProjectModel.deleteMany();
         res.status(200).json({message: "All deleted"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
