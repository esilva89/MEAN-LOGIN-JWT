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
//! - deleted user jperez@gmail.com.

describe(helpers.setHeaderTest('TEST METHOD editProfile: add twice firstName and lastName to jperez@gmail.com with same values'), () => {
    
    //* successful login from jperez@gmail.com.
    // jperez@gmail.com already registered.
    it('Successful login from jperez@gmail.com => create a token', (done) => {
        let dataSend = {
            email: 'jperez@gmail.com',
            password: 'Blabla9090*'
        };

        chai.request(url)
            .post(keys.routes.post.signIn)
            .send(dataSend)
            .end(function(err, res){
                helpers.printInfoTestCase(nroTestCase++, dataSend, res.body);
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                userToken = res.body.data.token;
                done();
            });
    });

    //* successful edited firstName and lastName from jperez@gmail.com.
    it('Successful edited firstName and lastName from jperez@gmail.com => get new user profile', (done) => {
        let dataSend = {
            Authorization: `Bearer ${userToken}`,
            username: 'jperez',
            email: 'jperez@gmail.com',
            firstName: 'juan',
            lastName: 'perez'
        };

        chai.request(url)
            .put(keys.routes.put.editProfile)
            .set('Authorization', `Bearer ${userToken}`)
            .send(dataSend)
            .end(function(err, res) {
                helpers.printInfoTestCase(nroTestCase++, dataSend, res.body);
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });

    //* successful edited firstName and lastName from jperez@gmail.com again.
    it('Successful edited firstName and lastName from jperez@gmail.com again => get new user profile', (done) => {
        let dataSend = {
            Authorization: `Bearer ${userToken}`,
            username: 'jperez',
            email: 'jperez@gmail.com',
            firstName: 'juan',
            lastName: 'perez'
        };

        chai.request(url)
            .put(keys.routes.put.editProfile)
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

describe(helpers.setHeaderTest('TEST METHOD editProfile: errors from express-validation'), () => {

    //* successful login from jperez@gmail.com.
    // jperez@gmail.com already started session.

    //!==================== ERRORS DETECTED BY EXPRESS-VALIDATOR ====================!//
    //! error in the username min 5 characters.
    it('Failed edit profile jperez@gmail.com => username min 5 characters', (done) => {
        let dataSend = {
            Authorization: `Bearer ${userToken}`,
            username: 't1',
            email: 'jperez@gmail.com',
            firstName: 'juan',
            lastName: 'perez'
        };

        chai.request(url)
            .put(keys.routes.put.editProfile)
            .set('Authorization', `Bearer ${userToken}`)
            .send(dataSend)
            .end(function(err, res) {
                helpers.printInfoTestCase(nroTestCase++, dataSend, res.body);
                expect(err).to.be.null;
                expect(res).to.have.status(422);
                done();
            });
    });

    //! error in the email invalid format.
    it('Failed edit profile jperez@gmail.com => email invalid format', (done) => {
        let dataSend = {
            Authorization: `Bearer ${userToken}`,
            username: 'jperez',
            email: 'jperezgmail.com',
            firstName: 'juan',
            lastName: 'perez'
        };

        chai.request(url)
            .put(keys.routes.put.editProfile)
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

describe(helpers.setHeaderTest('TEST METHOD editProfile: edit using attributes already in use'), () => {

    //* successful register from mgonzalez@gmail.com.
    it('Successful register from mgonzalez@gmail.com => new user in database', (done) => {
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

    //* succesful login jperez@gmail.com.
    // jperez@gmail.com already started session.

    //!============================== CUSTOM ERRORS ==============================!//
    //! error in the username is already in use.
    it('Failed edit profile jperez@gmail.com => username is already in use', (done) => {
        let dataSend = {
            Authorization: `Bearer ${userToken}`,
            username: 'mgonzalez',
            email: 'jperez@gmail.com',
            firstName: 'juan',
            lastName: 'perez'
        };

        chai.request(url)
            .put(keys.routes.put.editProfile)
            .set('Authorization', `Bearer ${userToken}`)
            .send(dataSend)
            .end(function(err, res) {
                helpers.printInfoTestCase(nroTestCase++, dataSend, res.body);
                expect(err).to.be.null;
                expect(res).to.have.status(422);
                done();
            });
    });

    //! error in the email is already in use.
    it('Failed edit profile jperez@gmail.com => email is already in use', (done) => {
        let dataSend = {
            Authorization: `Bearer ${userToken}`,
            username: 'jperez',
            email: 'mgonzalez@gmail.com',
            firstName: 'juan',
            lastName: 'perez'
        };

        chai.request(url)
            .put(keys.routes.put.editProfile)
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

describe(helpers.setHeaderTest('TEST METHOD editProfile: edit only the email and login'), () => {

    //* successful edited user profile jperez@gmail.com.
    it('Successful edited user profile jperez2@gmail.com => get new user profile', (done) => {
        let dataSend = {
            Authorization: `Bearer ${userToken}`,
            username: 'jperez',
            email: 'jperez2@gmail.com',
            firstName: 'juan',
            lastName: 'perez'
        };

        chai.request(url)
            .put(keys.routes.put.editProfile)
            .set('Authorization', `Bearer ${userToken}`)
            .send(dataSend)
            .end(function(err, res) {
                helpers.printInfoTestCase(nroTestCase++, dataSend, res.body);
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });

    //* successful login from jperez2@gmail.com.
    it('Successful login from jperez2@gmail.com => create a token', (done) => {
        let dataSend = {
            email: 'jperez2@gmail.com',
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

});

describe(helpers.setHeaderTest('TEST METHOD editProfile: remove user and login'), () => {

    //* successful user removed jperez2@gmail.com.
    it('Successful user removed jperez2@gmail.com => get user id removed', (done) => {
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
    it('Failed edit profile jperez2@gmail.com => user was already removed', (done) => {
        let dataSend = {
            Authorization: `Bearer ${userToken}`,
            username: 'jperez',
            email: 'jperez@gmail.com',
            firstName: 'juan',
            lastName: 'perez'
        };

        chai.request(url)
            .put(keys.routes.put.editProfile)
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