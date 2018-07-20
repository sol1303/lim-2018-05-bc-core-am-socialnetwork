window.validateLogIn = (email, password) => {
  let patronEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

  let logIn = {
    email: false,
    password: false
  }

  if (email !== "" && patronEmail.test(email)) {
    logIn.email = true;

    if (password !== "" && password !== null) {
      logIn.password = true;
		}
		// else logIn.password = false;

	}
	// else logIn.email = false;

  return logIn;
}
