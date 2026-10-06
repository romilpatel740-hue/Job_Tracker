import Application from "../models/Application.js";
import mongoose from "mongoose";

// GET all applications
export async function getApplications(req, res) {
  try {
    const applications = await Application.find();

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch applications",
      error: error.message,
    });
  }
}

// GET one application
export async function getApplicationById(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid application ID",
      });
    }

    const application = await Application.findById(id);

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch application",
      error: error.message,
    });
  }
}

// POST create application
export async function createApplication(req, res) {
  try {
    const {
      company,
      role,
      location,
      status,
    } = req.body;

    if (!company || !role || !location || !status) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newApplication = await Application.create({
      company,
      role,
      location,
      status,
    });

    res.status(201).json({
      message: "Application created successfully",
      application: newApplication,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create application",
      error: error.message,
    });
  }
}

// PUT update application
export async function updateApplication(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid application ID",
      });
    }

    const {
      company,
      role,
      location,
      status,
    } = req.body;

    if (!company || !role || !location || !status) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const updatedApplication =
      await Application.findByIdAndUpdate(
        id,
        {
          company,
          role,
          location,
          status,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedApplication) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    res.status(200).json({
      message: "Application updated successfully",
      application: updatedApplication,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update application",
      error: error.message,
    });
  }
}

// DELETE application
export async function deleteApplication(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid application ID",
      });
    }

    const deletedApplication =
      await Application.findByIdAndDelete(id);

    if (!deletedApplication) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    res.status(200).json({
      message: "Application deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete application",
      error: error.message,
    });
  }
}