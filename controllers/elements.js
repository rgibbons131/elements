const { ObjectId } = require("mongodb/lib/bson");
const mongodb = require("../db/connect");
const dotenv = require("dotenv");
dotenv.config();
API_KEY = process.env.API_KEY;

const getData = async (req, res, next) => {
  if (req.headers.authorization == API_KEY) {
    const result = await mongodb
      .getDb()
      .db("elements")
      .collection("elements")
      .find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists); // we just need the first one (the only one)
    });
  } else {
    res.status(500).json({ message: "Invalid API key" });
  }
};

const getElement = async (req, res, next) => {
  if (req.headers.authorization == API_KEY) {
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
            res.status(200).json(account);
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ message: "An error ocured" });
        });
    } else {
      res.status(500).json({ message: "Invalid name" });
    }
  } else {
    res.status(500).json({ message: "Invalid API key" });
  }
};

const postElement = async (req, res, next) => {
  try {
    if (
      req.body.name != null &&
      req.body.name != undefined &&
      req.body.atomicWeight != null &&
      req.body.atomicWeight != undefined &&
      req.body.meltingPoint != null &&
      req.body.meltingPoint != undefined &&
      req.body.boilingPoint != null &&
      req.body.boilingPoint != undefined &&
      req.body.magnetic != null &&
      req.body.magnetic != undefined &&
      req.body.color != null &&
      req.body.color != undefined &&
      req.body.stateOfMatter != null &&
      req.body.stateOfMatter != undefined &&
      req.body.conductivity != null &&
      req.body.conductivity != undefined
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

const putUser = async (req, res, next) => {
  try {
    if (
      req.body.firstName != null &&
      req.body.firstName != undefined &&
      req.body.lastName != null &&
      req.body.lastName != undefined &&
      req.body.email != null &&
      req.body.email != undefined &&
      req.body.favoriteColor != null &&
      req.body.favoriteColor != undefined &&
      req.body.birthday != null &&
      req.body.birthday != undefined
    ) {
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday,
      };
      const result = await mongodb
        .getDb()
        .db("user")
        .collection("contacts")
        .updateOne({ _id: new ObjectId(req.params.userId) }, { $set: user })
        .then((account) => {
          console.log(account);
          if (account.matchedCount >= 1) {
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
      .db("user")
      .collection("contacts")
      .deleteOne({ _id: new ObjectId(req.params.userId) })
      .then((account) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).send();
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error ocured" });
  }
};

module.exports = { getData, getElement, postElement, putUser, deleteElement };
