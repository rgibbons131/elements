const { ObjectId } = require("mongodb/lib/bson");
const mongodb = require("../db/connect");
const dotenv = require("dotenv");
dotenv.config();
API_KEY = process.env.API_KEY;

const getData = async (req, res, next) => {
  const result = await mongodb
    .getDb()
    .db("elements")
    .collection("elements")
    .find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists); // we just need the first one (the only one)
  });
};

const getElement = async (req, res, next) => {
  if (typeof req.params.name == "string" && req.params.name != "") {
    const result = await mongodb
      .getDb()
      .db("elements")
      .collection("elements")
      .findOne({ name: req.params.name })
      .then((element) => {
        if (element == null) {
          console.log("Account not found err");
          res.status(500).json({ message: "An error ocured" });
        } else {
          res.setHeader("Content-Type", "application/json");
          res.status(200).json(element);
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "An error ocured" });
      });
  } else {
    res.status(500).json({ message: "Invalid name" });
  }
};

const postElement = async (req, res, next) => {
  try {
    if (
      typeof req.body.name == "string" &&
      req.body.name != "" &&
      typeof req.body.atomicWeight == "number" &&
      req.body.atomicWeight >= 0.0 &&
      typeof req.body.meltingPoint == "number" &&
      typeof req.body.boilingPoint == "number" &&
      typeof req.body.magnetic == "boolean" &&
      typeof req.body.color == "string" &&
      req.body.color != "" &&
      typeof req.body.stateOfMatter == "string" &&
      req.body.stateOfMatter != "" &&
      typeof req.body.conductivity == "boolean"
    ) {
      const element = {
        name: req.body.name,
        atomicWeight: req.body.atomicWeight,
        meltingPoint: req.body.meltingPoint,
        boilingPoint: req.body.boilingPoint,
        magnetic: req.body.magnetic,
        color: req.body.color,
        stateOfMatter: req.body.stateOfMatter,
        conductivity: req.body.conductivity,
      };
      const result = await mongodb
        .getDb()
        .db("elements")
        .collection("elements")
        .insertOne(element);

      res.setHeader("Content-Type", "application/json");
      res.status(201).json({ id: result.insertedId });
    } else {
      res.status(500).json({ message: "All elements required" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error ocured" });
  }
};

const putElement = async (req, res, next) => {
  try {
    if (
      typeof req.body.name == "string" &&
      req.body.name != "" &&
      typeof req.body.atomicWeight == "number" &&
      req.body.atomicWeight >= 0.0 &&
      typeof req.body.meltingPoint == "number" &&
      typeof req.body.boilingPoint == "number" &&
      typeof req.body.magnetic == "boolean" &&
      typeof req.body.color == "string" &&
      req.body.color != "" &&
      typeof req.body.stateOfMatter == "string" &&
      req.body.stateOfMatter != "" &&
      typeof req.body.conductivity == "boolean"
    ) {
      const element = {
        name: req.body.name,
        atomicWeight: req.body.atomicWeight,
        meltingPoint: req.body.meltingPoint,
        boilingPoint: req.body.boilingPoint,
        magnetic: req.body.magnetic,
        color: req.body.color,
        stateOfMatter: req.body.stateOfMatter,
        conductivity: req.body.conductivity,
      };
      const result = await mongodb
        .getDb()
        .db("elements")
        .collection("elements")
        .updateOne({ name: req.params.name }, { $set: element })
        .then((element) => {
          console.log(element);
          if (element.matchedCount >= 1) {
            res.setHeader("Content-Type", "application/json");
            res.status(204).send();
          } else {
            res.status(200).json({ message: "No Account" });
          }
        });
    } else {
      res.status(500).json({ message: "All elements required" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error ocured" });
  }
};

const deleteElement = async (req, res, next) => {
  try {
    const result = await mongodb
      .getDb()
      .db("elements")
      .collection("elements")
      .deleteOne({ name: req.params.name })
      .then((element) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).send();
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error ocured" });
  }
};

module.exports = {
  getData,
  getElement,
  postElement,
  putElement,
  deleteElement,
};
