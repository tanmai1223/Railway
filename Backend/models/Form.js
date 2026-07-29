import mongoose from "mongoose";

const FormSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    group: {
      type: String,
      required: true,
      trim: true,
    },

    color: {
      type: String,
      required: true,
    },

    summary: {
      type: [String],
      required: true,
    },

    googleDriveUrl: {
      type: String,
      required: true,
      trim: true,
    },

    // New field for drag & drop ordering
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Form = mongoose.model("Form", FormSchema);

export default Form;