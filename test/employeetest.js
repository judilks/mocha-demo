var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);

describe('employees', () => {

  before(() => {
    
  });
  
  it('should list ALL employees on /employees GET', (done) => {
      chai.request(server)
        .get('/employees')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json();
          res.body.should.be.a('object');
          done();
        });
  });

  it('should insert employee into employees on /employees POST', (done) => {
    chai.request(server)
      .post('/employees')
      .send({name: 'ggggg', email: 'goodmorning@gmail.com'})
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json();
        res.body.should.be.a('object');
        done();
      });
  });

  it('should update employee from employees on /employees PUT', (done) => {
    chai.request(server)
      .put('/employees/goodmorning@gmail.com')
      .send({name:'friend', email:'goodmorningvietnam@gmail.com'})
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json();
        res.body.should.be.a('object');
        done();
      });
  });

  it('should delete employee from employees on /employees DELETE', (done) => {
    chai.request(server)
      .delete('/employees/goodmorningvietnam@gmail.com')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json();
        res.body.should.be.a('object');
        done();
      });
  });
    
 
});