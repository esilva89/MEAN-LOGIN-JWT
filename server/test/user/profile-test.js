// External Libs.
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;

// My Modules.
const keys = require('../../config/keys');
const { helpers } = require('../../utils');

const url = `http://localhost:${keys.server.port}`;
var nroTestCase = 1;
var userToken;

chai.use(chaiHttp);

// After the execution of the tests, the database will contain:
//* - new user mgonzalez@gmail.com.

describe(helpers.setHeaderTest('TEST METHOD profile: get profile a user'), () => {

    //* successful register from mgonzalez@gmail.com.
    it('Successful register from mgonzalez@gmail.com => insert new user', (done) => {
        let dataSend = {
            username: 'mgonzalez',
            email: 'mgonzalez@gmail.com',
            password: 'Blabla9090*',
            confirmPassword: 'Blabla9090*'
        };

        chai.request(url)
            .post(keys.routes.post.signUp)
            .send(dataSend)
            .end(function(err, res) {
                helpers.printInfoTestCase(nroTestCase++, dataSend, res.body);
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                done();
            });
    });

    //* successful login mgonzalez@gmail.com.
    it('Successful login mgonzalez@gmail.com => create a token', (done) => {
        let dataSend = {
            email: 'mgonzalez@gmail.com',
            password: 'Blabla9090*'
        };

        chai.request(url)
            .post(keys.routes.post.signIn)
            .send(dataSend)
            .end(function(err, res) {
                helpers.printInfoTestCase(nroTestCase++, dataSend, res.body);
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                userToken = res.body.data.token;
                done();
            });
    });

    //* successful profile mgonzalez@gmail.com.
    it('Successful profile mgonzalez@gmail.com => get user profile', (done) => {
        chai.request(url)
            .post(keys.routes.post.profile)
            .set('Authorization', `Bearer ${userToken}`)
            .end(function(err, res) {
                helpers.printInfoTestCase(nroTestCase++, { Authorization: `Bearer ${userToken}` }, res.body);
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });

});

describe(helpers.setHeaderTest('TEST METHOD profile: errors in header and token'), () => {

    //!========================= CUSTOM ERRORS =========================!//
    //! error in the header from the request.
    it('Failed profile mgonzalez@gmail.com => header from the request', (done) => {
        chai.request(url)
            .post(keys.routes.post.profile)
            .end(function(err, res) {
                helpers.printInfoTestCase(nroTestCase++, { Authorization: 'nothing' }, res.body);
                expect(err).to.be.null;
                expect(res).to.have.status(403);
                done();
            });
    });

    //! error in the token have been expired.
    it('Failed profile mgonzalez@gmail.com => token have been expired', (done) => {
        userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1Yzg2ZWYzM2NmNzNiNDA2ZjRmM2FkYTciLCJpYXQiOjE1NTIzNDc3MDMsImV4cCI6MTU1MjM1NDkwM30.fmitgZ03AIMVWdHF06Wd7izX_aIDYiN8qcP99FEiM-k';

        chai.request(url)
            .post(keys.routes.post.profile)
            .set('Authorization', `Bearer ${userToken}`)
            .end(function(err, res) {
                helpers.printInfoTestCase(nroTestCase++, { Authorization: `Bearer ${userToken}` }, res.body);
                expect(err).to.be.null;
                expect(res).to.have.status(401);
                done();
            });
    });

    //! error in the token invalid value.
    it('Failed profile mgonzalez@gmail.com => token invalid value', (done) => {
        userToken = 'eyJ0eXAiOiJKV1Q.iLCJhbGc';

        chai.request(url)
            .post(keys.routes.post.profile)
            .set('Authorization', `Bearer ${userToken}`)
            .end(function(err, res) {
                helpers.printInfoTestCase(nroTestCase++, { Authorization: `Bearer ${userToken}` }, res.body);
                expect(err).to.be.null;
                expect(res).to.have.status(500);
                done();
            });
    });

});