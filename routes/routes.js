const express = require('express');
const Model = require('../models/model');
const Aufstellung = require('../models/model');
const Team = require('../models/model');
const router = express.Router();
let path = require("path");
let games = []
const rostock = require('../json/rostock3.json')

router.get('/view', async (req, res) => {
    res.render('view', { data: await Model.find({live: true}) });
})

router.get('/view/:id', async (req, res) => {
    res.render('detail', { aufstellungHome: rostock });
})

//Post Method
router.post('/add', async (req, res) => {
    const inputId = games.length + 1;
    const inputdate = req.body.date;
    const inputtime = req.body.time;
    const inputhome = req.body.home;
    const inputlogohome = req.body.logoHome;
    const inputscorehome = req.body.scoreHome;
    const inputscoreaway = req.body.scoreAway;
    const inputlogoaway = req.body.logoAway;
    const inputaway = req.body.away;
    const inputstream = req.body.stream;
    const data = new Model({
        home: req.body.home,
        logoHome: req.body.logoHome,
        logoAway: req.body.logoAway,
        away: req.body.away,
        date: req.body.date,
        time: req.body.time,
        stadion: req.body.stadion,
        live: req.body.live,
        liga: req.body.liga,
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
        games.push({
            id: inputId,
            date: inputdate,
            time: inputtime,
            home: inputhome,
            logoHome: inputlogohome,
            scoreHome: inputscorehome,
            scoreAway: inputscoreaway,
            logoAway: inputlogoaway,
            away: inputaway,
            stream: inputstream
        });
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.post('/aufstellungHeim/:home', async (req, res) => {
    const aufstellung = new Aufstellung({
        teamName: req.params.home,
        RF1: req.body.RF1,
        C1: req.body.C1,
        LF1: req.body.LF1,
        RH1: req.body.RH1,
        LH1: req.body.LH1,
        RF2: req.body.RF2,
        C2: req.body.C2,
        LF2: req.body.LF2,
        RH2: req.body.RH2,
        LH2: req.body.LH2,
        RF3: req.body.RF3,
        C3: req.body.C3,
        LF3: req.body.LF3,
        RH3: req.body.RH3,
        LH3: req.body.LH3,
        RF4: req.body.RF4,
        C4: req.body.C4,
        LF4: req.body.LF4,
        RH4: req.body.RH4,
        LH4: req.body.LH4,
        TW1: req.body.TW1,
        TW2: req.body.TW2,
    })
    try {
        const dataToSave = await aufstellung.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
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
router.get('/getOne', async (req, res) => {
    try {
        const data = await Model.findById(req.body.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/oberligaNord', async (req, res) => {
    try {
        const data = await Model.find({ liga: "oberligaNord" });
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/oberligaSued', async (req, res) => {
    try {
        const data = await Model.find({ liga: "oberligaSüd" });
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/mannschaft/:name', async (req, res) => {
    try {
        const data = await Aufstellung.find({ teamName: req.params.name });
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
router.post('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.id} has been deleted..`)
        var requestID = req.body.id;
        var j = 0;
        games.forEach((game) => {
            j = j + 1;
            if (game.id === requestID) {
                games.splice(j - 1, 1);
            }
        });
        res.render("view", {
            data: games,
        })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;
