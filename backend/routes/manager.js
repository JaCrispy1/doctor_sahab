const router = require("express").Router();
const Hospital = require("../model/Hospital");
const { ObjectId } = require("mongodb");
const Doctor = require("../model/Doctor");
require("dotenv").config();

router.post("/createHospital", async (req, res) => {
  const { name, phone, speciality, city, address } = req.body;
  if (!name || !phone || !speciality || !city || !address) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }
  const newHospital = new Hospital({
    name: name,
    phone: phone,
    speciality: speciality,
    city: city,
    address: address,
  });
  try {
    await newHospital.save();
    res.status(200).json({ message: "Hospital Created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/getSpeciality/:id", async (req, res) => {
  try {
    const hospital = await Hospital.findOne({ _id: ObjectId(req.params.id) });
    if (!hospital) {
      return res.status(400).json({ message: "Hospital not found" });
    }
    const speciality = hospital.speciality;
    res.send({ message: "Speciality", speciality: speciality });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/getHospitals", async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.status(200).json({ hospitals: hospitals });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/getDoctor/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const doctor = await Doctor.findOne({ _id: ObjectId(req.params.id) });
    if (!doctor) {
      return res.status(400).json({ message: "Doctor not found" });
    }
    res.status(200).json({ doctor: doctor });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/addSpeciality/:hospital", async (req, res) => {
  const hospital = req.params.hospital;
  const { id, name, description } = req.body;
  try {
    const hospitals = await Hospital.find({ _id: ObjectId(hospital) });
    if (!hospitals) {
      return res.status(400).json({ message: "Hospital not found" });
    }
    hospitals.speciality.push({ id: id, name: name, description: description });
    res.send({ message: "Speciality", speciality: speciality });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/createDoctor", async (req, res) => {
  console.log(req.body);
  const {
    name,
    phone,
    experience,
    nmc,
    speciality,
    qualification,
    hospital,
    available,
  } = req.body;
  if (
    !name ||
    !phone ||
    !experience ||
    !nmc ||
    !speciality ||
    !qualification ||
    !hospital ||
    !available
  ) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }
  const newDoctor = new Doctor({
    name: name,
    phone: phone,
    experience: experience,
    NMC: nmc,
    speciality: speciality,
    qualification: qualification,
    hospital: hospital,
    available: available,
  });
  try {
    await newDoctor.save();
    res.status(200).json({ message: "Doctor Created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/getDoctors/:hospital", async (req, res) => {
  const hospital = req.params.hospital;
  try {
    const doctors = await Doctor.find({ hospital: hospital });
    res.status(200).json({ doctors: doctors });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/getSpecialityDoctors", async (req, res) => {
  const { specialist, hospital } = req.body;
  console.log(specialist, hospital);
  try {
    const doctors = await Doctor.find({
      speciality: specialist,
      hospital: hospital,
    });
    res.status(200).json({ doctors: doctors });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/deleteDoctor/:id", async (req, res) => {
  try {
    // code to delete the doctor
    const id = req.params.id;
    const doctor = await Doctor.findByIdAndDelete(id);
    res.status(200).json({ message: "Doctor Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.patch("/updateDoctor/:id", async (req, res) => {
  console.log(req.body);
  const id = req.params.id;
  try {
    // code to update the doctor
    const doctor = await Doctor.findByIdAndUpdate(id, {
      name: req.body.name,
      phone: req.body.phone,
      experience: req.body.experience,
      NMC: req.body.NMC,
      speciality: req.body.speciality,
      qualification: req.body.qualification,
      hospital: req.body.hospital,
    });

    console.log(doctor);

    res.status(200).json({ message: "Doctor Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/editSchedule", async (req, res) => {
  const { doctor, date, time, id } = req.body;
  console.log(req.body);
  try {
    const doctor1 = await Doctor.findOne({ _id: ObjectId(doctor) });
    if (!doctor1) {
      return res.status(400).json({ message: "Doctor not found" });
    }
    const available = doctor1.available;
    const index = available.findIndex((item) => item.id === id);
    available[index].date = date;
    available[index].time = time;
    await doctor1.save();
    res.status(200).json({ message: "Schedule Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/addHospitalSpeciality", async (req, res) => {
  const { hospitalId, name, description } = req.body;
  console.log(req.body);
  if (!hospitalId || !name || !description) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }
  const hospital = await Hospital.findOne({ _id: ObjectId(hospitalId) });
  if (!hospital) {
    return res.status(400).json({ message: "Hospital not found" });
  }
  try {
    hospital.speciality.push({ name: name, description: description });
    await hospital.save();
    res.status(200).json({ message: "Speciality Added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/getHospitalSpeciality/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const hospital = await Hospital.findOne({ _id: ObjectId(id) });
    if (!hospital) {
      return res.status(400).json({ message: "Hospital not found" });
    }
    res.status(200).json({ speciality: hospital.speciality });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/deleteHospitalSpeciality/:id", async (req, res) => {
  const id = req.params.id;
  const { hospitalId } = req.body;
  try {
    const hospital = await Hospital.findOne({ _id: ObjectId(hospitalId) });
    if (!hospital) {
      return res.status(400).json({ message: "Hospital not found" });
    }
    const index = hospital.speciality.findIndex(
      (item) => item._id.toString() === id
    );
    hospital.speciality.splice(index, 1);
    await hospital.save();
    res.status(200).json({ message: "Speciality Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
