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

  it('GETs actions items associated with a position', done=>{
    const mockActionItems = [{action: 'blah1'}, {action: 'blah2'}];
    const userId = '123';
    const which = 'postion';

    $httpBackend
      .expectGET(`/api/actionItems/byPosOrComp/${userId}/${which}`)
      .respond(mockActionItems);

    actionItemService.getByPosOrComp(which, userId)
      .then(result=>{
        assert.deepEqual(result, mockActionItems);
        done();
      })
      .catch(done);
    $httpBackend.flush();  
  });

  it('GETs actions items associated with a position', done=>{
    const mockActionItems = [{action: 'blah1'}, {action: 'blah2'}];
    const userId = '123';
    const which = 'company';

    $httpBackend
      .expectGET(`/api/actionItems/byPosOrComp/${userId}/${which}`)
      .respond(mockActionItems);

    actionItemService.getByPosOrComp(which, userId)
      .then(result=>{
        assert.deepEqual(result, mockActionItems);
        done();
      })
      .catch(done);
    $httpBackend.flush();
  });

  it('POSTs actions item associated with a position or company', done=>{
    const mockActionItems = {action: 'blah1'};
    const actionItem = {action: 'blah1'};
    const userId = '123';

    $httpBackend
      .expectPOST(`/api/actionItems/${userId}`)
      .respond(mockActionItems);

    actionItemService.addForPosOrComp(actionItem, userId)
      .then(result=>{
        assert.deepEqual(result, mockActionItems);
        done();
      })
      .catch(done);
    $httpBackend.flush();
  });

  it('DELETEs actions item associated with a user', done=>{
    const mockActionItems = {action: 'blah1'};
    const actionItemId = '123';

    $httpBackend
      .expectDELETE(`/api/actionItems/${actionItemId}`)
      .respond(mockActionItems);

    actionItemService.remove(actionItemId)
      .then(result=>{
        assert.deepEqual(result, mockActionItems);
        done();
      })
      .catch(done);
    $httpBackend.flush();
  });

  it('PUTs a action item', done=>{
    const mockActionItems = {action: 'blah1'};
    const actionItem = {action: 'blah', _id: '123'};

    $httpBackend
      .expectPUT(`/api/actionItems/${actionItem._id}`)
      .respond(mockActionItems);

    actionItemService.update(actionItem)
      .then(result=>{
        assert.deepEqual(result, mockActionItems);
        done();
      })
      .catch(done);
    $httpBackend.flush();
  });

 

  
  

});
