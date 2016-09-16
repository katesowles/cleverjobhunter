/* globals angular, chai */

const {assert} = chai;

describe('contact service', ()=>{
  let $httpBackend = null, contactService = null;

  beforeEach(
      angular.mock.module('services', {apiUrl: '/api'})
  );

  beforeEach(angular.mock.inject((_contactService_, _$httpBackend_)=>{
    $httpBackend = _$httpBackend_;
    contactService = _contactService_;
  }));

  afterEach(()=>{
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('GETs a users contacts', done=>{
    const contacts = ['test', 'test1', 'test2'];
    const userId = '123';

    $httpBackend
      .expectGET(`/api/contacts/byUser/${userId}`)
      .respond(contacts);

    contactService.getByUser(userId)
      .then(result=>{
        assert.deepEqual(result, contacts);
        done();
      })
      .catch(done);

    $httpBackend.flush();
  });

  it('adds a new contact', done=>{
      //contactService.add
    const newContact = {name: 'Joe'};
    const mockResponse = {__v: 0, name: 'Joe'};
    const userId = '123';

    $httpBackend
      .expectPOST(`/api/contacts/${userId}`, newContact)
      .respond(mockResponse);

    contactService.add(newContact, userId)
      .then(addedContact=>{
        assert.deepEqual(addedContact, mockResponse);
        done();
      })
      .catch(done);

    $httpBackend.flush();
  });

  it('updates a contact', done=>{
    const contactToUpdate = {_id: '123', name: 'Updated'};
    const mockResponse = {__v: 0, _id: '123', name: 'Updated'};

    $httpBackend
      .expectPUT(`/api/contacts/${contactToUpdate._id}`, contactToUpdate)
      .respond(mockResponse);

    contactService.update(contactToUpdate)
      .then(updatedContact=>{
        assert.deepEqual(updatedContact, mockResponse);
        done();
      })
      .catch(done);

    $httpBackend.flush();
  });
  

});