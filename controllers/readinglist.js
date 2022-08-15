const router = require("express").Router();

const tokenExtractor = require("../middlewares/tokenExtractor");
const {ReadingList} = require("../models/index");

router.post("/", async (req, res) => {
    const newReadingList = await ReadingList.create({...req.body, read: false});
    res.json(newReadingList);
});

router.put("/:id", tokenExtractor ,async (req, res) => {
    if (!req.decodedToken) {
		throw new Error("Unauthorized");
	}
    const readingList = await ReadingList.findOne({
        where: {
            id: req.params.id,
            userId: req.decodedToken.id,
        },
    });

    if (!readingList) {
        res.status(404).send("ReadingList not found");
    } else {
        readingList.read = req.body.read;
        await readingList.save();
        res.json({ read: readingList.read });
    }
});



module.exports = router;
