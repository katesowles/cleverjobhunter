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

  it('DELETEs a company', done=>{
    const companyToDelete = {_id: '123', name: 'Company name'};
    const mockResponse = {__v: 0, name: 'Company name'};

    $httpBackend
      .expectDELETE(`/api/companies/${companyToDelete._id}`)
      .respond(mockResponse);

    companyService.remove(companyToDelete._id)
      .then(deletedCompany=>{
        assert.deepEqual(deletedCompany, mockResponse);
        done();
      })
      .catch(done);

    $httpBackend.flush();
  });

});
