/* globals angular, chai */

const {assert} = chai;

describe('position service', ()=>{
  let $httpBackend = null, positionService = null;

  beforeEach(
      angular.mock.module('services', {apiUrl: '/api'})
  );

  beforeEach(angular.mock.inject((_positionService_, _$httpBackend_)=>{
    $httpBackend = _$httpBackend_;
    positionService = _positionService_;
  }));

  afterEach(()=>{
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('GETs a users positions', done=>{
    const positions = ['test', 'test1', 'test2'];
    const userId = '123';

    $httpBackend
      .expectGET(`/api/positions/byUser/${userId}`)
      .respond(positions);

    positionService.getByUser(userId)
      .then(result=>{
        assert.deepEqual(result, positions);
        done();
      })
      .catch(done);

    $httpBackend.flush();
  });

  it('POSTs a position', done=>{
    const positionToAdd = {title: 'position title'};
    const mockResponse = {__v: 0, title: 'position title'};
    const userId = '123';

    $httpBackend
      .expectPOST(`/api/positions/${userId}`)
      .respond(mockResponse);

    positionService.add(positionToAdd, userId)
      .then(addedPosition=>{
        assert.deepEqual(addedPosition, mockResponse);
        done();
      })
      .catch(done);

    $httpBackend.flush();
  });

  it('DELETEs a position', done=>{
    const positionToDelete = {_id: '123', title: 'position name'};
    const mockResponse = {__v: 0, title: 'position name'};

    $httpBackend
      .expectDELETE(`/api/positions/${positionToDelete._id}`)
      .respond(mockResponse);

    positionService.remove(positionToDelete._id)
      .then(deletedPosition=>{
        assert.deepEqual(deletedPosition, mockResponse);
        done();
      })
      .catch(done);

    $httpBackend.flush();
  });

  it('PUTs a position', done=>{
    const positionToEdit = {_id: '123'};
    const mockResponse = {__v: 0, title: 'position name'};
    // const editedPosition = {__v:0, title: 'moo'};
    // const positionId = '123';
    $httpBackend
      .expectPUT(`/api/positions/${positionToEdit._id}`)
      .respond(mockResponse);

    positionService.update(positionToEdit)
      .then(editedPosition=>{
        assert.deepEqual(editedPosition, mockResponse);
        done();
      })
      .catch(done);

    $httpBackend.flush();
  });

  it('gets positions appled for the week', done=>{
    const userId = '123';
    const mockResponse = [{__v: 0, title: 'position name'}];
    $httpBackend
      .expectGET(`/api/positions/byUser/${userId}/weekly`)
      .respond(mockResponse);

    positionService.getCountForWeek(userId)
      .then(positions=>{
        assert.deepEqual(positions, 1);
        done();
      })
      .catch(done);

    $httpBackend.flush();
  });

});
