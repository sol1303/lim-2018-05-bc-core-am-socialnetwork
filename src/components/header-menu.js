// header tendra header y los tabs btn salir

headerMenu = `
<nav>
	<img class="center" src="../img/logo.png" alt="Logo">
	<a data-target="slide-out" class="sidenav-trigger menu-initial left">
		<i class="material-icons">menu</i>
	</a>
	<ul id="nav-mobile" class="right hide-on-med-and-down">
		<li>
			<a id="header-nav-log-out" class="right">Cerrar sesión</a>
		</li>
	</ul>
	<div class="tab">
		<button class="tablink" id="linkHome">Inicio</button>
		<button class="tablink" id="linkHospital">Clínicas - Hospitales</button>
		<button class="tablink" id="linkSearch">Buscar</button>
		<button class="tablink" id="linkProfileUser">Perfil</button>
	</div>
</nav>
<ul id="slide-out" class="sidenav">
	<img class="center" src="../img/logo-turquesa.png" alt="Logo">
	<li>
		<a id="mini-nav-modal-home">
			<i class="material-icons">home</i>Inicio</a>
	</li>
	<li>
		<a id="mini-nav-modal-hospital">
			<i class="material-icons">local_hospital</i>Clínicas - Hospitales</a>
	</li>
	<li>
		<a id="mini-nav-modal-search">
			<i class="material-icons">search</i>Buscar</a>
	</li>
	<li>
		<a id="mini-nav-modal-profile-user">
			<i class="material-icons">account_circle</i>Perfil</a>
	</li>
	<li>
		<a id="mini-nav-modal-log-out">
			<i class="material-icons">exit_to_app</i>Salir</a>
	</li>
</ul>
`;
