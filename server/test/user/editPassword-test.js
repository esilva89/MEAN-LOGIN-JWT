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
//! - empty database.

describe(helpers.setHeaderTest('TEST METHOD editPassword: edit password to mgonzalez@gmail.com'), () => {
    
    //* successful login from mgonzalez@gmail.com.
    // mgonzalez@gmail.com already registered.
    it('Successful login from mgonzalez@gmail.com => create a token', (done) => {
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

    //* successful edited password from mgonzalez@gmail.com.
    it('Successful edited password from mgonzalez@gmail.com => get new user profile', (done) => {
        let dataSend = {
            Authorization: `Bearer ${userToken}`,
            currentPassword: 'Blabla9090*',
            newPassword: 'Blabla9090**',
            confirmNewPassword: 'Blabla9090**'
        };

        chai.request(url)
            .put(keys.routes.put.editPassword)
            .set('Authorization', `Bearer ${userToken}`)
            .send(dataSend)
            .end(function(err, res) {
                helpers.printInfoTestCase(nroTestCase++, dataSend, res.body);
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });

});

describe(helpers.setHeaderTest('TEST METHOD editPassword: errors from express-validation'), () => {

    //* successful login from mgonzalez@gmail.com.
    // mgonzalez@gmail.com already started session.

    //!==================== ERRORS DETECTED BY EXPRESS-VALIDATOR ====================!//
    //! error in the current password min 8 characters.
    it('Failed edit password mgonzalez@gmail.com => current password min 8 characters', (done) => {
        let dataSend = {
            Authorization: `Bearer ${userToken}`,
            currentPassword: 'B',
            newPassword: 'Blabla9090**',
            confirmNewPassword: 'Blabla9090**'
        };

        chai.request(url)
            .put(keys.routes.put.editPassword)
            .set('Authorization', `Bearer ${userToken}`)
            .send(dataSend)
            .end(function(err, res) {
                helpers.printInfoTestCase(nroTestCase++, dataSend, res.body);
                expect(err).to.be.null;
                expect(res).to.have.status(422);
                done();
            });
    });

    //! error in the current password invalid format.
    it('Failed edit password mgonzalez@gmail.com => current password invalid format', (done) => {
        let dataSend = {
            Authorization: `Bearer ${userToken}`,
            currentPassword: 'Blabla9090',
            newPassword: 'Blabla9090**',
            confirmNewPassword: 'Blabla9090**'
        };

        chai.request(url)
            .put(keys.routes.put.editPassword)
            .set('Authorization', `Bearer ${userToken}`)
            .send(dataSend)
            .end(function(err, res) {
                helpers.printInfoTestCase(nroTestCase++, dataSend, res.body);
                expect(err).to.be.null;
                expect(res).to.have.status(422);
                done();
            });
    });

    //! error in the new password min 8 characters.
    it('Failed edit password mgonzalez@gmail.com => new password min 8 characters', (done) => {
        let dataSend = {
            Authorization: `Bearer ${userToken}`,
            currentPassword: 'Blabla9090*',
            newPassword: 'B',
            confirmNewPassword: 'B'
        };

        chai.request(url)
            .put(keys.routes.put.editPassword)
            .set('Authorization', `Bearer ${userToken}`)
            .send(dataSend)
            .end(function(err, res) {
                helpers.printInfoTestCase(nroTestCase++, dataSend, res.body);
                expect(err).to.be.null;
                expect(res).to.have.status(422);
                done();
            });
    });

    //! error in the new password invalid format.
    it('Failed edit password mgonzalez@gmail.com => new password invalid format', (done) => {
        let dataSend = {
            Authorization: `Bearer ${userToken}`,
            currentPassword: 'Blabla9090*',
            newPassword: 'Blabla9090',
            confirmNewPassword: 'Blabla9090'
        };

        chai.request(url)
            .put(keys.routes.put.editPassword)
            .set('Authorization', `Bearer ${userToken}`)
            .send(dataSend)
            .end(function(err, res) {
                helpers.printInfoTestCase(nroTestCase++, dataSend, res.body);
                expect(err).to.be.null;
                expect(res).to.have.status(422);
                done();
            });
    });

    //! error in the passwords do not match.
    it('Failed edit password mgonzalez@gmail.com => passwords do not match', (done) => {
        let dataSend = {
            Authorization: `Bearer ${userToken}`,
            currentPassword: 'Blabla9090*',
            newPassword: 'Blabla9090!',
            confirmNewPassword: 'Blabla9090**'
        };

        chai.request(url)
            .put(keys.routes.put.editPassword)
            .set('Authorization', `Bearer ${userToken}`)
            .send(dataSend)
            .end(function(err, res) {
                helpers.printInfoTestCase(nroTestCase++, dataSend, res.body);
                expect(err).to.be.null;
                expect(res).to.have.status(422);
                done();
            });
    });

});

describe(helpers.setHeaderTest('TEST METHOD editPassword: edit password using wrong current password'), () => {

    //! error in the current password.
    it('Failed edit password jperez@gmail.com => invalid current password', (done) => {
        let dataSend = {
            Authorization: `Bearer ${userToken}`,
            currentPassword: 'Blabla9090!',
            newPassword: 'Blabla9090**',
            confirmNewPassword: 'Blabla9090**'
        };

        chai.request(url)
            .put(keys.routes.put.editPassword)
            .set('Authorization', `Bearer ${userToken}`)
            .send(dataSend)
            .end(function(err, res) {
                helpers.printInfoTestCase(nroTestCase++, dataSend, res.body);
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                done();
            });
    });

});

describe(helpers.setHeaderTest('TEST METHOD editPassword: remove user and edit password'), () => {

    //* successful login from mgonzalez@gmail.com.
    it('Successful login from mgonzalez@gmail.com => Create a token', (done) => {
        let dataSend = {
            email: 'mgonzalez@gmail.com',
            password: 'Blabla9090**'
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

    //* successful user removed mgonzalez@gmail.com.
    it('Successful user removed mgonzalez@gmail.com => Get user id removed', (done) => {
        chai.request(url)
            .delete(keys.routes.delete.removeUser)
            .set('Authorization', `Bearer ${userToken}`)
            .end(function(err, res) {
                helpers.printInfoTestCase(nroTestCase++, { Authorization: `Bearer ${userToken}` }, res.body);
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });

    //! error in the user was already removed.
    it('Failed edit password mgonzalez@gmail.com => user was already removed', (done) => {
        let dataSend = {
            Authorization: `Bearer ${userToken}`,
            currentPassword: 'Blabla9090**',
            newPassword: 'Blabla9090!',
            confirmNewPassword: 'Blabla9090!'
        };

        chai.request(url)
            .put(keys.routes.put.editPassword)
            .set('Authorization', `Bearer ${userToken}`)
            .send(dataSend)
            .end(function(err, res) {
                helpers.printInfoTestCase(nroTestCase++, dataSend, res.body);
                expect(err).to.be.null;
                expect(res).to.have.status(404);
                done();
            });
    });

});