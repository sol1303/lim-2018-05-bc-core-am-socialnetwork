let muroTabs =
	`<div class="row">
<div class="col s12 m9">
  <div class="card">
    <div class="card-content black-text">
      <div class="row tab-content col s12">
        <div class="col s2">
        <img src="../img/profile.png" class="image-post">
        </div>
        <div class="input-field col s10">
          <textarea id="textarea" row="2" class="materialize-textarea"></textarea>
          <label for="textarea" class="">¿Que tienes en mente?</label>
        </div>
      </div>
      <div class="row">
        <div class="col s12 m6 right">
          <a class="dropdown-trigger btn" data-target="dropdown">
            <i class="material-icons left">language</i>PUBLICO</a>
          <ul id="dropdown" class="dropdown-content">
            <li>
              <a>
                <i class="material-icons">language</i>PÚBLICO</a>
            </li>
            <li>
              <a>
                <i class="material-icons">face</i>AMIGOS</a>
            </li>
          </ul>
          <a class="waves-effect waves-light btn">
            <i class="mdi-maps-rate-review left"></i>Post</a>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
<div class="row">
<div class="col s12 m9">
  <div class="card">
    <div class="card-content black-text">
      <span class="card-title">John Smith</span>
      <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require
        little markup to use effectively.</p>
    </div>
    <div class="card-action">
      <a class="heart" onClick="clickME()">
        <i class="material-icons">favorite</i>
      </a>
      <a class="post-likes">0</a>
      <a>Comentario</a>
    </div>
  </div>
</div>
</div>
<div class="row">
<div class="col s12 m9">
  <div class="card">
    <div class="card-content black-text">
      <div class="col s12 m6 right">
        <a class="dropdown-trigger right" href="#" data-target="dropdown1">
          <i class="material-icons left">more_vert</i>
        </a>
        <ul id="dropdown1" class="dropdown-content">
          <li>
            <a>
              <i class="material-icons">mode_edit</i>Editar</a>
          </li>
          <li>
            <a>
              <i class="material-icons">cloud</i>Eliminar</a>
          </li>
        </ul>
      </div>
      <span class="card-title">John Smith</span>
      <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require
        little markup to use effectively.</p>
    </div>
    <div class="card-action">
      <a class="heart" onClick="clickME2()">
        <i class="material-icons">favorite</i>
      </a>
      <a class="post-likes">0</a>
      <a>Comentario</a>
    </div>
  </div>
</div>
</div>`;