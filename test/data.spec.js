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

});
