describe("data", () => {

  // solo funcion de login
  it("la función de validateLogIn debe ser global", () => {
    assert.isFunction(validateLogIn);
  });

  describe("validateLogin(email, password)", () => {
		let email = "ana@gmail.com";
		let password = "123456";
		const patron = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
		// let email, password;
    const validate = validateLogIn(email, password);

    it("debe retornar un objeto que tenga como propiedades email y password", () => {
      assert.ok(validate.hasOwnProperty("email"));
      assert.ok(validate.hasOwnProperty("password"));
    });

    it("debe retornar como propiedad email=true y password=true para comprobar que ambas son validas", () => {
			assert.equal(validate.email, true);
			assert.equal(validate.password, true);
		});

		it("email y password deben mas de un caracter", ()=> {
			assert.notEqual(email, "");
			assert.notEqual(password, "");
			assert.notEqual(email, null);
			assert.notEqual(password, null);
		})

		it("el email debe ser valido con tener como contenido @ seguido de 4 caracteres como mínimo . 2 caracteres más", () => {
			assert.isOk(email, patron.test(email));
		})

  });

});
