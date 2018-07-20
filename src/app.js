// sections que están generales
const sectionMuroFalso = document.getElementById("muro-falso");
const btnLogOut = document.getElementById("btn-log-out");

// botones de NAV
const navBtnLogIn = document.getElementById("nav-modal-log-in");
const navBtnSignUp = document.getElementById("nav-modal-sign-up");

// mini nav
const miniNavBtnLogIn = document.getElementById("mini-nav-modal-log-in");
const miniNavBtnSignUp = document.getElementById("mini-nav-modal-sign-up");

// modals dentro de MAIN
const modalLogIn = document.getElementById("modal-log-in");
const modalSignUp = document.getElementById("modal-sign-up");

// dentro de modalLogIn
const closeModalLogIn = document.getElementById("close-log-in");
const sectionLogIn = document.getElementById("main-log-in");

// dentro de sectionLogIn
const txtEmailLogIn = document.getElementById("txt-user-mail-login");
const helperEmailLogIn = document.getElementById("incorrect-email");

const txtPasswordLogIn = document.getElementById("txt-user-password-login");
const helperPasswordLogIn = document.getElementById("incorrect-password");

const btnEmailLogIn = document.getElementById("btn-email-log-in");
const btnFacebookLogIn = document.getElementById("btn-fb-log-in");
const btnGoogleLogIn = document.getElementById("btn-google-log-in");
const goToSignUp = document.getElementById("go-to-sign-up");

// dentro de modalSignUp
const closeModalSignUp = document.getElementById("close-sign-up");
const sectionUserSelection = document.getElementById("select-user");
const optionsDoctors = document.getElementById('options-doctors');
const optionsUsers = document.getElementById("options-users");
const sectionSignUpDoctors = document.getElementById("main-sign-up-doctors");
const sectionSignUpUsers = document.getElementById("main-sign-up-users");

// dentro de sectionUserSelection
const goToSignUpDoctors = document.getElementById("sign-up-selection-doctors");
const goToSignUpUsers = document.getElementById("sign-up-selection-users");

// dentro de optionsDoctors
const txtEspecialidad = document.getElementById("specialty");
const helperEspecialidad = document.getElementById("incorrect-specialty");
const txtColegiatura = document.getElementById("colegiatura");
const helperColegiatura = document.getElementById("incorrect-colegiatura");
const btnModalEmailSignUpDoctors = document.getElementById("btn-email-modal-sign-up-doctors");
const btnModalFbSignUpDoctors = document.getElementById("btn-fb-modal-sign-up-doctors");
const btnModalGgSignUpDoctors = document.getElementById("btn-gg-modal-sign-up-doctors");

// dentro de optionsUsers
const btnModalEmailSignUpUsers = document.getElementById("btn-email-modal-sign-up-users");
const btnModalFbSignUpUsers = document.getElementById("btn-fb-modal-sign-up-users");
const btnModalGgSignUpUsers = document.getElementById("btn-gg-modal-sign-up-users");

// dentro de signup doctors de email sectionSignUpDoctors
const txtDoctorNameSignUp = document.getElementById("txt-doctor-name-signup");
const helperNameDoctorSignUp = document.getElementById("incorrect-doctor-name-sign-up");

const txtDoctorEmailSignUp = document.getElementById("txt-doctor-mail-signup");
const helperEmailDoctorSignUp = document.getElementById("incorrect-doctor-mail-sign-up");

const txtDoctorPasswordSignUp = document.getElementById("txt-doctor-password-signup");
const helperPasswordDoctorSignUp = document.getElementById("incorrect-doctor-password-sign-up");

const txtDoctorConfirmPasswordSignUp = document.getElementById("txt-doctor-confirm-password-signup");
const helperConfirmPasswordDoctorSignUp = document.getElementById("incorrect-doctor-confirm-password-sign-up");

const btnSignUpDoctors = document.getElementById("btn-sign-up-doctors");
const goToLogInFromDoctors = document.getElementById("go-to-log-in-doctors");

// dentro de signup users de email sectionSignUpUsers
const txtUserNameSignUp = document.getElementById("txt-user-name-signup");
const helperNameUserSignUp = document.getElementById("incorrect-user-name-sign-up");

const txtUserEmailSignUp = document.getElementById("txt-user-mail-signup");
const helperEmailUserSignUp = document.getElementById("incorrect-user-email-sign-up");

const txtUserPasswordSignUp = document.getElementById("txt-user-password-signup");
const helperPasswordUserSignUp = document.getElementById("incorrect-user-password-sign-up");

const txtUserConfirmPasswordSignUp = document.getElementById("txt-user-confirm-password-signup");
const helperConfirmPasswordUserSignUp = document.getElementById("incorrect-user-confirm-password-sign-up");

const btnSignUpUsers = document.getElementById("btn-sign-up-users");
const goToLogInFromUsers = document.getElementById("go-to-log-in-users");

const patronEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

let isProcessing = false;

const userLocal = {
  uid: null,
  username: null,
  email: null,
  type: null,
  specialty: null,
  colegiatura: null,
  profile_picture: null
}

// método que guarda al usuario en la base de datos - recibe objeto user para almacenar en la db
writeUserDbFirebase = (uid, name, email, type, specialty, colegiatura, imageUrl) => {
  firebase.database().ref('users/' + uid).set({
    username: name,
    email: email,
    type: type,
    specialty: specialty,
    colegiatura: colegiatura,
    profile_picture: imageUrl
  }).then(response => {
    console.log(response);
    window.location.href = 'html/menu.html'
  }).catch(error => {
    console.error('error', error);
  });
}

updateUserByProvider = (uid, name, email, photo) => {
  userLocal.uid = uid;
  userLocal.username = name;
  userLocal.email = email;
  userLocal.profile_picture = photo;
  writeUserDbFirebase(userLocal.uid, userLocal.username, userLocal.email, userLocal.type, userLocal.specialty, userLocal.colegiatura, userLocal.profile_picture)
}

window.onload = () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      sectionMuroFalso.style.display = "none";
      modalLogIn.style.display = "none";
      modalSignUp.style.display = "none";
      navBtnLogIn.style.display = "none";
      navBtnSignUp.style.display = "none";
      if (!isProcessing) window.location.href = 'html/menu.html'
    } else {
      M.updateTextFields();
      sectionMuroFalso.style.display = "block";
      navBtnLogIn.style.display = "block";
      navBtnSignUp.style.display = "block";
    }
  });
}

const logOut = () => {
  firebase.auth().signOut().then(() => {
    userLocal.uid = null,
    userLocal.username = null,
    userLocal.email = null,
    userLocal.type = null,
    userLocal.specialty = null,
    userLocal.colegiatura = null,
    userLocal.profile_picture = null,
    txtEmailLogIn.value = "";
    txtPasswordLogIn.value = "";
    // doctores
    txtEspecialidad.value = "";
    txtColegiatura.value = "";
    txtDoctorNameSignUp.value = "";
    txtDoctorEmailSignUp.value = "";
    txtDoctorPasswordSignUp.value = "";
    txtDoctorConfirmPasswordSignUp.value = "";
    //pacientes
    txtUserNameSignUp.value = "";
    txtUserEmailSignUp.value = "";
    txtUserPasswordSignUp.value = "";
    txtUserConfirmPasswordSignUp.value = "";

    // cuando se salga de sesión para cualquier caso siempre se mostrará el login
    sectionMuroFalso.style.display = "block"
    modalLogIn.style.display = "block";
  });
}

const logIn = (email, password) => {
  const auth = firebase.auth();
  const promise = auth.signInWithEmailAndPassword(email, password);
  promise.catch(e => {
    helperPasswordLogIn.hidden = false;
    console.log(e);
  });
}

const showAlertLogIn = (validate) => {
  if (validate.email) helperEmailLogIn.hidden = true;
  else helperEmailLogIn.hidden = false;

  if (validate.password) helperPasswordLogIn.hidden = true;
  else helperPasswordLogIn.hidden = false;

  if (validate.email && validate.password) logIn(txtEmailLogIn.value, txtPasswordLogIn.value);
}

const showMuro = () => {
  closeNavModalSignUp();
  sectionSignUpDoctors.style.display = "none";
  sectionSignUpUsers.style.display = "none";
}

const signUpByDoctors = () => {
  const auth = firebase.auth();
  const promise = auth.createUserWithEmailAndPassword(txtDoctorEmailSignUp.value, txtDoctorPasswordSignUp.value).then(() => {
    const x = firebase.auth().currentUser;
    isProcessing = true;
    if (x) {
      writeUserDbFirebase(x.uid, txtDoctorNameSignUp.value, x.email, 'doctor', txtEspecialidad.value, txtColegiatura.value, null);
      showMuro();
      x.sendEmailVerification().then(() => {
        console.log("se envió correo de verificación de cuenta al correo");
      }).catch(error => {
        alert(error);
      });
    }
  });
  promise.catch(e => alert(e.message));
}

//validaciones de signup divisiones para users
const ableSignUpByDoctors = () => {
  let name, email, password, confirmPassword;
  //nombre
  if (txtDoctorNameSignUp.value.length > 0) {
    name = true;
  } else if (!txtDoctorNameSignUp.value.length > 0) {
    name = false;
  }
  //email
  if (txtDoctorEmailSignUp.value.length > 0 && patronEmail.test(txtDoctorEmailSignUp.value)) {
    email = true;
  } else if (txtDoctorEmailSignUp.value.length === 0 || !patronEmail.test(txtDoctorEmailSignUp.value)) {
    email = false;
  }
  //new password
  if (txtDoctorPasswordSignUp.value.length >= 6) {
    password = true;
  } else if (txtDoctorPasswordSignUp.value.length < 6) {
    password = false;
  }
  //confirm password
  if (txtDoctorConfirmPasswordSignUp.value.length >= 6 && txtDoctorConfirmPasswordSignUp.value === txtDoctorPasswordSignUp.value) {
    confirmPassword = true;
  } else if (txtDoctorConfirmPasswordSignUp.value.length < 6 || txtDoctorConfirmPasswordSignUp.value !== txtDoctorPasswordSignUp.value) {
    confirmPassword = false;
  }
  // si todas las etiquetas estan ocultas hará el registro
  if (name && email && password && confirmPassword) {
    signUpByDoctors();
  }
}

const signUpUsers = (e) => {
  if (e.currentTarget.id === "btn-email-modal-sign-up-users") {
    sectionSignUpUsers.style.display = "block";
    sectionUserSelection.style.display = "none";
    optionsUsers.style.display = "none";
  } else {
    // aqui se deberia mostrar el signup para los doctores
    sectionSignUpDoctors.style.display = "block";
    sectionUserSelection.style.display = "none";
    optionsDoctors.style.display = "none";
  }
}

const signUpByUsers = () => {
  const auth = firebase.auth();
  const promise = auth.createUserWithEmailAndPassword(txtUserEmailSignUp.value, txtUserPasswordSignUp.value).then(() => {
    const x = firebase.auth().currentUser;
    isProcessing = true;
    if (x) {
      writeUserDbFirebase(x.uid, txtUserNameSignUp.value, x.email, 'paciente', null, null, null);
      showMuro();
      x.sendEmailVerification().then(() => {
        console.log("se envió correo de verificación de cuenta al correo");
      }).catch(error => {
        alert(error);
      });
    }
  });
  promise.catch(e => alert(e.message));
}

//validaciones de signup divisiones para users
const ableSignUpByUsers = () => {
  let name, email, password, confirmPassword;
  //nombre
  if (txtUserNameSignUp.value.length > 0) {
    name = true;
  } else if (!txtUserNameSignUp.value.length > 0) {
    name = false;
  }
  //email
  if (txtUserEmailSignUp.value.length > 0 && patronEmail.test(txtUserEmailSignUp.value)) {
    email = true;
  } else if (txtUserEmailSignUp.value.length === 0 || !patronEmail.test(txtUserEmailSignUp.value)) {
    email = false;
  }
  //new password
  if (txtUserPasswordSignUp.value.length >= 6) {
    password = true;
  } else if (txtUserPasswordSignUp.value.length < 6) {
    password = false;
  }
  //confirm password
  if (txtUserConfirmPasswordSignUp.value.length >= 6 && txtUserConfirmPasswordSignUp.value === txtUserPasswordSignUp.value) {
    confirmPassword = true;
  } else if (txtUserConfirmPasswordSignUp.value.length < 6 || txtUserConfirmPasswordSignUp.value !== txtUserPasswordSignUp.value) {
    confirmPassword = false;
  }
  // si todas las etiquetas estan ocultas hará el registro
  if (name && email && password && confirmPassword) {
    // deberia actualizar el objeto user para almacenar en la db
    signUpByUsers();
  }
}

const showSignUp = () => {
  // enlace de login para ingresar a signup
  txtEmailLogIn.value = "";
  txtPasswordLogIn.value = "";
  closeNavModalLogIn();
  openNavModalSignUp();
}

const showLogIn = () => {
  if (txtEmailLogIn !== "" && txtPasswordLogIn !== "") {
    txtEmailLogIn.value = "";
    txtPasswordLogIn.value = "";
  }
  closeNavModalSignUp();
  sectionSignUpUsers.style.display = "none";
  sectionSignUpDoctors.style.display = "none";
  openNavModalLogIn();
}

const googleAccount = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  isProcessing = true;
  firebase.auth().signInWithPopup(provider).then(function (result) {
    let fireUser = result.user;
    updateUserByProvider(fireUser.uid, fireUser.displayName, fireUser.email, fireUser.photoURL);
  }).catch(error => {
    console.log(error);
  });
}

const facebookAccount = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  isProcessing = true;
  firebase.auth().signInWithPopup(provider).then(function (result) {
    fireUser = result.user;
    updateUserByProvider(fireUser.uid, fireUser.displayName, fireUser.email, fireUser.photoURL);
  }).catch(error => {
    alert(error.message);
  });
}

let showOptionsUserSelect = (e) => {
  M.updateTextFields();
  if (e.currentTarget.id === "sign-up-selection-users") {
    sectionUserSelection.style.display = "none";
    optionsUsers.style.display = "block";
  } else {
    sectionUserSelection.style.display = "none";
    optionsDoctors.style.display = "block";
  }
};

let openNavModalLogIn = () => {
  modalLogIn.style.display = "block";
}

let closeNavModalLogIn = () => {
  // vaciamos contenido de login cuando se cierra el modal
  modalLogIn.style.display = "none";
  helperEmailLogIn.hidden = true;
  helperPasswordLogIn.hidden = true;
  txtEmailLogIn.value = "";
  txtPasswordLogIn.value = "";
  M.updateTextFields();
}

let openNavModalSignUp = () => {
  txtEspecialidad.value = "";
  txtColegiatura.value = "";
  txtDoctorNameSignUp.value = "";
  txtDoctorEmailSignUp.value = "";
  txtDoctorPasswordSignUp.value = "";
  txtDoctorConfirmPasswordSignUp.value = "";
  // para cualquier ocasion está quedando en blanquear las secciones y que solo aparezca la seleccion de usuarios
  sectionUserSelection.style.display = "block";
  optionsDoctors.style.display = "none";
  optionsUsers.style.display = "none";
  sectionSignUpDoctors.style.display = "none";
  sectionSignUpUsers.style.display = "none";
  modalSignUp.style.display = "block";
}

let closeNavModalSignUp = () => {
  modalSignUp.style.display = "none";
}


// login
navBtnLogIn.addEventListener("click", () => openNavModalLogIn());
closeModalLogIn.addEventListener("click", () => closeNavModalLogIn());
// funcion validate debe mandar dos parámetros (email, password)
btnEmailLogIn.addEventListener("click", () => {
  const validate = validateLogIn(txtEmailLogIn.value, txtPasswordLogIn.value);
  showAlertLogIn(validate);
});
btnFacebookLogIn.addEventListener("click", () => facebookAccount());
btnGoogleLogIn.addEventListener("click", () => googleAccount());
goToSignUp.addEventListener("click", () => showSignUp());
miniNavBtnLogIn.addEventListener("click", () => openNavModalLogIn());

// signup
navBtnSignUp.addEventListener("click", () => openNavModalSignUp());
closeModalSignUp.addEventListener("click", () => closeNavModalSignUp());
goToSignUpDoctors.addEventListener("click", (e) => showOptionsUserSelect(e));
goToSignUpUsers.addEventListener("click", (e) => showOptionsUserSelect(e));
miniNavBtnSignUp.addEventListener("click", () => openNavModalSignUp());

// signup doctors
btnModalEmailSignUpDoctors.addEventListener("click", (e) => {
  if (txtColegiatura.value.length > 0 && txtEspecialidad.value.length > 0) {
    helperColegiatura.hidden = true;
    helperEspecialidad.hidden = true;
    signUpUsers(e);
  } else {
    helperColegiatura.hidden = false;
    helperEspecialidad.hidden = false;
  }
});
btnModalFbSignUpDoctors.addEventListener("click", () => {
  if (txtColegiatura.value.length > 0 && txtEspecialidad.value.length > 0) {
    helperColegiatura.hidden = true;
    helperEspecialidad.hidden = true;
    userLocal.type = 'doctor';
    userLocal.specialty = txtEspecialidad.value;
    userLocal.colegiatura = txtColegiatura.value;
    closeNavModalSignUp();
    facebookAccount();
  } else {
    helperColegiatura.hidden = false;
    helperEspecialidad.hidden = false;
  }
});
btnModalGgSignUpDoctors.addEventListener("click", () => {
  if (txtColegiatura.value.length > 0 && txtEspecialidad.value.length > 0) {
    helperColegiatura.hidden = true;
    helperEspecialidad.hidden = true;
    userLocal.type = 'doctor';
    userLocal.specialty = txtEspecialidad.value;
    userLocal.colegiatura = txtColegiatura.value;
    closeNavModalSignUp();
    googleAccount();
  } else {
    helperColegiatura.hidden = false;
    helperEspecialidad.hidden = false;
  }
});

txtDoctorNameSignUp.addEventListener("keyup", () => {
  if (txtDoctorNameSignUp.value.length > 0) {
    helperNameDoctorSignUp.hidden = true;
  } else if (!txtDoctorNameSignUp.value.length > 0) {
    helperNameDoctorSignUp.hidden = false;
  }
});
txtDoctorEmailSignUp.addEventListener("keyup", () => {
  if (txtDoctorEmailSignUp.value.length > 0 && patronEmail.test(txtDoctorEmailSignUp.value)) {
    helperEmailDoctorSignUp.hidden = true;
  } else if (txtDoctorEmailSignUp.value.length === 0 || !patronEmail.test(txtDoctorEmailSignUp.value)) {
    helperEmailDoctorSignUp.hidden = false;
  }
});
txtDoctorPasswordSignUp.addEventListener("keyup", () => {
  if (txtDoctorPasswordSignUp.value.length >= 6) {
    helperPasswordDoctorSignUp.hidden = true;
    password = true;
  } else if (txtDoctorPasswordSignUp.value.length < 6) {
    helperPasswordDoctorSignUp.hidden = false;
    password = false;
  }
});
txtDoctorConfirmPasswordSignUp.addEventListener("keyup", () => {
  if (txtDoctorConfirmPasswordSignUp.value.length >= 6 && txtDoctorConfirmPasswordSignUp.value === txtDoctorPasswordSignUp.value) {
    helperConfirmPasswordDoctorSignUp.hidden = true;
    confirmPassword = true;
  } else if (txtDoctorConfirmPasswordSignUp.value.length < 6 || txtDoctorConfirmPasswordSignUp.value !== txtDoctorPasswordSignUp.value) {
    helperConfirmPasswordDoctorSignUp.hidden = false;
    confirmPassword = false;
  }
});
btnSignUpDoctors.addEventListener("click", () => ableSignUpByDoctors());
goToLogInFromDoctors.addEventListener("click", () => showLogIn());

// signup users
btnModalEmailSignUpUsers.addEventListener("click", (e) => signUpUsers(e));
btnModalFbSignUpUsers.addEventListener("click", () => {
  userLocal.type = 'paciente';
  facebookAccount();
});
btnModalGgSignUpUsers.addEventListener("click", () => {
  userLocal.type = 'paciente';
  googleAccount();
});
txtUserNameSignUp.addEventListener("keyup", () => {
  if (txtUserNameSignUp.value.length > 0) {
    helperNameUserSignUp.hidden = true;
  } else if (!txtUserNameSignUp.value.length > 0) {
    helperNameUserSignUp.hidden = false;
  }
});
txtUserEmailSignUp.addEventListener("keyup", () => {
  if (txtUserEmailSignUp.value.length > 0 && patronEmail.test(txtUserEmailSignUp.value)) {
    helperEmailUserSignUp.hidden = true;
  } else if (txtUserEmailSignUp.value.length === 0 || !patronEmail.test(txtUserEmailSignUp.value)) {
    helperEmailUserSignUp.hidden = false;
  }
});
txtUserPasswordSignUp.addEventListener("keyup", () => {
  if (txtUserPasswordSignUp.value.length >= 6) {
    helperPasswordUserSignUp.hidden = true;
  } else if (txtUserPasswordSignUp.value.length < 6) {
    helperPasswordUserSignUp.hidden = false;
  }
});
txtUserConfirmPasswordSignUp.addEventListener("keyup", () => {
  if (txtUserConfirmPasswordSignUp.value.length >= 6 && txtUserConfirmPasswordSignUp.value === txtUserPasswordSignUp.value) {
    helperConfirmPasswordUserSignUp.hidden = true;
  } else if (txtUserConfirmPasswordSignUp.value.length < 6 || txtUserConfirmPasswordSignUp.value !== txtUserPasswordSignUp.value) {
    helperConfirmPasswordUserSignUp.hidden = false;
  }
});
btnSignUpUsers.addEventListener("click", () => ableSignUpByUsers());
goToLogInFromUsers.addEventListener("click", () => showLogIn());

btnLogOut.addEventListener("click", () => logOut());
sectionMuroFalso.addEventListener("click", () => openNavModalLogIn());

// FUNCIÓN PARA EL MENÚ DESPLEGABLE
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  M.Sidenav.init(elems);
});