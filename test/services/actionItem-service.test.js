/* globals angular, chai */

const {assert} = chai;

describe('actionItem service', ()=>{
  let $httpBackend = null, actionItemService = null;

  beforeEach(
      angular.mock.module('services', {apiUrl: '/api'})
  );

  beforeEach(angular.mock.inject((_actionItemService_, _$httpBackend_)=>{
    $httpBackend = _$httpBackend_;
    actionItemService = _actionItemService_;
  }));

  afterEach(()=>{
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('GETs a users actionItems', done=>{
    const mockActionItems = [{action: 'blah1'}, {action: 'blah2'}];
    const userId = '123';

    $httpBackend
      .expectGET(`/api/actionItems/byUser/${userId}`)
      .respond(mockActionItems);

    actionItemService.getByUser(userId)
      .then(result=>{
        assert.deepEqual(result, mockActionItems);
        done();
      })
      .catch(done);
    $httpBackend.flush();
  });

  it('GETs due and overdue actionItems', done=>{
    const mockActionItems = [{action: 'blah1'}, {action: 'blah2'}];
    const userId = '123';

    $httpBackend
      .expectGET(`/api/actionItems/byUser/${userId}/overdue`)
      .respond(mockActionItems);

    actionItemService.getDueAndOverdue(userId)
      .then(result=>{
        assert.deepEqual(result, mockActionItems);
        done();
      })
      .catch(done);
    $httpBackend.flush();  
  });

  
  

});
