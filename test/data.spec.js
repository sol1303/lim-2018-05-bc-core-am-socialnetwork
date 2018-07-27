describe("data", () => {

  // solo funcion de login
  it("la función de validateLogIn debe ser global", () => {
    assert.isFunction(validateLogIn);
  });

  describe("validateLogin(email, password)", () => {
    let email = "ana@gmail.com";
    let password = "123456";
    const patron = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    const validate = validateLogIn(email, password);

    it("debe retornar un objeto que tenga como propiedades email y password", () => {
      assert.ok(validate.hasOwnProperty("email"));
      assert.ok(validate.hasOwnProperty("password"));
    });

    it("debe retornar como propiedad email=true y password=true para comprobar que ambas son validas", () => {
      assert.equal(validate.email, true);
      assert.equal(validate.password, true);
    });

    it("el email debe ser valido con tener como contenido @ seguido de 4 caracteres como mínimo . 2 caracteres más", () => {
      assert.equal(patron.test(email), true);
    });

  });

  // solo para signup de validar formulario de pacientes
  it("la función de validateFormSignUpUsers debe ser global", () => {
    assert.isFunction(validateFormSignUpUsers);
  })

  describe("validateFormSignUpUsers(name, email, password, confirm_password)", () => {
    let name = "Raymond";
    let email = "raymond@gmail.com";
    let password = "123456";
    let confirm_password = "123456";
    const validate = validateFormSignUpUsers(name, email, password, confirm_password);

    it("debe retornar un objeto que tenga como propiedades name, email, password y confirm_password", () => {
      assert.ok(validate.hasOwnProperty("name"));
      assert.ok(validate.hasOwnProperty("email"));
      assert.ok(validate.hasOwnProperty("password"));
      assert.ok(validate.hasOwnProperty("confirm_password"));
    });

    it("debe retornar que todas las propiedades tengan como valor true para que sean válidas", () => {
      assert.equal(validate.name, true);
      assert.equal(validate.email, true);
      assert.equal(validate.password, true);
      assert.equal(validate.confirm_password, true);
    });

  });

  // solo para validar datos veridicos de un doctor
  it("la función de validateEspecificDoctor debe ser global", () => {
    assert.isFunction(validateEspecificDoctor);
  });

  describe("validateEspecificDoctor(especialidad, colegiatura)", () => {
    let especialidad = "Pediatría";
    let colegiatura = "123456";
    const validate = validateEspecificDoctor(especialidad, colegiatura);

    it("debería retornar un objeto que tenga como propiedad especialidad y colegiatura", () => {
      assert.ok(validate.hasOwnProperty("especialidad"));
      assert.ok(validate.hasOwnProperty("colegiatura"));
    });

    it("debe retornar que todas las propiedades tengan como valor true para que sean válidas", () => {
      assert.equal(validate.especialidad, true);
      assert.equal(validate.colegiatura, true);
    });

  });

});

describe("mockFirebase", () => {

  var firebasemock = require('firebase-mock');

  var mockauth = new firebasemock.MockAuthentication();
  var mockdatabase = new firebasemock.MockFirebase();
  var mockfirestore = new firebasemock.MockFirestore();
  var mockstorage = new firebasemock.MockStorage();
  var mockmessaging = new firebasemock.MockMessaging();
  var mocksdk = new firebasemock.MockFirebaseSdk(
    (path) => {
      return path ? mockdatabase.child(path) : mockdatabase;
    },
    () => {
      return mockauth;
    },
    () => {
      return mockfirestore;
    },
    () => {
      return mockstorage;
    },
    () => {
      return mockmessaging;
    }
  );

  describe("logIn", () => {
    it("la función de logIn debe ser global", () => {
      assert.isFunction(logIn);
      mocksdk.auth().autoFlush();

      mocksdk.auth().createUser({
        uid: '123',
        email: 'test@test.com',
        password: 'abc123'
      }).then(function (user) {
        mocksdk.auth().changeAuthState(user);
      });
      logIn("test@test.com", "abc123");
    });
  });

  describe("facebookProvider", () => {
    it("la función de facebookAccount debe ser global", () => {
      assert.isFunction(facebookAccount);
      mocksdk.auth().autoFlush();
      var mockFacebook = new mocksdk.auth.FacebookAuthProvider();
      mocksdk.auth().signInWithPopup(mockFacebook);
      facebookAccount();
    });
  });

  describe("googleProvider", () => {
    it("la función de googleAccount debe ser global", () => {
      assert.isFunction(googleAccount);
      mocksdk.auth().autoFlush();
      var mockGoogle = new mocksdk.auth.GoogleAuthProvider();
      mocksdk.auth().signInWithPopup(mockGoogle);
      googleAccount();
    });
  });

});
