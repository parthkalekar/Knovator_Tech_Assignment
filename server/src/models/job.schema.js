const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    jobId: String,
    title: String,
    company: String,
    description: String,
    url: String,
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", JobSchema);

module.exports = Job;
