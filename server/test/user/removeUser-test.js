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

describe(helpers.setHeaderTest('TEST METHOD removeUser: remove twice a same user'), () => {

    //* successful login mgonzalez@gmail.com.
    // mgonzalez@gmail.com already registered.
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

    //* successful user removed mgonzalez@gmail.com.
    it('Successful user removed mgonzalez@gmail.com => get user id removed', (done) => {
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
    it('Failed edit profile mgonzalez@gmail.com => user was already removed', (done) => {
        chai.request(url)
            .delete(keys.routes.delete.removeUser)
            .set('Authorization', `Bearer ${userToken}`)
            .end(function(err, res) {
                helpers.printInfoTestCase(nroTestCase++, { Authorization: `Bearer ${userToken}` }, res.body);
                expect(err).to.be.null;
                expect(res).to.have.status(404);
                done();
            });
    });

});