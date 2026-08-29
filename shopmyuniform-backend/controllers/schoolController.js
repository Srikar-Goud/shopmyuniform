import School from "../models/School.js";

export const listSchools = async (req, res, next) => {
  try {
    const schools = await School.find().sort({ name: 1 });
    res.json({ schools });
  } catch (err) {
    next(err);
  }
};

export const getSchool = async (req, res, next) => {
  try {
    const school = await School.findById(req.params.id);
    if (!school) return res.status(404).json({ message: "School not found" });
    res.json({ school });
  } catch (err) {
    next(err);
  }
};

export const createSchool = async (req, res, next) => {
  try {
    const school = await School.create(req.body);
    res.status(201).json({ school });
  } catch (err) {
    next(err);
  }
};
