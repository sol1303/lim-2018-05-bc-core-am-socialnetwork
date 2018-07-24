var firebasemock = require('firebase-mock');

var mockauth = new firebasemock.MockAuthentication();
var mockdatabase = new firebasemock.MockFirebase();
var mockfirestore = new firebasemock.MockFirestore();
var mockstorage = new firebasemock.MockStorage();
var mockmessaging = new firebasemock.MockMessaging();
var mocksdk = new firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  (path) => {
    return path ? mockdatabase.child(path) : mockdatabase;
  },
  // use null if your code does not use AUTHENTICATION
  () => {
    return mockauth;
  },
  // use null if your code does not use FIRESTORE
  () => {
    return mockfirestore;
  },
  // use null if your code does not use STORAGE
  () => {
    return mockstorage;
  },
  // use null if your code does not use MESSAGING
  () => {
    return mockmessaging;
  }
);

describe("mockFirebase", () => {

  // solo la login
  it("la función de logIn debe ser global", () => {
    assert.isFunction(logIn);
    mocksdk.auth().autoFlush();

  // create user
    mocksdk.auth().createUser({
      uid: '123',
      email: 'test@test.com',
      password: 'abc123'
    }).then(function(user) {
      // set user as current user for client logic
      mocksdk.auth().changeAuthState(user);
    });
    logIn("test@test.com", "abc123")
  });

  // solo facebook
  it("la función de facebookAccount debe ser global", () => {
    assert.isFunction(facebookAccount);
  });

  // solo google
  it("la función de googleAccount debe ser global", () => {
    assert.isFunction(googleAccount);
  });

});
