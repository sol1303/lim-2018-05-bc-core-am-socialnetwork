// post
const postUser = document.getElementById("textarea-post-user");
const btnPublic = document.getElementById("btn-publicar");
const bodyPosts = document.getElementById("section_posts");

// COMPONENTE HEADER
const menuHeader = document.getElementById("menu-header");
// menuHeader.innerHTML = headerHtml;
menuHeader.innerHTML = headerMenu; //components/header-menu

//al cargar el menu del componente header se trae los botones btn salir menu grande
const miniBtnLogout = document.getElementById("mini-nav-modal-log-out");
miniBtnLogout.addEventListener("click", () => {
  firebase.auth().signOut().then(() => {
    window.location.href = '../../src/'
  })
});

//al cargar el menu del componente header se trae los botones btn salir menu desplegable
const logOut = document.getElementById("header-nav-log-out");
logOut.addEventListener("click", () => {
  firebase.auth().signOut().then(() => {
    window.location.href = '../../src/'
  })
});
// COMPONENTE LISTA DE HOSPITALES
const tabParis = document.getElementById("Paris");
tabParis.innerHTML = tableClinic;

// FUNCIÓN PARA EL MENÚ DESPLEGABLE
document.addEventListener('DOMContentLoaded', function () {
  const elems = document.querySelectorAll('.sidenav');
  M.Sidenav.init(elems);
});

// FUNCIÓN PARA APARECER SEGUN TABS
const openCity = (evt, cityName) => {
  let i, tabcontent, tablinks;
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

//FUNCION PARA CREAR POST Y GUARDAR EN DATABASE DE FIREBASE
function makePost() {
  const x = firebase.auth().currentUser;
  let datePosted = new Date();
  let posts = {
    fecha: datePosted,
    description: postUser.value,
    uid: x.uid
  }
  var key = firebase.database().ref().child('users').push().key;
  posts.idPost = key;
  var updates = {};
  updates['/post/' + key] = posts;
  updates['/users/' + x.uid + '/posts/' + key] = posts;
  firebase.database().ref().update(updates)
};

window.onload = () => {
  var elems = document.querySelectorAll('.dropdown-trigger');
  var instances = M.Dropdown.init(elems);
  mostrarAllPost()
}
// FUNCION PARA MOSTRAR POST EN INTERFAZ
const mostrarAllPost = () => {
  let cont = 0;
  let ref = firebase.database();
  ref.ref('/post')
    .on('child_added', (newPost) => {
      var post = newPost.val();
      cont++;
      ref.ref('/users/' + post.uid).once('value').then((snapshot) => {
        var username = (snapshot.val().username) || 'Anonymous';
        bodyPosts.innerHTML += ` 
        <div class="row" id="${post.idPost}">
          <div class="col s12 m9">
            <div class="card">
              <div class="card-content black-text">
                <div class="col s12 m6 right">
                  <a class="dropdown-trigger right" href="#" data-target="dropdown${cont}">
                    <i class="material-icons left">more_vert</i>
                  </a>
                  <ul id="dropdown${cont}" class="dropdown-content">
                    <li data-idpost="${post.idPost}"  onclick="editPost(this) ">
                      <a >
                        <i class="material-icons">mode_edit</i>Editar</a>
                    </li >
                    <li data-idpost="${post.idPost}"  onclick="deletePost(this)">
                      <a>
                        <i class="material-icons">cloud</i>Eliminar</a>
                    </li>
                  </ul>
                </div>
                <span class="card-title">${username}</span>
                <p class="${post.idPost}">
                  ${post.description}
                </p>
                <textarea class="dnone materialize-textarea ${post.idPost}" row="2">${post.description}</textarea>

              </div>
              <div class="card-action">
                <a class="heart">
                  <i class="material-icons ${post.idPost}" onclick="likePost(this)">favorite</i>
                </a>
                <a class="post-likes">${post.countLike ? post.countLike : 0}</a>
                <a>Comentario</a>
                <a id="${post.idPost}" onclick="savePost(this)" class="dnone waves-effect waves-light btn">
                  <i class="mdi-maps-rate-review left" type="button"></i>Guardar
                </a>
              </div>
            </div>
          </div>
        </div>
    `;
        var elems = document.querySelectorAll('#section_posts .dropdown-trigger');
        var instances = M.Dropdown.init(elems);
      });


    })
}
// FUNCION QUE PERMITE ELIMINAR POST
function deletePost(post) {
  let postId = post.dataset.idpost,
    postBlock = document.querySelector("div#" + postId);
  const x = firebase.auth().currentUser;
  var updates = {};
  updates['/post/' + postId] = null;
  updates['/users/' + x.uid + '/posts/' + postId] = null;
  //Aparece mensaje de confirmación para eliminiacion del mensaje
  swal({
      title: "Está Seguro que desea eliminar esta publicación?",
      text: "Puedes editar esta publicación si quieres cambiar algo.!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        firebase.database().ref().update(updates, function (error) {
          if (error) {
            alert("No se pudo eliminar")
          } else {
            postBlock.parentNode.removeChild(postBlock);
            swal("Tu archivo ha sido eliminado!", {
              icon: "success",
            });
          }
        })

      }
    });

}
// FUNCION QUE PERMITE EDITAR PUBLICACION
function editPost(post) {
  console.log(post)
  let postId = post.dataset.idpost,
    postP = document.querySelector("p." + postId),
    saveButton = document.querySelector("a#" + postId),
    postTextArea = document.querySelector("textarea." + postId);
  //mostrar text area y oculpar p tag
  postP.style.display = "none";
  postTextArea.style.display = "block";
  saveButton.style.display = "inline-block";

}
// FUNCION QUE PERMITE GUARDAR  EN FIREBASE PUBLICACION EDITADA
function savePost(post) {
  let postId = post.attributes["0"].value,
    newPost = document.querySelector("textarea." + postId).value;
  const x = firebase.auth().currentUser;
  let dateUpdated = new Date();
  let newPostValues = {
    fecha: dateUpdated,
    idPost: postId,
    description: newPost,
    uid: x.uid
  }
  var updates = {};
  updates['/post/' + postId] = newPostValues;
  updates['/users/' + x.uid + '/posts/' + postId] = newPostValues;
  firebase.database().ref().update(updates, function (error) {
    if (error) {
      alert("Ocurrio un error, intentelo mas tarde!");
    } else {
      let postP = document.querySelector("p." + postId),
        saveButton = document.querySelector("a#" + postId),
        posTextArea = document.querySelector("textarea." + postId);
      postP.innerText = newPost;
      posTextArea.innerHTML = newPost;
      postP.style.display = "block";
      posTextArea.style.display = "none";
      saveButton.style.display = "none";
    }
  })

}

function likePost(favorite) {
  const x = firebase.auth().currentUser;
  let cantLikes = parseInt(favorite.parentNode.nextElementSibling.innerText) + 1;
  let like = {
    countLike: cantLikes
  };

  var updates = {};
  updates['/post/' + favorite.classList[1] + '/countLike'] = cantLikes;
  updates['/users/' + x.uid + '/posts/' + favorite.classList[1] + '/countLike'] = cantLikes;
  firebase.database().ref().update(updates, function (error) {
    if (error) {
      alert("Ocurrio un error, intentelo mas tarde!");
    } else {
      favorite.style.color = 'red';
      favorite.parentNode.nextElementSibling.innerText = cantLikes;
    }
  })

}


btnPublic.addEventListener("click", function () {
  makePost()
  postUser.value = "";
});
