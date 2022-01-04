const express = require("express");
const mongoose = require("mongoose");
const Review = require("../models/reviews");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index")
});

router.get("/reviews", async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (e) {
        res.status(409).json({ messege: e.messege });
    }
});

router.post("/reviews", async (req, res) => {
    const { firstname, lastname, rating, review } = req.body;
    const new_review = new Review({ firstname, lastname, rating, review });
    try {
        await new_review.save();
        res.status(201).json({ messege: "new review is added" });
    } catch (e) {
        res.status(409).json({ messege: e.messege });
    }
});

module.exports = router;
