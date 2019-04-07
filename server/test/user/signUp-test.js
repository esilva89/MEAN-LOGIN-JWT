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
//* - new user jperez@gmail.com.

describe(helpers.setHeaderTest('TEST METHOD signUp: register new user'), () => {

    //* successful register from jperez@gmail.com.
    it('Successful register from jperez@gmail.com => insert new user', (done) => {
        let dataSend = {
            username: 'jperez',
            email: 'jperez@gmail.com',
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
    
});

describe(helpers.setHeaderTest('TEST METHOD signUp: errors from express-validation'), () => {
    
    //!========== ERRORS DETECTED BY EXPRESS-VALIDATOR ==========!//
    //! error in the username min 5 characters.
    it('Failed register test1@gmail.com => username min 5 characters', (done) => {
        let dataSend = {
            username: 't1',
            email: 'test1@gmail.com',
            password: 'Blabla9090*',
            confirmPassword: 'Blabla9090*'
        };

        chai.request(url)
            .post(keys.routes.post.signUp)
            .send(dataSend)
            .end(function(err, res) {
                helpers.printInfoTestCase(nroTestCase++, dataSend, res.body);
                expect(err).to.be.null;
                expect(res).to.have.status(422);
                done();
            });
    });

    //! error in the email invalid format.
    it('Failed register test1@gmail.com => email invalid format', (done) => {
        let dataSend = {
            username: 'test1',
            email: 'test1gmail.com',
            password: 'Blabla9090*',
            confirmPassword: 'Blabla9090*'
        };

        chai.request(url)
            .post(keys.routes.post.signUp)
            .send(dataSend)
            .end(function(err, res) {
                helpers.printInfoTestCase(nroTestCase++, dataSend, res.body);
                expect(err).to.be.null;
                expect(res).to.have.status(422);
                done();
            });
    });

    //! error in the password min 8 characters.
    it('Failed register test1@gmail.com => password min 8 characters', (done) => {
        let dataSend = {
            username: 'test1',
            email: 'test1@gmail.com',
            password: 'B',
            confirmPassword: 'B'
        };

        chai.request(url)
            .post(keys.routes.post.signUp)
            .send(dataSend)
            .end(function(err, res) {
                helpers.printInfoTestCase(nroTestCase++, dataSend, res.body);
                expect(err).to.be.null;
                expect(res).to.have.status(422);
                done();
            });
    });

    //! error in the password invalid format.
    it('Failed register test1@gmail.com => password invalid format', (done) => {
        let dataSend = {
            username: 'test1',
            email: 'test1@gmail.com',
            password: 'Blabla9090',
            confirmPassword: 'Blabla9090'
        };

        chai.request(url)
            .post(keys.routes.post.signUp)
            .send(dataSend)
            .end(function(err, res) {
                helpers.printInfoTestCase(nroTestCase++, dataSend, res.body);
                expect(err).to.be.null;
                expect(res).to.have.status(422);
                done();
            });
    });

    //! error in the passwords do not match.
    it('Failed register test1@gmail.com => passwords do not match', (done) => {
        let dataSend = {
            username: 'test1',
            email: 'test1@gmail.com',
            password: 'Blabla9090*',
            confirmPassword: 'Blabla9090!'
        };

        chai.request(url)
            .post(keys.routes.post.signUp)
            .send(dataSend)
            .end(function(err, res) {
                helpers.printInfoTestCase(nroTestCase++, dataSend, res.body);
                expect(err).to.be.null;
                expect(res).to.have.status(422);
                done();
            });
    });

});

describe(helpers.setHeaderTest('TEST METHOD signUp: using attributes already in use'), () => {
    
    //!==================== CUSTOM ERRORS ====================!//
    //! error in the username is already in use.
    it('Failed register test1@gmail.com => username is already in use', (done) => {
        let dataSend = {
            username: 'jperez',
            email: 'test1@gmail.com',
            password: 'Blabla9090*',
            confirmPassword: 'Blabla9090*'
        };

        chai.request(url)
            .post(keys.routes.post.signUp)
            .send(dataSend)
            .end(function(err, res) {
                helpers.printInfoTestCase(nroTestCase++, dataSend, res.body);
                expect(err).to.be.null;
                expect(res).to.have.status(422);
                done();
            });
    });

    //! error in the email is already in use.
    it('Failed register test1@gmail.com => email is already in use', (done) => {
        let dataSend = {
            username: 'test1',
            email: 'jperez@gmail.com',
            password: 'Blabla9090*',
            confirmPassword: 'Blabla9090*'
        };


        chai.request(url)
            .post(keys.routes.post.signUp)
            .send(dataSend)
            .end(function(err, res) {
                helpers.printInfoTestCase(nroTestCase++, dataSend, res.body);
                expect(err).to.be.null;
                expect(res).to.have.status(422);
                done();
            });
    });

});