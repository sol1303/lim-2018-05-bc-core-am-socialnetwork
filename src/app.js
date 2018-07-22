// sections que están generales
const sectionHeader = document.getElementById("header-main");
sectionHeader.innerHTML = headerMain; //obtiene la seccion en que pintara y la une con el codigo del componente

const sectionMuroFalso = document.getElementById("muro-falso");
sectionMuroFalso.innerHTML = muroFalso; //obtiene la seccion en que pintara y la une con el codigo del componente

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
const selectEspecialidad = document.getElementById("select_especialidad")
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
  type: 'paciente',
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

const showAlertEspecificDoctor = (validate, e) => {
  if (validate.especialidad) helperEspecialidad.hidden = true;
  else helperEspecialidad.hidden = false;

  if (validate.colegiatura) helperColegiatura.hidden = true;
  else helperColegiatura.hidden = false;

  if (validate.especialidad && validate.colegiatura) {
    if (e.currentTarget.id === "btn-email-modal-sign-up-doctors") signUpUsers(e);
    else if (e.currentTarget.id === "btn-gg-modal-sign-up-doctors") {
      userLocal.type = 'doctor';
      userLocal.specialty = selectEspecialidad.options[selectEspecialidad.selectedIndex].value;
      userLocal.colegiatura = txtColegiatura.value;
      googleAccount();
    } else if (e.currentTarget.id === "btn-fb-modal-sign-up-doctors") {
      userLocal.type = 'doctor';
      userLocal.specialty = selectEspecialidad.options[selectEspecialidad.selectedIndex].value;
      userLocal.colegiatura = txtColegiatura.value;
      facebookAccount();
    }
  }
}

const signUpByDoctors = (name, email, pass, especialidad, colegiatura) => {
  const auth = firebase.auth();
  const promise = auth.createUserWithEmailAndPassword(email, pass).then(() => {
    const x = firebase.auth().currentUser;
    isProcessing = true;
    if (x) {
      writeUserDbFirebase(x.uid, name, x.email, 'doctor', especialidad, colegiatura, null);
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

const signUpByUsers = (name, email, pass) => {
  const auth = firebase.auth();
  const promise = auth.createUserWithEmailAndPassword(email, pass).then(() => {
    const x = firebase.auth().currentUser;
    isProcessing = true;
    if (x) {
      writeUserDbFirebase(x.uid, name, x.email, 'paciente', null, null, null);
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

//validaciones de signup divisiones para pacientes y doctores
const showAlertSignUpUsers = (validate, e) => {
  // para pacientes
  if (e.currentTarget.id === "btn-sign-up-users") {
    if (validate.name) helperNameUserSignUp.hidden = true;
    else helperNameUserSignUp.hidden = false;

    if (validate.email) helperEmailUserSignUp.hidden = true;
    else helperEmailUserSignUp.hidden = false;

    if (validate.password) helperPasswordUserSignUp.hidden = true;
    else helperPasswordUserSignUp.hidden = false;

    if (validate.confirm_password) helperConfirmPasswordUserSignUp.hidden = true;
    else helperConfirmPasswordUserSignUp.hidden = false;

    if (validate.name && validate.email && validate.password && validate.confirm_password) {
      signUpByUsers(txtUserNameSignUp.value, txtUserEmailSignUp.value, txtUserPasswordSignUp.value);
    }
  } else { //para doctores
    if (validate.name) helperNameDoctorSignUp.hidden = true;
    else helperNameDoctorSignUp.hidden = false;

    if (validate.email) helperEmailDoctorSignUp.hidden = true;
    else helperEmailDoctorSignUp.hidden = false;

    if (validate.password) helperPasswordDoctorSignUp.hidden = true;
    else helperPasswordDoctorSignUp.hidden = false;

    if (validate.confirm_password) helperConfirmPasswordDoctorSignUp.hidden = true;
    else helperConfirmPasswordDoctorSignUp.hidden = false;

    if (validate.name && validate.email && validate.password && validate.confirm_password) {
      signUpByDoctors(txtDoctorNameSignUp.value, txtDoctorEmailSignUp.value, txtDoctorPasswordSignUp.value, selectEspecialidad.options[selectEspecialidad.selectedIndex].value, txtColegiatura.value);
    }
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
  firebase.auth().signInWithPopup(provider).then(result => {
    let fireUser = result.user;
    updateUserByProvider(fireUser.uid, fireUser.displayName, fireUser.email, fireUser.photoURL);
  }).catch(error => {
    console.log(error.message);
  });
}

const facebookAccount = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  isProcessing = true;
  firebase.auth().signInWithPopup(provider).then(result => {
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
miniNavBtnLogIn.addEventListener("click", () => {
  closeNavModalSignUp();
  openNavModalLogIn();
});

// signup
navBtnSignUp.addEventListener("click", () => openNavModalSignUp());
closeModalSignUp.addEventListener("click", () => closeNavModalSignUp());
goToSignUpDoctors.addEventListener("click", (e) => showOptionsUserSelect(e));
goToSignUpUsers.addEventListener("click", (e) => showOptionsUserSelect(e));
miniNavBtnSignUp.addEventListener("click", () => {
  closeNavModalLogIn();
  openNavModalSignUp();
});

// signup doctors
btnModalEmailSignUpDoctors.addEventListener("click", (e) => {
  const validate = validateEspecificDoctor(selectEspecialidad.options[selectEspecialidad.selectedIndex].value, txtColegiatura.value);
  showAlertEspecificDoctor(validate, e);
});
btnModalFbSignUpDoctors.addEventListener("click", (e) => {
  const validate = validateEspecificDoctor(selectEspecialidad.options[selectEspecialidad.selectedIndex].value, txtColegiatura.value);
  showAlertEspecificDoctor(validate, e);
});
btnModalGgSignUpDoctors.addEventListener("click", (e) => {
  const validate = validateEspecificDoctor(selectEspecialidad.options[selectEspecialidad.selectedIndex].value, txtColegiatura.value);
  showAlertEspecificDoctor(validate, e);
});

btnSignUpDoctors.addEventListener("click", (e) => {
  const validate = validateFormSignUpUsers(txtDoctorNameSignUp.value, txtDoctorEmailSignUp.value, txtDoctorPasswordSignUp.value, txtDoctorConfirmPasswordSignUp.value);
  showAlertSignUpUsers(validate, e);
});
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

btnSignUpUsers.addEventListener("click", (e) => {
  const validate = validateFormSignUpUsers(txtUserNameSignUp.value, txtUserEmailSignUp.value, txtUserPasswordSignUp.value, txtUserConfirmPasswordSignUp.value);
  showAlertSignUpUsers(validate, e);
});
goToLogInFromUsers.addEventListener("click", () => showLogIn());
sectionMuroFalso.addEventListener("click", () => openNavModalLogIn());

// FUNCIÓN PARA EL MENÚ DESPLEGABLE
document.addEventListener('DOMContentLoaded', () => {
  var elems = document.querySelectorAll('.sidenav');
  M.Sidenav.init(elems);
});
