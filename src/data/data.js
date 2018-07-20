window.validateLogIn = (email, password) => {
  let patronEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

  let logIn = {
    email: false,
    password: false
  }

  // logIn.email va a obtener true porque email !== "" && patronEmail.test(email) retornan el boolean true
  logIn.email = email !== "" && patronEmail.test(email);
  logIn.password = password !== "" && password !== null;

  return logIn;
}
