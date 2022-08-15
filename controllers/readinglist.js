const router = require("express").Router();

const {ReadingList} = require("../models/index");

router.post("/", async (req, res) => {
    console.log(ReadingList);
    const newReadingList = await ReadingList.create({...req.body, read: false});
    res.json(newReadingList);
});

module.exports = router;
