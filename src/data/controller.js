const txtEmailLogIn = document.getElementById("txt-user-mail-login");
const txtPasswordLogIn = document.getElementById("txt-user-password-login");

const btnLogIn = document.getElementById("btn-email-log-in");

const miniNavBtnLogIn = document.getElementById("mini-nav-modal-log-in");
const modalLogIn = document.getElementById("modal-log-in");

const alertErrorEmail = document.getElementById("incorrect-email");
const alertErrorPassword = document.getElementById("incorrect-password");


const logIn = () => {
  const auth = firebase.auth();
	const promise = auth.signInWithEmailAndPassword(txtEmailLogIn.value, txtPasswordLogIn.value)
	.then(() => console.log("entro sesion"))
	promise.catch(e => {
    alertErrorPassword.hidden = false;
    console.log(e);
  });
}

const funcion = (validate) => {
  if (validate.email) 
    alertErrorEmail.hidden = true;
  else alertErrorEmail.hidden = false;

  if (validate.password) alertErrorPassword.hidden = true;
  else alertErrorPassword.hidden = false;

  if (validate.email && validate.password) logIn();
}


btnLogIn.addEventListener("click", () => {
  const validate = validateLogIn(txtEmailLogIn.value, txtPasswordLogIn.value);
  funcion(validate);
});
