const ethers = require('ethers');
const axios = require('axios');
const SettingModel = require('../models/setting.model');
const Item = require('../models/item.model');
const Pair = require('../models/pair.model');
const Auction = require('../models/auction.model');
const Bid = require('../models/bid.model');
const Event = require('../models/event.model');
const ItemCollection = require('../models/collection.model');
const Sold = require('../models/sold.model');

const BaseController = require('./BaseController');

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = BaseController.extend({
    name: 'SyncController',

    sync_block: async function (req, res, next) {
        try {
            await sleep(1000);
            return res.status(200).send({ status: 'success' });
        }
        catch (ex) {
            console.log(ex);
            return res.status(500).send({ status: 'failed', exception: ex });
        }
    },
    sortByTimeStamp: function(nodes) {
        return (nodes || []).sort((a, b) => a.timestamp - b.timestamp);
    }
});
