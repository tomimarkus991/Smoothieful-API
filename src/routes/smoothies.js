const express = require("express");
const router = express.Router();
const Smoothie = require("../models/Smoothie");
const { validationResult } = require("express-validator");

// // @route    GET error
// // @desc     Get error
// router.get("/error", (req, res) => {
//   throw new Error("This is an error");
// });

// @route    GET api/smoothies
// @desc     Get all smoothies
router.get("/", async (req, res) => {
  try {
    const smoothies = await Smoothie.find().sort({ name: 1 });
    res.json(smoothies);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});

// @route    GET api/smoothies/:id
// @desc     Get a smoothie based on id
router.get("/:id", async (req, res) => {
  try {
    const smoothie = await Smoothie.findById(req.params.id);
    if (!smoothie) return res.status(404).json({ msg: "Smoothie not found" });
    res.json(smoothie);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ msg: error.message });
  }
});

// @route    POST api/smoothies
// @desc     Post a smoothie
router.post("/", async (req, res) => {
  // let smoothie = {
  //   name: "Choco Smootho",
  //   ingredients:["Banana", "Ice Cream"]
  // }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, ingredients } = req.body;

  try {
    const newSmoothie = new Smoothie({
      name,
      ingredients,
    });
    let smoothie = await newSmoothie.save();
    res.json(smoothie);
  } catch (error) {
    console.error(error.message);
    res.status(500).json(error.message);
  }
});
// @route    PUT api/smoothies/:id
// @desc     Update a smoothie based on id
router.put("/:id", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, ingredients } = req.body;
  const smoothieFields = {};
  if (name) {
    smoothieFields.name = name;
  }
  if (ingredients) {
    smoothieFields.ingredients = ingredients;
  }
  try {
    let smoothie = await Smoothie.findById(req.params.id);
    if (!smoothie) return res.status(404).json({ msg: "Smoothie not found" });
    smoothie = await Smoothie.findByIdAndUpdate(
      req.params.id,
      { $set: smoothieFields },
      { new: true }
    );
    res.json(smoothie);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});
// @route    DELETE api/smoothies/:id
// @desc     Delete a smoothie based on id
router.delete("/:id", async (req, res) => {
  try {
    const smoothie = await Smoothie.findById(req.params.id);
    if (!smoothie) return res.status(404).json({ msg: "Smoothie not found" });
    await Smoothie.findByIdAndRemove(req.params.id);
    res.json({ msg: "Smoothie successfully removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});

module.exports = router;
