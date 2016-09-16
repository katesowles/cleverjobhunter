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

  it('gets comapnies appled for the week', done=>{
    const userId = '123';
    const mockResponse = [{__v: 0, title: 'company name'}];
    $httpBackend
      .expectGET(`/api/companies/byUser/${userId}/weekly`)
      .respond(mockResponse);

    companyService.getCountForWeek(userId)
      .then(companies=>{
        assert.deepEqual(companies, 1);
        done();
      })
      .catch(done);

    $httpBackend.flush();
  });

  it('PUTs a comapany', done=>{
    const companyToEdit = {_id: '123'};
    const mockResponse = {__v: 0, title: 'compant name'};
    $httpBackend
      .expectPUT(`/api/companies/${companyToEdit._id}`)
      .respond(mockResponse);

    companyService.update(companyToEdit)
      .then(editedCompany=>{
        assert.deepEqual(editedCompany, mockResponse);
        done();
      })
      .catch(done);

    $httpBackend.flush();
  });

  it('POSTs a company', done=>{
    const companyToAdd = {title: 'company title'};
    const mockResponse = {__v: 0, title: 'comapny title'};
    const userId = '123';

    $httpBackend
      .expectPOST(`/api/companies/${userId}`)
      .respond(mockResponse);

    companyService.add(companyToAdd, userId)
      .then(addedCompany=>{
        assert.deepEqual(addedCompany, mockResponse);
        done();
      })
      .catch(done);

    $httpBackend.flush();
  });

});
