'use strict';
var request = require('supertest'),
    assert = require('assert'),
    config = require('../../../config/config'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    app = require('../../../config/express'),
    Product = mongoose.model('Product');

var credentials,
    token,
    mockup;

describe('Product CRUD routes tests', function () {

    before(function (done) {
        mockup = {
            "category": "สมาร์ทโฟน",
            "items": [
                {
                    "spuNo": "iphone-11",
                    "spuName": "iPhone 11",
                    "spuDesc": "จอภาพขนาด-6.1-นิ้ว",
                    "spuImageUrl": "https://store.storeimages.cdn-apple.com/8756/as-",
                    "skuNo": "iphone-11-01",
                    "skuName": "iPhone 11 จอภาพขนาด-6.1-นิ้ว 64GB**ขาว",
                    "brandName": "apple",
                    "imageUrl": "https://store.storeimages.cdn-apple.com/8756/as-",
                    "marketPrice": 24900,
                    "skuPrice": 24900,
                    "sellUnit": "เครื่อง",
                    "attibuteKey1": "สี",
                    "attibuteValue1": "ขาว",
                    "attibuteKey2": "ความจุ",
                    "attibuteValue2": "64GB**",
                    "attibuteKey3": "ความจุ",
                    "attibuteValue3": "ความจุ",
                    "attibuteKey4": "ความจุ",
                    "attibuteValue4": "ความจุ",
                    "attibuteKey5": "ความจุ",
                    "attibuteValue5": "ความจุ"
                }
            ]
        };

        credentials = {
            username: 'username',
            password: 'password',
            firstname: 'first name',
            lastname: 'last name',
            email: 'test@email.com',
            roles: ['user']
        };
        token = jwt.sign(_.omit(credentials, 'password'), config.jwt.secret, {
            expiresIn: 2 * 60 * 60 * 1000
        });
        done();
    });

    it('should be Product get use token', (done) => {
        request(app)
            .get('/api/products')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                done();
            });
    });

    it('should be Product get by id', function (done) {

        request(app)
            .post('/api/products')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/products/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);

                        assert.equal(resp.data.category, mockup.category);
                        assert.equal(resp.data.items[0].spuNo, mockup.items[0].spuNo);
                        assert.equal(resp.data.items[0].spuName, mockup.items[0].spuName);
                        assert.equal(resp.data.items[0].spuDesc, mockup.items[0].spuDesc);
                        assert.equal(resp.data.items[0].spuImageUrl, mockup.items[0].spuImageUrl);
                        assert.equal(resp.data.items[0].skuNo, mockup.items[0].skuNo);
                        assert.equal(resp.data.items[0].skuName, mockup.items[0].skuName);
                        assert.equal(resp.data.items[0].brandName, mockup.items[0].brandName);
                        assert.equal(resp.data.items[0].imageUrl, mockup.items[0].imageUrl);
                        assert.equal(resp.data.items[0].marketPrice, mockup.items[0].marketPrice);
                        assert.equal(resp.data.items[0].skuPrice, mockup.items[0].skuPrice);
                        assert.equal(resp.data.items[0].sellUnit, mockup.items[0].sellUnit);
                        assert.equal(resp.data.items[0].attibuteKey1, mockup.items[0].attibuteKey1);
                        assert.equal(resp.data.items[0].attibuteValue1, mockup.items[0].attibuteValue1);
                        assert.equal(resp.data.items[0].attibuteKey2, mockup.items[0].attibuteKey2);
                        assert.equal(resp.data.items[0].attibuteValue2, mockup.items[0].attibuteValue2);
                        assert.equal(resp.data.items[0].attibuteKey3, mockup.items[0].attibuteKey3);
                        assert.equal(resp.data.items[0].attibuteValue3, mockup.items[0].attibuteValue3);
                        assert.equal(resp.data.items[0].attibuteKey4, mockup.items[0].attibuteKey4);
                        assert.equal(resp.data.items[0].attibuteValue4, mockup.items[0].attibuteValue4);
                        assert.equal(resp.data.items[0].attibuteKey5, mockup.items[0].attibuteKey5);
                        assert.equal(resp.data.items[0].attibuteValue5, mockup.items[0].attibuteValue5);
                        done();
                    });
            });

    });

    it('should be Product post use token', (done) => {
        request(app)
            .post('/api/products')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;

                assert.equal(resp.data.category, mockup.category);
                assert.equal(resp.data.items[0].spuNo, mockup.items[0].spuNo);
                assert.equal(resp.data.items[0].spuName, mockup.items[0].spuName);
                assert.equal(resp.data.items[0].spuDesc, mockup.items[0].spuDesc);
                assert.equal(resp.data.items[0].spuImageUrl, mockup.items[0].spuImageUrl);
                assert.equal(resp.data.items[0].skuNo, mockup.items[0].skuNo);
                assert.equal(resp.data.items[0].skuName, mockup.items[0].skuName);
                assert.equal(resp.data.items[0].brandName, mockup.items[0].brandName);
                assert.equal(resp.data.items[0].imageUrl, mockup.items[0].imageUrl);
                assert.equal(resp.data.items[0].marketPrice, mockup.items[0].marketPrice);
                assert.equal(resp.data.items[0].skuPrice, mockup.items[0].skuPrice);
                assert.equal(resp.data.items[0].sellUnit, mockup.items[0].sellUnit);
                assert.equal(resp.data.items[0].attibuteKey1, mockup.items[0].attibuteKey1);
                assert.equal(resp.data.items[0].attibuteValue1, mockup.items[0].attibuteValue1);
                assert.equal(resp.data.items[0].attibuteKey2, mockup.items[0].attibuteKey2);
                assert.equal(resp.data.items[0].attibuteValue2, mockup.items[0].attibuteValue2);
                assert.equal(resp.data.items[0].attibuteKey3, mockup.items[0].attibuteKey3);
                assert.equal(resp.data.items[0].attibuteValue3, mockup.items[0].attibuteValue3);
                assert.equal(resp.data.items[0].attibuteKey4, mockup.items[0].attibuteKey4);
                assert.equal(resp.data.items[0].attibuteValue4, mockup.items[0].attibuteValue4);
                assert.equal(resp.data.items[0].attibuteKey5, mockup.items[0].attibuteKey5);
                assert.equal(resp.data.items[0].attibuteValue5, mockup.items[0].attibuteValue5);
                done();
            });
    });

    it('should be product put use token', function (done) {

        request(app)
            .post('/api/products')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {

                    "category": "สมาร์ทโฟน",
                    "items": [
                        {
                            "spuNo": "iphone-11",
                            "spuName": "iPhone 11",
                            "spuDesc": "จอภาพขนาด-6.1-นิ้ว",
                            "spuImageUrl": "https://store.storeimages.cdn-apple.com/8756/as-",
                            "skuNo": "iphone-11-01",
                            "skuName": "iPhone 11 จอภาพขนาด-6.1-นิ้ว 64GB**ขาว",
                            "brandName": "apple",
                            "imageUrl": "https://store.storeimages.cdn-apple.com/8756/as-",
                            "marketPrice": 24900,
                            "skuPrice": 24900,
                            "sellUnit": "เครื่อง",
                            "attibuteKey1": "สี",
                            "attibuteValue1": "ขาว",
                            "attibuteKey2": "ความจุ",
                            "attibuteValue2": "64GB**",
                            "attibuteKey3": "ความจุ",
                            "attibuteValue3": "ความจุ",
                            "attibuteKey4": "ความจุ",
                            "attibuteValue4": "ความจุ",
                            "attibuteKey5": "ความจุ",
                            "attibuteValue5": "ความจุ"
                        }
                    ]
                }
                request(app)
                    .put('/api/products/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .send(update)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;

                        assert.equal(resp.data.category, update.category);
                        assert.equal(resp.data.items[0].spuNo, update.items[0].spuNo);
                        assert.equal(resp.data.items[0].spuName, update.items[0].spuName);
                        assert.equal(resp.data.items[0].spuDesc, update.items[0].spuDesc);
                        assert.equal(resp.data.items[0].spuImageUrl, update.items[0].spuImageUrl);
                        assert.equal(resp.data.items[0].skuNo, update.items[0].skuNo);
                        assert.equal(resp.data.items[0].skuName, update.items[0].skuName);
                        assert.equal(resp.data.items[0].brandName, update.items[0].brandName);
                        assert.equal(resp.data.items[0].imageUrl, update.items[0].imageUrl);
                        assert.equal(resp.data.items[0].marketPrice, update.items[0].marketPrice);
                        assert.equal(resp.data.items[0].skuPrice, update.items[0].skuPrice);
                        assert.equal(resp.data.items[0].sellUnit, update.items[0].sellUnit);
                        assert.equal(resp.data.items[0].attibuteKey1, update.items[0].attibuteKey1);
                        assert.equal(resp.data.items[0].attibuteValue1, update.items[0].attibuteValue1);
                        assert.equal(resp.data.items[0].attibuteKey2, update.items[0].attibuteKey2);
                        assert.equal(resp.data.items[0].attibuteValue2, update.items[0].attibuteValue2);
                        assert.equal(resp.data.items[0].attibuteKey3, update.items[0].attibuteKey3);
                        assert.equal(resp.data.items[0].attibuteValue3, update.items[0].attibuteValue3);
                        assert.equal(resp.data.items[0].attibuteKey4, update.items[0].attibuteKey4);
                        assert.equal(resp.data.items[0].attibuteValue4, update.items[0].attibuteValue4);
                        assert.equal(resp.data.items[0].attibuteKey5, update.items[0].attibuteKey5);
                        assert.equal(resp.data.items[0].attibuteValue5, update.items[0].attibuteValue5);
                        done();
                    });
            });

    });

    it('should be product delete use token', function (done) {

        request(app)
            .post('/api/products')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/products/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(done);
            });

    });

    it('should be product get not use token', (done) => {
        request(app)
            .get('/api/products')
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);
    });

    it('should be product post not use token', function (done) {

        request(app)
            .post('/api/products')
            .send(mockup)
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);

    });

    it('should be product put not use token', function (done) {

        request(app)
            .post('/api/products')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    name: 'name update'
                }
                request(app)
                    .put('/api/products/' + resp.data._id)
                    .send(update)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    it('should be product delete not use token', function (done) {

        request(app)
            .post('/api/products')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/products/' + resp.data._id)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    afterEach(function (done) {
        Product.deleteMany().exec(done);
    });

});