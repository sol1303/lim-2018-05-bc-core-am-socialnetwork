let headerHtml =
  `<div class="navbar-fixed">
	<nav>
		<img class="center" src="../img/logo.png" alt="Logo">
		<a data-target="slide-out" class="sidenav-trigger menu-initial left">
			<i class="material-icons">menu</i>
		</a>
		<ul id="nav-mobile" class="right hide-on-med-and-down">
			<li id="search-menu">
				<div id="topbarsearch">
					<div class="input-field">
						<i class="material-icons prefix">search</i>
						<input type="text" placeholder="Busca en Salutem" id="autocomplete-input" class="autocomplete red-text">
					</div>
				</div>
			</li>
			<li>
				<a id="header-nav-log-out" class="right">Cerrar sesión</a>
			</li>
		</ul>
		<div class="tab">
			<button id="defaultOpen">Generales</button>
			<button id="tab-list-clinic">Clínicas / Hospitales</button>
			<button id="tab-doctor-post">Recomendaciones de Doctores</button>
		</div>
	</nav>
	<ul id="slide-out" class="sidenav">
		<li>
			<div class="user-view">
				<div class="background">
				</div>
				<a><img class="circle" src="../img/profile.png"></a>
				<a><span class="black-text name">John Doe</span></a>
			</div>
		</li>
		<li>
			<a class="tablinks" id="nav-wall">Inicio</a>
		</li>
		<li>
			<div class="divider"></div>
		</li>
		<li>
			<a class="tablinks" id="nav-list-clinic">Clínicas / Hospitales</a>
		</li>
		<li>
			<div class="divider"></div>
		</li>
		<li>
			<a class="tablinks" id="nav-doctor-post">Recomendaciones de Doctores</a>
		</li>
		<li>
			<div class="divider"></div>
		</li>
		<li>
			<a class="waves-effect" id="nav-side-log-out">Cerrar Sesión</a>
		</li>
	</ul>
</div>`;
