const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");
const pg = require("pg");

const app = express();
app.use(bodyParser.json());

// Database setup
const sequelize = new Sequelize("postgresql://test_nq2p_user:jgICFMuHQqYbjcblCvCkjVSJx7VGZw0L@dpg-cu7f0clumphs73d5ieu0-a/test_nq2p:5432/doctor_service", {
  dialect: 'postgres',
  dialectModule: pg
});

const Doctor = sequelize.define("Doctor", {
  name: { type: DataTypes.STRING, allowNull: false },
  specialty: { type: DataTypes.STRING, allowNull: false },
});

sequelize.sync();

// Get all doctors
app.get("/doctors", async (req, res) => {
  const doctors = await Doctor.findAll();
  res.json(doctors);
});

// Add a new doctor
app.post("/doctors", async (req, res) => {
  const { name, specialty } = req.body;
  const doctor = await Doctor.create({ name, specialty });
  res.json(doctor);
});

// Start service
app.listen(4002, () => console.log("Doctor Service running on port 4002"));
