import fs from "fs";
import Form from "../models/Form.js";

const colors = [
  "#E74C3C",
  "#3498DB",
  "#2ECC71",
  "#9B59B6",
  "#F39C12",
  "#1ABC9C",
  "#34495E",
  "#E91E63",
  "#795548",
  "#3F51B5",
];

export const addPDF = async (req, res) => {
  try {
    const { title, group, summary, googleDriveUrl } = req.body;

    if (!title || !group || !summary || !googleDriveUrl) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Random Color
    const color = colors[Math.floor(Math.random() * colors.length)];

    // Convert paragraph into points
    const summaryPoints = summary
  .split(".")
  .map((point) => point.trim())
  .filter((point) => point.length > 0)
  .map((point) => point + ".");
  
    const form = await Form.create({
      title,
      group,
      color,
      summary: summaryPoints,
      googleDriveUrl,
    });

    return res.status(201).json({
      success: true,
      message: "Document added successfully.",
      data: form,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPDFs = async (req, res) => {
  try {
    const forms = await Form.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: forms.length,
      data: forms,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updatePDF = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, group, summary, googleDriveUrl } = req.body;

    const form = await Form.findById(id);

    if (!form) {
      return res.status(404).json({
        success: false,
        message: "Document not found.",
      });
    }

    if (title) form.title = title;
    if (group) form.group = group;
    if (googleDriveUrl) form.googleDriveUrl = googleDriveUrl;

    if (summary) {
      form.summary = summary
        .split(".")
        .map((item) => item.trim())
        .filter(Boolean);
    }

    await form.save();

    return res.status(200).json({
      success: true,
      message: "Document updated successfully.",
      data: form,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deletePDF = async (req, res) => {
  try {
    const { id } = req.params;

    const form = await Form.findById(id);

    if (!form) {
      return res.status(404).json({
        success: false,
        message: "Document not found.",
      });
    }

    await Form.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Document deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getGroups = async (req, res) => {
  try {
    const groups = await Form.distinct("group");

    res.status(200).json({
      success: true,
      count: groups.length,
      data: groups,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getFormsByGroup = async (req, res) => {
  try {
    const { group } = req.params;

    const forms = await Form.find({ group }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: forms.length,
      data: forms,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
