const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var ethSignUtil = require('eth-sig-util');
var ethereumjsUtil = require('ethereumjs-util');

const BaseController = require('./BaseController');
const User = require("../models/user.model");


module.exports = BaseController.extend({
    name: 'UserController',

    get: async function(req, res, next) {
        User.findOne({address: req.params.address}, {_id: 0, __v: 0},async (err, user) => {
            if (err) return res.status(500).send({message: err.message});

            if (!user){
              const newUser = new User({
                address: req.params.address,
                name: "NoName",
                role: "NoRole",
                profilePic: "https://ipfs.io/ipfs/QmaxQGhY772ffG7dZpGsVoUWcdSpEV1APru95icXKmii67",
                coverImg: "https://ipfs.io/ipfs/QmcCpXu1pNf8HAtMAmoSzppmznRAGAL3u5oT1MXcAVEDnH",
                isApproved: false,
                nonce: Math.floor(Math.random() * 1000000)
              })
              await newUser.save();
              return res.status(200).send({user: newUser})
            }
            res.status(200).send({user: user})
          })
    },

    update: async function(req, res, next) {
        if (!req.body.address) return res.status(400).send("No address")
        const name = req.body.name || "NoName"
        const role = req.body.role || "NoName"
        const bio = req.body.bio || ""
        const profilePic = req.body.profilePic || ""
        const coverImg = req.body.coverImg || ""

        User.findOne({address: req.body.address}, async (err, user) => {
            if (err) return res.status(500).send({message: err.message});
            if (!user) return res.status(400).send({message: "User not found"});

            User.find({name: name}, async (err, docs) => {
            if (err) return res.status(500).send({message: err.message});
            if (docs.length != 0 && name && name != user.name) return res.status(400).send({message: "Username taken"})

            if (name && name != undefined || name === "") user.name = name
            if (role && role != undefined || role === "") user.role = role
            if (bio && bio != undefined || bio === "") user.bio = bio
            if (profilePic && profilePic != undefined || profilePic === "") user.profilePic = profilePic
            if (coverImg && coverImg != undefined || coverImg === "") user.coverImg = coverImg

            await user.save();
            return res.sendStatus(200);

            })
        })
    },
});
