const config = {
  apiKey: "AIzaSyADhe8BrL2a1vVRQnECNe4np96pxkwgoSw",
  authDomain: "salutem-a2461.firebaseapp.com",
  databaseURL: "https://salutem-a2461.firebaseio.com",
  projectId: "salutem-a2461",
  storageBucket: "salutem-a2461.appspot.com",
  messagingSenderId: "953244358481"
};

firebase.initializeApp(config);

// PINTA HEADER
const menuHeader = document.getElementById("menu-header");
menuHeader.innerHTML = headerHtml;
// PINTA MURO
const tabWall = document.getElementById("principal-tab");
tabWall.innerHTML = muroTabs;

// CLICK EN INICIO Y PINTA MURO
document.getElementById("defaultOpen").addEventListener("click", () => {
tabWall.innerHTML = muroTabs;
});
document.getElementById("nav-wall").addEventListener("click", () => {
tabWall.innerHTML = muroTabs;
});
// CLICK EN LISTA DE HOSPITALES Y PINTA LISTA
document.getElementById("tab-list-clinic").addEventListener("click", () => {
const tabListClinic = document.getElementById("principal-tab");
tabListClinic.innerHTML = tableClinic;
});
document.getElementById("nav-list-clinic").addEventListener("click", () => {
const tabListClinic = document.getElementById("principal-tab");
tabListClinic.innerHTML = tableClinic;
});

// CLICK EN RECOMENDACIONES Y PINTA POST DE DOCTORES
document.getElementById("tab-doctor-post").addEventListener("click", () => {
const tabPostDoctor = document.getElementById("principal-tab");
tabPostDoctor.innerHTML = tabDoctor;
});
document.getElementById("nav-doctor-post").addEventListener("click", () => {
const tabPostDoctor = document.getElementById("principal-tab");
tabPostDoctor.innerHTML = tabDoctor;
});


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
