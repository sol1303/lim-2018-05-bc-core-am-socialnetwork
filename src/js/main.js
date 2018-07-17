// FUNCIÓN PARA EL MENÚ DESPLEGABLE
document.addEventListener('DOMContentLoaded', function () {
	var elems = document.querySelectorAll('.sidenav');
	var instances = M.Sidenav.init(elems);
});

// FUNCIÓN PARA APARECER SEGPUN TABS
function openCity(evt, cityName) {
	var i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
			tabcontent[i].style.display = "none";
	}
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
			tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
	document.getElementById(cityName).style.display = "block";
	evt.currentTarget.className += " active";
}
// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

// contador de clicks
var clicks = 0;
function clickME() {
	clicks += 1;
	document.getElementById("clicks").innerHTML = clicks;
}

// crear elemento
// let post = document.getElementById("defaultOpen");

// post.addEventListener("click", () => {
// 	const prueba = document.getElementById("London");
// 	prueba.innerHTML += "<div class='row'><div class='col s12 m9'><div class='card'><div class='card-content black-text'><span class='card-title'>John Smith</span><p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p></div><div class='card-action'><a class='heart' onClick='clickME()'><i class='material-icons'>favorite</i></a><a id='clicks'>0</a><a>Comentario</a></div></div></div></div>"
// 	prueba.innerHTML += "<div class='row'><div class='col s12 m9'><div class='card'><div class='card-content black-text'><span class='card-title'>John Smith</span><p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p></div><div class='card-action'><a class='heart' onClick='clickME()'><i class='material-icons'>favorite</i></a><a id='clicks'>0</a><a>Comentario</a></div></div></div></div>"
// 	prueba.innerHTML += "<div class='row'><div class='col s12 m9'><div class='card'><div class='card-content black-text'><span class='card-title'>John Smith</span><p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p></div><div class='card-action'><a class='heart' onClick='clickME()'><i class='material-icons'>favorite</i></a><a id='clicks'>0</a><a>Comentario</a></div></div></div></div>"
// 	prueba.innerHTML += "<div class='row'><div class='col s12 m9'><div class='card'><div class='card-content black-text'><span class='card-title'>John Smith</span><p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p></div><div class='card-action'><a class='heart' onClick='clickME()'><i class='material-icons'>favorite</i></a><a id='clicks'>0</a><a>Comentario</a></div></div></div></div>"
// 	prueba.innerHTML += "<div class='row'><div class='col s12 m9'><div class='card'><div class='card-content black-text'><span class='card-title'>John Smith</span><p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p></div><div class='card-action'><a class='heart' onClick='clickME()'><i class='material-icons'>favorite</i></a><a id='clicks'>0</a><a>Comentario</a></div></div></div></div>"
// 	prueba.innerHTML += "<div class='row'><div class='col s12 m9'><div class='card'><div class='card-content black-text'><span class='card-title'>John Smith</span><p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p></div><div class='card-action'><a class='heart' onClick='clickME()'><i class='material-icons'>favorite</i></a><a id='clicks'>0</a><a>Comentario</a></div></div></div></div>"

// });
