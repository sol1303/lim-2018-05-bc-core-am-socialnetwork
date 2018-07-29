const headerWall = document.getElementById("menu-header");
headerWall.innerHTML = headerMenu;

const logOut = document.getElementById("header-nav-log-out");
const miniBtnLogout = document.getElementById("mini-nav-modal-log-out");
const tabHome = document.getElementById("linkHome");
const tabHospital = document.getElementById("linkHospital");
const tabProfileUser = document.getElementById("linkProfileUser");
const tabSearch = document.getElementById("linkSearch");
const miniTabHome = document.getElementById("mini-nav-modal-home");
const miniTabHospital = document.getElementById("mini-nav-modal-hospital");
const miniTabProfileUser = document.getElementById("mini-nav-modal-profile-user");
const miniTabSearch = document.getElementById("mini-nav-modal-search");
const sectionHome = document.getElementById("section-home");
const sectionHospital = document.getElementById("section-hospital");
const sectionProfileUser = document.getElementById("section-profile-user");
const sectionSearch = document.getElementById("section-search");

// FUNCIÓN PARA EL MENÚ DESPLEGABLE
document.addEventListener('DOMContentLoaded', function () {
  const elems = document.querySelectorAll('.sidenav');
  M.Sidenav.init(elems);
});

// post
const postUser = document.querySelectorAll("#textarea-post-user");
const btnPublic = document.querySelectorAll("#btn-publicar");
const bodyPostInicio = document.getElementById("section_posts");
const bodyPostProfile = document.getElementById("section_posts_profile");
const selectPrivacity = document.getElementById("select-privacity");
let bodyPosts;
let privacityPost = null;
let ref_ = '';
const tabHomeDescription = () => {
  hideElementsTab([sectionSearch, sectionHospital, sectionProfileUser])
  showElementTab(sectionHome);
  
}
const tabHospitalDescription = () => {
  hideElementsTab([sectionSearch, sectionHome, sectionProfileUser])
  showElementTab(sectionHospital);
}
const tabProfileUserDescription = () => {
  hideElementsTab([sectionHospital, sectionHome, sectionSearch])
  showElementTab(sectionProfileUser); 
} 
const tabSearchDescription = () => {
  hideElementsTab([sectionHospital, sectionHome, sectionProfileUser])
  showElementTab(sectionSearch);
}

const showElementTab = (element) => {
  element.style.display = "block";
  element.className += " active";
}
const hideElementsTab = (arr) => {
  arr.forEach(element => {
    element.style.display ="none";
    let classes = element.className.replace("active", "");
    element.className = classes;
  });
}
logOut.addEventListener("click", () => {
  firebase.auth().signOut().then(() => {
    window.location.href = '../../src/'
  })
});

miniBtnLogout.addEventListener("click", () => {
  firebase.auth().signOut().then(() => {
    window.location.href = '../../src/'
  })
});

// funciones firebase

//FUNCION PARA CREAR POST Y GUARDAR EN DATABASE DE FIREBASE
const makePost = (postUserTxt) => {
  const x = firebase.auth().currentUser;
  let datePosted = new Date();
  let posts = {
    created_at: datePosted,
    description: postUserTxt.value,
    uid: x.uid,
    privacity: privacityPost
  }
  const key = firebase.database().ref().child('users').push().key;
  posts.idPost = key;
  let updates = {};
  updates['/post/' + key] = posts;
  updates['/users/' + x.uid + '/posts/' + key] = posts;
  firebase.database().ref().update(updates)
};

window.onload = () => {
  // let elems = document.querySelectorAll('.dropdown-trigger');
  // M.Dropdown.init(elems);
  mostrarAllPost();
  setTimeout( () =>{
    mostrarAllPostPorfile()
  }, 1000)
}
// FUNCION PARA MOSTRAR POST EN INTERFAZ
const mostrarAllPost = () => {
  let cont = 0;
  let ref = firebase.database().ref('/post');
  const printPost = (newPost) => {
    //bodyPostInicio.innerHTML = '';
    var post = newPost.val();
    let x = firebase.auth().currentUser,
      uuid = x.uid;
    firebase.database().ref('/users/' + post.uid).once('value').then((snapshot) => {
      cont++;
      var username = (snapshot.val().username) || 'Anonymous';
      bodyPostInicio.innerHTML = `
      <div id="${post.idPost}">
        <div class="col s12 m9">
          <div class="card">
            <div class="card-content black-text">
              <div class="col s12 m6 right">
                <a class="dropdown-trigger right" href="#" data-target="dropdown${cont}">
                  <i class="material-icons left ${uuid == post.uid ? "dblock" : "dnone"}">more_vert</i>
                </a>
                <ul id="dropdown${cont}" class="dropdown-content">
                  <li data-idpost="${post.idPost}" data-iduser="${post.uid}" onclick="editPost(this, '#section_posts') ">
                    <a >
                      <i class="material-icons">mode_edit</i>Editar</a>
                  </li >
                  <li data-idpost="${post.idPost}" data-iduser="${post.uid}" onclick="deletePost(this, '#section_posts')">
                    <a>
                      <i class="material-icons">delete</i>Eliminar</a>
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
                <i class="material-icons ${post.idPost}" onclick="likePost(this)" style="${post.whoMakeLikes ? post.whoMakeLikes[uuid] ? 'color:red' : 'color:#ffab40' : null}">favorite_border</i>
              </a>
              <a class="post-likes">${post.countLike ? post.countLike : 0}</a>
              <a>Comentario</a>
              <a id="${post.idPost}" onclick="savePost(this, '#section_posts')" class="dnone waves-effect waves-light btn">
                <i class="mdi-maps-rate-review left">Guardar</i>
              </a>
            </div>
          </div>
        </div>
      </div>
  `+bodyPostInicio.innerHTML;
    let elems = document.querySelectorAll('#section_posts .dropdown-trigger');
    M.Dropdown.init(elems);
    });
  }

  ref.on('child_added', printPost);
  ref.on('child_changed', data=>{
    let postIdToUpdate = data.val().idPost;
    let uuid = firebase.auth().currentUser.uid;
    let postP = document.querySelector("#section_posts_profile p."+postIdToUpdate),
        postTextArea = document.querySelector("#section_posts_profile textarea."+postIdToUpdate),
        postLikeCounter = document.querySelector("#section_posts_profile div#"+postIdToUpdate +" a.post-likes"),
        heartLike = document.querySelector("#section_posts_profile i."+postIdToUpdate);
        
        postP.innerText = data.val().description;
        postTextArea.innerHTML = data.val().description;
        postLikeCounter.innerText = data.val().countLike || 0;
        data.val().whoMakeLikes ? data.val().whoMakeLikes[uuid] ? heartLike.style.cssText = "color:red;" : heartLike.style.cssText  = "color:#ffab40;" : heartLike.style.cssText = "color:#ffab40;";
        debugger;
  });
  ref.on('child_removed', (data) =>{
    let postBlock = document.querySelector("#section_posts_profile div#" + data.val().idPost);
    postBlock.parentNode.removeChild(postBlock);
  })
}

const mostrarAllPostPorfile = () => {

  let x__ = firebase.auth().currentUser;
  ref_ = '/users/'+x__.uid+'/posts'
  let cont = 0;
  let ref = firebase.database().ref(ref_);
  const printPostProfile = (newPost) => {
    var post = newPost.val();
    let x = firebase.auth().currentUser,
    uuid = x.uid;
    firebase.database().ref('/users/' + post.uid).once('value').then((snapshot) => {
      var username = (snapshot.val().username) || 'Anonymous';
      cont++;
      bodyPostProfile.innerHTML = `
      <div id="${post.idPost}">
        <div class="col s12 m9">
          <div class="card">
            <div class="card-content black-text">
              <div class="col s12 m6 right">
                <a class="dropdown-trigger right" href="#" data-target="dropdowns${cont}">
                  <i class="material-icons left ${uuid == post.uid ? "dblock" : "dnone"}">more_vert</i>
                </a>
                <ul id="dropdowns${cont}" class="dropdown-content">
                  <li data-idpost="${post.idPost}" data-iduser="${post.uid}" onclick="editPost(this, '#section_posts_profile') ">
                    <a >
                      <i class="material-icons">mode_edit</i>Editar</a>
                  </li >
                  <li data-idpost="${post.idPost}" data-iduser="${post.uid}" onclick="deletePost(this, '#section_posts_profile')">
                    <a>
                      <i class="material-icons">delete</i>Eliminar</a>
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
                <i class="material-icons ${post.idPost}" onclick="likePost(this)" style="${post.whoMakeLikes ? post.whoMakeLikes[uuid] ? 'color:red' : 'color:#ffab40' : null}">favorite_border</i>
              </a>
              <a class="post-likes">${post.countLike ? post.countLike : 0}</a>
              <a>Comentario</a>
              <a id="${post.idPost}" onclick="savePost(this, '#section_posts_profile')" class="dnone waves-effect waves-light btn">
                <i class="mdi-maps-rate-review left">Guardar</i>
              </a>
            </div>
          </div>
        </div>
      </div>
  `+bodyPostProfile.innerHTML;
  
      let elems_profile = document.querySelectorAll('#section_posts_profile .dropdown-trigger');
      M.Dropdown.init(elems_profile);

    });
  }
  ref.on('child_added', printPostProfile);
  ref.on('child_changed', data=>{
    let postIdToUpdate = data.val().idPost;
    let uuid = firebase.auth().currentUser.uid;
    let postP = document.querySelector("#section_posts p."+postIdToUpdate),
        postTextArea = document.querySelector("#section_posts textarea."+postIdToUpdate),
        postLikeCounter = document.querySelector("#section_posts div#"+postIdToUpdate +" a.post-likes"),
        heartLike = document.querySelector("#section_posts i."+postIdToUpdate);
        
        postP.innerText = data.val().description;
        postTextArea.innerHTML = data.val().description;
        postLikeCounter.innerText = data.val().countLike || 0;
        data.val().whoMakeLikes ? data.val().whoMakeLikes[uuid] ? heartLike.style.cssText = "color:red;" : heartLike.style.cssText  = "color:#ffab40;" : heartLike.style.cssText = "color:#ffab40;";
    debugger;
    });
  ref.on('child_removed', (data) =>{
    let postBlock = document.querySelector("#section_posts div#" + data.val().idPost);
    postBlock.parentNode.removeChild(postBlock);
  })
}
// FUNCION QUE PERMITE ELIMINAR POST
const deletePost = (post, sectionid) => {
  let postId = post.dataset.idpost,
    postBlock = document.querySelector(sectionid+" div#" + postId);
  const x = firebase.auth().currentUser;
  let updates = {};
  updates['/post/' + postId] = null;
  updates['/users/' + x.uid + '/posts/' + postId] = null;
  //Aparece mensaje de confirmación para eliminiacion del mensaje
  swal({
      title: "¿Está seguro que desea eliminar esta publicación?",
      text: "Puedes editar esta publicación si quieres cambiar algo.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        firebase.database().ref().update(updates, (error) => {
          if (error) {
            alert("No se pudo eliminar")
          } else {
            postBlock.parentNode.removeChild(postBlock);
            swal("Tu archivo ha sido eliminado.", {
              icon: "success",
            });
          }
        });
      }
    });
}

// FUNCION QUE PERMITE EDITAR PUBLICACION
const editPost = (post, sectionid) => {
  const x = firebase.auth().currentUser;
  // let idpost = post.idPost;
  let postId = post.dataset.idpost;
  postP = document.querySelector(sectionid +" p." + postId),
    saveButton = document.querySelector(sectionid+" a#" + postId),
    postTextArea = document.querySelector(sectionid+" textarea." + postId);
  //mostrar text area y oculpar p tag
  postP.style.display = "none";
  postTextArea.style.display = "block";
  saveButton.style.display = "inline-block";
}

// FUNCION QUE PERMITE GUARDAR  EN FIREBASE PUBLICACION EDITADA
const savePost = (post, sectionid) => {
  let postId = post.attributes["0"].value,
    newPost = document.querySelector(sectionid+" textarea." + postId).value;
  const x = firebase.auth().currentUser;
  let dateUpdated = new Date();

  let updates = {};
  updates['/post/' + postId +'/updated_at'] = dateUpdated;
  updates['/post/' + postId +'/description'] = newPost;
  updates['/users/' + x.uid + '/posts/' + postId +'/description'] = newPost;
  updates['/users/' + x.uid + '/posts/' + postId  +'/updated_at'] = dateUpdated;
  firebase.database().ref().update(updates, (error) => {
    if (error) {
      alert("Ocurrio un error, intentelo mas tarde!");
    } else {
      let postP = document.querySelector(sectionid+" p." + postId),
        saveButton = document.querySelector(sectionid+" a#" + postId),
        posTextArea = document.querySelector(sectionid+" textarea." + postId);
      postP.innerText = newPost;
      posTextArea.innerHTML = newPost;
      postP.style.display = "block";
      posTextArea.style.display = "none";
      saveButton.style.display = "none";
    }
  })
}

const likePost = (favorite) => {
  const x = firebase.auth().currentUser;
  firebase.database().ref('/post/' + favorite.classList[1] + '/whoMakeLikes/'+ x.uid).once('value').then((like)=>{
    var is_liked = (like.val() && like.val().uid) || 'undefined';
    if(is_liked == 'undefined'){
      let cantLikes = parseInt(favorite.parentNode.nextElementSibling.innerText) + 1; 
      let whoMakeLikes = {
        fecha : new Date(),
        uid: x.uid
      }
      updates = {};
      updates['/post/' + favorite.classList[1] + '/countLike'] = cantLikes;
      updates['/post/' + favorite.classList[1] + '/whoMakeLikes/'+ x.uid] = whoMakeLikes;
      updates['/users/' + x.uid + '/posts/' + favorite.classList[1] + '/countLike'] = cantLikes;
      updates['/users/' + x.uid + '/posts/' + favorite.classList[1] + '/whoMakeLikes/'+ x.uid] = whoMakeLikes;
      firebase.database().ref().update(updates, (error) => {
        if (error) {
          alert("Ocurrio un error, intentelo mas tarde!");
        } else {
          favorite.style.color = "red";
          favorite.parentNode.nextElementSibling.innerText = cantLikes;
        }
      });
    }else{
      let cantLikes = parseInt(favorite.parentNode.nextElementSibling.innerText) - 1; 
      updates = {};
      updates['/post/' + favorite.classList[1] + '/countLike'] = cantLikes;
      updates['/post/' + favorite.classList[1] + '/whoMakeLikes/'+ x.uid] = null;
      updates['/users/' + x.uid + '/posts/' + favorite.classList[1] + '/countLike'] = cantLikes;
      updates['/users/' + x.uid + '/posts/' + favorite.classList[1] + '/whoMakeLikes/'+ x.uid] = null;
      firebase.database().ref().update(updates, (error) => {
        if (error) {
          alert("Ocurrio un error, intentelo mas tarde!");
        } else {
          favorite.style.color = "#ffab40";
          favorite.parentNode.nextElementSibling.innerText = cantLikes;
        }
      });
    }
  })

}


tabHome.addEventListener("click", () => tabHomeDescription());
tabHospital.addEventListener("click", () => tabHospitalDescription());
tabProfileUser.addEventListener("click", () => tabProfileUserDescription());
tabSearch.addEventListener("click", () => tabSearchDescription());
miniTabHome.addEventListener("click", () => tabHomeDescription());
miniTabHospital.addEventListener("click", () => tabHospitalDescription());
miniTabProfileUser.addEventListener("click", () => tabProfileUserDescription());
miniTabSearch.addEventListener("click", () => tabSearchDescription());

// boton de publicar un post


btnPublic[0].addEventListener("click", () => {
  privacityPost = null;
  if (postUser[0].value !== "") {
    if (selectPrivacity.options[selectPrivacity.selectedIndex].value == "") {
      privacityPost = "public";
      makePost(postUser[0]);
      postUser[0].value = "";
      
    } else {
      privacityPost = selectPrivacity.options[selectPrivacity.selectedIndex].value;
      makePost(postUser[0]);
      postUser[0].value = "";
      
    }
  } else console.log("no escribiste");
});
btnPublic[1].addEventListener("click", () => {
  privacityPost = null;
  if (postUser[1].value !== "") {
    if (selectPrivacity.options[selectPrivacity.selectedIndex].value == "") {
      privacityPost = "public";
      makePost(postUser[1]);
      postUser[1].value = "";
    } else {
      privacityPost = selectPrivacity.options[selectPrivacity.selectedIndex].value;
      makePost(postUser[1]);
      postUser[1].value = "";
    }
  } else console.log("no escribiste");
});