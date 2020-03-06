'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ProductSchema = new Schema({

    category: {
        type: String,
    },
    items: {
        type: [
            {
                spuNo: {
                    type: String,
                    required: 'Please fill a Product spuNo',
                },
                spuName: {
                    type: String,
                    required: 'Please fill a Product spuName',
                },
                spuDesc: {
                    type: String,
                    required: 'Please fill a Product spuDesc',
                },
                spuImageUrl: {
                    type: String,
                    required: 'Please fill a Product spuImageUrl',
                },
                skuNo: {
                    type: String,
                    required: 'Please fill a Product skuNo',
                },
                skuName: {
                    type: String,
                    required: 'Please fill a Product skuName',
                },
                brandName: {
                    type: String,
                    required: 'Please fill a Product brandName',
                },
                imageUrl: {
                    type: String,
                    required: 'Please fill a Product imageUrl',
                },
                marketPrice: {
                    type: Number,
                    required: 'Please fill a Product marketPrice',
                },
                skuPrice: {
                    type: Number,
                    required: 'Please fill a Product skuPrice',
                },
                sellUnit: {
                    type: String,
                    required: 'Please fill a Product sellUnit',
                },
                attibuteKey1: {
                    type: String,
                    required: 'Please fill a Product attibuteKey1',
                },
                attibuteValue1: {
                    type: String,
                    required: 'Please fill a Product attibuteValue1',
                },
                attibuteKey2: {
                    type: String,
                    required: 'Please fill a Product attibuteKey2',
                },
                attibuteValue2: {
                    type: String,
                    required: 'Please fill a Product attibuteValue2',
                },
                attibuteKey3: {
                    type: String,
                    required: 'Please fill a Product attibuteKey3',
                },
                attibuteValue3: {
                    type: String,
                    required: 'Please fill a Product attibuteValue3',
                },
                attibuteKey4: {
                    type: String,
                    required: 'Please fill a Product attibuteKey4',
                },
                attibuteValue4: {
                    type: String,
                    required: 'Please fill a Product attibuteValue4',
                },
                attibuteKey5: {
                    type: String,
                    required: 'Please fill a Product attibuteKey5',
                },
                attibuteValue5: {
                    type: String,
                    required: 'Please fill a Product attibuteValue5',
                },
            }
        ]
    },

    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    createby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    },
    updateby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    }
});

mongoose.model("Product", ProductSchema);