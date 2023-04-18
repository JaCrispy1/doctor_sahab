const router = require("express").Router();
const Admin = require("../model/Admin");
const Hospital = require("../model/Hospital");

router.post("/registerHospital", async (req, res) => {
  const { name, phone, address, email, password, image, lat, long, city } =
    req.body;
  console.log(req.body);
  if (
    !name ||
    !phone ||
    !city ||
    !address ||
    !email ||
    !password ||
    !image ||
    !lat ||
    !long
  ) {
    return res.status(400).json({ msg: "Not all fields have been entered." });
  }
  try {
    const newHospital = new Hospital({
      name,
      phone,
      address,
      email,
      password,
      image,
      city,
      lat,
      long,
    });
    await newHospital.save();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/registerAdmin", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ msg: "Not all fields have been entered." });
  }
  try {
    const newAdmin = new Admin({
      username,
      password,
    });
    await newAdmin.save();
    res.send({ message: "Registered Successfully" }).status(200);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/getHospitals", async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.status(200).send({hospital: hospitals});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/loginAdmin", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ msg: "Not all fields have been entered." });
  }
  try {
    const admin = await Admin.findOne({
      username: username,
      password: password,
    });
    if (!admin) {
      return res.status(400).json({ msg: "Invalid credentials." });
    }
    res.status(200).json({ message: "Logged In Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
