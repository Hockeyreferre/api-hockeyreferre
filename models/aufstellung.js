const mongoose = require('mongoose');

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

module.exports = mongoose.model('Aufstellung', aufstellung)