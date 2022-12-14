const express = require('express');
const Model = require('../models/model');
const Aufstellung = require('../models/aufstellung');
const Team = require('../models/team');
const Tabelle = require('../models/tabelle');
const team = require('../models/team');
const router = express.Router();
let games = []
const sort = { live: -1, date: -1, time: 1 }
const table = { place: 1 }

router.get('', async (req, res) => {
    res.render('startseite', { data: await Model.find().sort(sort), team: await Tabelle.find() });
})

router.get('/create', async (req, res) => {
    res.render('create', { data: await Model.find() });
})

router.get('/createPlayer/:name', async (req, res) => {
    res.render('createPlayer', { name: req.params.name });
})

router.get('/editTable', async (req, res) => {
    res.render('table', { data: await Tabelle.find().sort(table) });
})

router.get('/mannschaft/:name', async (req, res) => {
    res.render('mannschaft', { data: await Team.find({ teamName: req.params.name }), name: req.params.name })
})

router.get('/login', async (req, res) => {
    res.render('login', { data: await Tabelle.find().sort(table) });
})

router.get('/view/:id/:home/:away/:date', async (req, res) => {
    res.render('detail', { data: await Model.findById(req.params.id), aufstellungHome: await Team.find({teamName: req.params.home}), aufstellungAway: await Team.find({teamName: req.params.away}), nameHome: req.params.home, nameAway: req.params.away, id: req.params.id, date: req.params.date });
})

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
        abgesagt: req.body.abgesagt,
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
        await Tabelle.findOneAndUpdate({name: req.body.home}, games + 1)
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.post('/aufstellung/:name/:date', async (req, res) => {
    const aufstellung = new Aufstellung({
        teamName: req.params.name + " " + req.params.date,
        RF1: await Team.find({ fullname: req.body.RF1 }),
        C1: await Team.find({ fullname: req.body.C1 }),
        LF1: await Team.find({ fullname: req.body.LF1 }),
        RH1: await Team.find({ fullname: req.body.RH1 }),
        LH1: await Team.find({ fullname: req.body.LH1 }),
        RF2: await Team.find({ fullname: req.body.RF2 }),
        C2: await Team.find({ fullname: req.body.C2 }),
        LF2: await Team.find({ fullname: req.body.LF2 }),
        RH2: await Team.find({ fullname: req.body.RH2 }),
        LH2: await Team.find({ fullname: req.body.LH2 }),
        RF3: await Team.find({ fullname: req.body.RF3 }),
        C3: await Team.find({ fullname: req.body.C3 }),
        LF3: await Team.find({ fullname: req.body.LF3 }),
        RH3: await Team.find({ fullname: req.body.RH3 }),
        LH3: await Team.find({ fullname: req.body.LH3 }),
        RF4: await Team.find({ fullname: req.body.RF4 }),
        C4: await Team.find({ fullname: req.body.C4 }),
        LF4: await Team.find({ fullname: req.body.LF4 }),
        RH4: await Team.find({ fullname: req.body.RH4 }),
        LH4: await Team.find({ fullname: req.body.LH4 }),
        TW1: await Team.find({ fullname: req.body.TW1 }),
        TW2: await Team.find({ fullname: req.body.TW2 }),
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

router.post('/addPlayer/:name', async (req, res) => {
    const player = new Team({
        jersey: req.body.jersey,
        fullname: req.body.fullname,
        image: req.body.image,
        teamName: req.params.name
    });

    try {
        const dataToSave = await player.save();
        res.status(200).json(dataToSave)
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

router.get('/oberligaS??d', async (req, res) => {
    try {
        const data = await Model.find({ liga: "oberligaS??d" });
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Update by ID Method
router.post('/update/:id', async (req, res) => {
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

router.post('/updatePlayer/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Team.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/updateTeam/:name', async (req, res) => {
    try {
        const updatedData = req.body;
        const options = { new: true };

        const result = await Tabelle.findOneAndUpdate({name: req.params.name}, updatedData, options)

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
