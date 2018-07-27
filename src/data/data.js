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

window.validateFormSignUpUsers = (name, email, password, confirm_pass) => {
  let patronEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

  let signUpUser = {
    name: false,
    email: false,
    password: false,
    confirm_password: false
  }

  signUpUser.name = name.length > 2;
  signUpUser.email = email !== "" && patronEmail.test(email);
  signUpUser.password = password.length >= 4;
  signUpUser.confirm_password = password === confirm_pass && confirm_pass.length >= 6;

  return signUpUser;
}

window.validateEspecificDoctor = (especialidad, colegiatura) => {
  let especificDoctor = {
    especialidad: false,
    colegiatura: false
  }

  especificDoctor.especialidad = especialidad !== "";
  especificDoctor.colegiatura = colegiatura.length > 5;

  return especificDoctor;
}