const {Session} = require("../models/index");

const router = require("express").Router();

router.delete("/", async (req, res) => {
    const session = await Session.findOne({
        where: {
            session: req.get("Authorization").substring(7),
        },
    });

    if (session) {
        session.valid = false;
        await session.save();
        res.status(204).send({
            message: "Session invalidated",
            session
        });
    } else {
        res.status(401).send("Unauthorized");
    }
});

module.exports = router;