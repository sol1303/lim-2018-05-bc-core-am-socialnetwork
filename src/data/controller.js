const txtName = document.getElementById("txt-user-name-signup");
const txtEmail = document.getElementById("txt-user-mail-signup");
const txtPassword = document.getElementById("txt-user-password-signup");
const txtConfirmPass = document.getElementById("txt-user-confirm-password-signup");
const btnSignUp = document.getElementById("btn-sign-up-users");
const helperNameUserSignUp = document.getElementById("incorrect-user-name-sign-up");
const helperEmailUserSignUp = document.getElementById("incorrect-user-email-sign-up");
const helperPasswordUserSignUp = document.getElementById("incorrect-user-password-sign-up");
const helperConfirmPasswordUserSignUp = document.getElementById("incorrect-user-confirm-password-sign-up");

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

const showAlertSignUpUsers = (validate) => {
	if (validate.name) helperNameUserSignUp.hidden = true;
	else helperNameUserSignUp.hidden = false;

	if (validate.email) helperEmailUserSignUp.hidden = true;
	else helperEmailUserSignUp.hidden = false;

	if (validate.password) helperPasswordUserSignUp.hidden = true;
	else helperPasswordUserSignUp.hidden = false;

	if (validate.confirm_password) helperConfirmPasswordUserSignUp.hidden = true;
	else helperConfirmPasswordUserSignUp.hidden = false;

	if (validate.name && validate.email && validate.password && validate.confirm_password) signUpByDoctors(txtName.value, txtEmail.value, txtPassword.value);
}

btnSignUp.addEventListener("click", () => {
  const validate = validateFormSignUpUsers(txtName.value, txtEmail.value, txtPassword.value, txtConfirmPass.value);
  showAlertSignUpUsers(validate);
});
