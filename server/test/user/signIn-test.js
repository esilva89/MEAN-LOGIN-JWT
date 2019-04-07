// External Libs.
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;

// My Modules.
const keys = require('../../config/keys');
const { helpers } = require('../../utils');

const url = `http://localhost:${keys.server.port}`;
var nroTestCase = 1;

chai.use(chaiHttp);

// After the execution of the tests, the database will contain:
//* - user jperez@gmail.com.

describe(helpers.setHeaderTest('TEST METHOD singIn: login a user'), () => {

    //* successful login jperez@gmail.com.
    // jperez@gmail.com already registered.
    it('Successful login jperez@gmail.com => create a token', (done) => {
        let dataSend = {
            email: 'jperez@gmail.com',
            password: 'Blabla9090*'
        };

        chai.request(url)
            .post(keys.routes.post.signIn)
            .send(dataSend)
            .end(function(err, res) {
                helpers.printInfoTestCase(nroTestCase++, dataSend, res.body);
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });
    
});

describe(helpers.setHeaderTest('TEST METHOD signIn: errors from express-validation'), () => {

    //!=============== ERRORS DETECTED BY EXPRESS-VALIDATOR ===============!//
    //! error in the email invalid format.
    it('Failed login jperez@gmail.com => email invalid format', (done) => {
        let dataSend = {
            email: 'jperezgmail.com',
            password: 'Blabla9090*'
        };

        chai.request(url)
            .post(keys.routes.post.signIn)
            .send(dataSend)
            .end(function(err, res) {
                helpers.printInfoTestCase(nroTestCase++, dataSend, res.body);
                expect(err).to.be.null;
                expect(res).to.have.status(422);
                done();
            });
    });

    //! error in the password min 8 characters.
    it('Failed login jperez@gmail.com => password min 8 characters', (done) => {
        let dataSend = {
            email: 'jperez@gmail.com',
            password: 'B'
        };

        chai.request(url)
            .post(keys.routes.post.signIn)
            .send(dataSend)
            .end(function(err, res) {
                helpers.printInfoTestCase(nroTestCase++, dataSend, res.body);
                expect(err).to.be.null;
                expect(res).to.have.status(422);
                done();
            });
    });

    //! error in the password invalid format.
    it('Failed login jperez@gmail.com => password invalid format', (done) => {
        let dataSend = {
            email: 'jperez@gmail.com',
            password: 'Blabla9090',
        };

        chai.request(url)
            .post(keys.routes.post.signIn)
            .send(dataSend)
            .end(function(err, res) {
                helpers.printInfoTestCase(nroTestCase++, dataSend, res.body);
                expect(err).to.be.null;
                expect(res).to.have.status(422);
                done();
            });
    });
    
});

describe(helpers.setHeaderTest('TEST METHOD signIn: login with email that does not exist'), () => {

    //! error in the email not found user.
    it('Failed login jp@gmail.com => email not found user', (done) => {
        let dataSend = {
            email: 'jp@gmail.com',
            password: 'Blabla9090*',
        };

        chai.request(url)
            .post(keys.routes.post.signIn)
            .send(dataSend)
            .end(function(err, res) {
                helpers.printInfoTestCase(nroTestCase++, dataSend, res.body);
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                done();
            });
    });

});

describe(helpers.setHeaderTest('TEST METHOD signIn: login with email that exist but wrong password'), () => {

    //! error in the passwords do not match.
    it('Failed login jperez@gmail.com => passwords do not match', (done) => {
        let dataSend = {
            email: 'jperez@gmail.com',
            password: 'Blabla9090!',
        };

        chai.request(url)
            .post(keys.routes.post.signIn)
            .send(dataSend)
            .end(function(err, res) {
                helpers.printInfoTestCase(nroTestCase++, dataSend, res.body);
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                done();
            });
    });

});