/* globals angular, chai */

const {assert} = chai;

describe('company service', ()=>{
  let $httpBackend = null, companyService = null;

  beforeEach(
      angular.mock.module('services', {apiUrl: '/api'})
  );

  beforeEach(angular.mock.inject((_companyService_, _$httpBackend_)=>{
    $httpBackend = _$httpBackend_;
    companyService = _companyService_;
  }));

  afterEach(()=>{
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('GETs a users companies', done=>{
    const companies = ['test', 'test1', 'test2'];
    const userId = '123';

    $httpBackend
      .expectGET(`/api/companies/byUser/${userId}`)
      .respond(companies);

    companyService.getByUser(userId)
      .then(result=>{
        assert.deepEqual(result, companies);
        done();
      })
      .catch(done);

    $httpBackend.flush();
  });

});
