const express = require('express');
const Model = require('../models/model');
const router = express.Router();
let path = require("path");

router.get('/create', async (req, res) => {
    res.sendFile(path.join(__dirname,'../view/create.html'));
})

router.get('/view', async (req, res) => {
    res.sendFile(path.join(__dirname,'../view/view.html'));
})

//Post Method
router.post('/add', async (req, res) => {
    const data = new Model({
        home: req.body.home,
        logoHome: req.body.logoHome,
        logoAway: req.body.logoAway,
        away: req.body.away,
        date: req.body.date,
        time: req.body.time,
        stadion: req.body.stadion,
        live: req.body.live,
        beendet: req.body.beendet,
        stream: req.body.stream,
        scoreHome: req.body.scoreHome,
        scoreAway: req.body.scoreAway,
        scoreHome1: req.body.scoreHome1,
        scoreAway1: req.body.scoreAway1,
        scoreHome2: req.body.scoreHome2,
        scoreAway2: req.body.scoreAway2,
        scoreHome3: req.body.scoreHome3,
        scoreAway3: req.body.scoreAway3,
        overtime: req.body.overtime,
        scoreHomeOT: req.body.scoreHomeOT,
        scoreAwayOT: req.body.scoreAwayOT
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Get all Method
router.get('/getAll', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.id} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;