const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    home: {
        required: true,
        type: String
    },
    away: {
        required: true,
        type: String
    },
    logoHome: {
        required: true,
        type: String
    },
    logoAway: {
        required: true,
        type: String
    },
    date: {
        required: true,
        type: String
    },
    stadion: {
        required: true,
        type: String
    },
    time: {
        required: true,
        type: String
    },
    live: {
        required: false,
        type: Boolean
    },
    beendet: {
        required: false,
        type: Boolean
    },
    stream: {
        required: true,
        type: String
    },
    liga: {
        required: true,
        type: String
    },
    scoreHome: {
        required: true,
        type: Number
    },
    scoreAway: {
        required: true,
        type: Number
    },
    scoreHome1: {
        required: true,
        type: Number
    },
    scoreAway1: {
        required: true,
        type: Number
    },
    scoreHome2: {
        required: true,
        type: Number
    },
    scoreAway2: {
        required: true,
        type: Number
    },
    scoreHome3: {
        required: true,
        type: Number
    },
    scoreAway3: {
        required: true,
        type: Number
    },
    overtime: {
        required: false,
        type: Boolean
    },
    scoreHomeOT: {
        required: false,
        type: Number
    },
    scoreAwayOT: {
        required: false,
        type: Number
    }
})

const aufstellung = new mongoose.Schema({
    teamName: {
        required: true,
        type: String
    },
    RF1: {
        required: true,
        type: String
    },
    C1: {
        required: true,
        type: String
    },
    LF1: {
        required: true,
        type: String
    },
    RH1: {
        required: true,
        type: String
    },
    LH1: {
        required: true,
        type: String
    },
    RF2: {
        required: true,
        type: String
    },
    C2: {
        required: true,
        type: String
    },
    LF2: {
        required: true,
        type: String
    },
    RH2: {
        required: true,
        type: String
    },
    LH2: {
        required: true,
        type: String
    },
    RF3: {
        required: false,
        type: String
    },
    C3: {
        required: false,
        type: String
    },
    LF3: {
        required: false,
        type: String
    },
    RH3: {
        required: false,
        type: String
    },
    LH3: {
        required: false,
        type: String
    },
    RF4: {
        required: false,
        type: String
    },
    C4: {
        required: false,
        type: String
    },
    LF4: {
        required: false,
        type: String
    },
    RH4: {
        required: false,
        type: String
    },
    LH4: {
        required: false,
        type: String
    },
    TW1: {
        required: true,
        type: String
    },
    TW2: {
        required: false,
        type: String
    }
})

const team = new mongoose.Schema({
    teamName: {
        required: true,
        type: String
    },
    fullname: {
        type: String
    },
    fullname: {
        type: String
    },
    fullname: {
        type: String
    },
    fullname: {
        type: String
    },
    fullname: {
        type: String
    },
    fullname: {
        type: String
    },
    fullname: {
        type: String
    },
    fullname: {
        type: String
    },
    fullname: {
        type: String
    },
    fullname: {
        type: String
    },
    fullname: {
        type: String
    },
    fullname: {
        type: String
    },
    fullname: {
        type: String
    },
    fullname: {
        type: String
    },
    fullname: {
        type: String
    },
    fullname: {
        type: String
    },
    fullname: {
        type: String
    },
    fullname: {
        type: String
    },
    fullname: {
        type: String
    },
    fullname: {
        type: String
    },
    fullname: {
        type: String
    },
    fullname: {
        type: String
    },
    fullname: {
        type: String
    },
    fullname: {
        type: String
    },
    fullname: {
        type: String
    },
    fullname: {
        type: String
    },
    fullname: {
        type: String
    },
    fullname: {
        type: String
    },
    fullname: {
        type: String
    },
    fullname: {
        type: String
    }
})

module.exports = mongoose.model('Data', dataSchema)
module.exports = mongoose.model('Aufstellung', aufstellung)
module.exports = mongoose.model('Team', team)