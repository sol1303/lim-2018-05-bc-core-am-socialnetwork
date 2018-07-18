const config = {
  apiKey: "AIzaSyADhe8BrL2a1vVRQnECNe4np96pxkwgoSw",
  authDomain: "salutem-a2461.firebaseapp.com",
  databaseURL: "https://salutem-a2461.firebaseio.com",
  projectId: "salutem-a2461",
  storageBucket: "salutem-a2461.appspot.com",
  messagingSenderId: "953244358481"
};

firebase.initializeApp(config);

// COMPONENTE HEADER
const menuHeader = document.getElementById("menu-header");
menuHeader.innerHTML = headerHtml;
// COMPONENTE GENERAL (POSTEAR Y PUBLICACIONES)
// const tabLondon = document.getElementById("London");
// tabLondon.innerHTML = muroTabs;
// COMPONENTE LISTA DE HOSPITALES
const tabParis = document.getElementById("Paris");
tabParis.innerHTML = tableClinic;

const logOut = document.getElementById("header-nav-log-out");
logOut.addEventListener("click", () => {
  firebase.auth().signOut().then(() => {
    window.location.href = '../../src/'
  })
});

// FUNCIÓN PARA EL MENÚ DESPLEGABLE
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
});

// FUNCIÓN PARA APARECER SEGUN TABS
function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName('tabcontent');
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none';
  }
  tablinks = document.getElementsByClassName('tablinks');
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(' active', '');
  }
  document.getElementById(cityName).style.display = 'block';
  evt.currentTarget.className += ' active';
}
// Get the element with id='defaultOpen' and click on it
document.getElementById('defaultOpen').click();

// contador de clicks
var clicks = 0;

function clickME() {
  clicks += 1;
  document.getElementsByClassName('post-likes')[0].innerHTML = clicks;
}

function clickME2() {
  clicks += 1;
  document.getElementsByClassName('post-likes')[1].innerHTML = clicks;
}

// dropdown bottom post
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.dropdown-trigger');
  var instances = M.Dropdown.init(elems);
});


// crear elemento
// let post = document.getElementById('defaultOpen');

// post.addEventListener('click', () => {
// 	const prueba = document.getElementById('London');
// 	prueba.innerHTML += '<div class='row'><div class='col s12 m9'><div class='card'><div class='card-content black-text'><span class='card-title'>John Smith</span><p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p></div><div class='card-action'><a class='heart' onClick='clickME()'><i class='material-icons'>favorite</i></a><a id='clicks'>0</a><a>Comentario</a></div></div></div></div>'
// 	prueba.innerHTML += '<div class='row'><div class='col s12 m9'><div class='card'><div class='card-content black-text'><span class='card-title'>John Smith</span><p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p></div><div class='card-action'><a class='heart' onClick='clickME()'><i class='material-icons'>favorite</i></a><a id='clicks'>0</a><a>Comentario</a></div></div></div></div>'
// 	prueba.innerHTML += '<div class='row'><div class='col s12 m9'><div class='card'><div class='card-content black-text'><span class='card-title'>John Smith</span><p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p></div><div class='card-action'><a class='heart' onClick='clickME()'><i class='material-icons'>favorite</i></a><a id='clicks'>0</a><a>Comentario</a></div></div></div></div>'
// 	prueba.innerHTML += '<div class='row'><div class='col s12 m9'><div class='card'><div class='card-content black-text'><span class='card-title'>John Smith</span><p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p></div><div class='card-action'><a class='heart' onClick='clickME()'><i class='material-icons'>favorite</i></a><a id='clicks'>0</a><a>Comentario</a></div></div></div></div>'
// 	prueba.innerHTML += '<div class='row'><div class='col s12 m9'><div class='card'><div class='card-content black-text'><span class='card-title'>John Smith</span><p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p></div><div class='card-action'><a class='heart' onClick='clickME()'><i class='material-icons'>favorite</i></a><a id='clicks'>0</a><a>Comentario</a></div></div></div></div>'
// 	prueba.innerHTML += '<div class='row'><div class='col s12 m9'><div class='card'><div class='card-content black-text'><span class='card-title'>John Smith</span><p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p></div><div class='card-action'><a class='heart' onClick='clickME()'><i class='material-icons'>favorite</i></a><a id='clicks'>0</a><a>Comentario</a></div></div></div></div>'

// });
