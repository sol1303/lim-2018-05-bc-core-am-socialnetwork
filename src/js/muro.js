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

const tableHospital = document.getElementById("table-hospital");
const tableHospitalSearch = document.getElementById("table-hospital-search");
const search = document.getElementById("search");
const SelectDistrito = document.getElementById("distrito");
let listHospital = null;
// FUNCIÓN PARA EL MENÚ DESPLEGABLE
document.addEventListener('DOMContentLoaded', function () {
  const elems = document.querySelectorAll('.sidenav');
  M.Sidenav.init(elems);
});

// post
const postUser = document.getElementById("textarea-post-user");
const btnPublic = document.getElementById("btn-publicar");
const bodyPosts = document.getElementById("section_posts");
const selectPrivacity = document.getElementById("select-privacity");

let privacityPost = null;

const tabHomeDescription = () => {
  sectionHome.style.display = "block";
  sectionHospital.style.display = "none";
  sectionProfileUser.style.display = "none";
  sectionSearch.style.display = "none";
}
const tabHospitalDescription = (e) => {
  sectionHospital.style.display = "block";
  sectionHome.style.display = "none";
  sectionProfileUser.style.display = "none";
  sectionSearch.style.display = "none";
  getHospital(e);
}
const tabProfileUserDescription = () => {
  sectionProfileUser.style.display = "block";
  sectionHospital.style.display = "none";
  sectionHome.style.display = "none";
  sectionSearch.style.display = "none";
}
const tabSearchDescription = (e) => {
  sectionSearch.style.display = "block";
  sectionHospital.style.display = "none";
  sectionHome.style.display = "none";
  sectionProfileUser.style.display = "none";
  getHospital(e);
}

const showHospitalList = (list, e) => {
  if (e === "linkHospital" || e === "mini-nav-modal-hospital") {
    list.map(hospital => {
      tableHospital.innerHTML += `
      <tr>
        <td>${hospital.clinica}</td>
        <td>${hospital.direccion}</td>
        <td>${hospital.distrito}</td>
      </tr>
      `;
    });
  } else if (e === "linkSearch" || e === "mini-nav-modal-search") {
    tableHospitalSearch.innerHTML = "";
    list.map(hospital => {
      tableHospitalSearch.innerHTML += `
      <tr>
        <td>${hospital.clinica}</td>
        <td>${hospital.direccion}</td>
        <td>${hospital.distrito}</td>
      </tr>
      `;
    });
  } else {
    const filterHospital = searchByName(list, e);
    tableHospitalSearch.innerHTML = "";
    filterHospital.map(hospital => {
      tableHospitalSearch.innerHTML += `
      <tr>
        <td>${hospital.clinica}</td>
        <td>${hospital.direccion}</td>
        <td>${hospital.distrito}</td>
      </tr>
      `;
    })
  }
}

const getHospital = (e) => {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', '../data/hospitales.json', true);
  xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let xhrHospital = JSON.parse(xhr.responseText);
      listHospital = xhrHospital;
      if (e === "linkHospital" || e === "mini-nav-modal-hospital" || e === "linkSearch" || e === "mini-nav-modal-search") {
        showHospitalList(xhrHospital, e);
      } else {
        showHospitalList(xhrHospital, e);
      }
    }
  }
  xhr.send();
}

const searchByName = (hospitales, text) => {
  let filterByHospital = hospitales.filter(hospital => {
    return hospital.clinica.toUpperCase().indexOf(text.toUpperCase()) > -1;
  });
  return filterByHospital;
}

const sortHospitalByDistrit = (distrito) => {
  const newListHospital = listHospital.filter(hospital => hospital.distrito === distrito);
  const byDistrit = newListHospital.sort((a, b) => {
    let x = a.distrito.toLowerCase();
    let y = b.distrito.toLowerCase();
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  });
  return byDistrit;
}

const orderByDistritSort = (name_distrito) => {
  tableHospitalSearch.innerHTML = "";
  const distrit = sortHospitalByDistrit(name_distrito);
  distrit.map(hospital => {
    tableHospitalSearch.innerHTML += `
    <tr>
      <td>${hospital.clinica}</td>
      <td>${hospital.direccion}</td>
      <td>${hospital.distrito}</td>
    </tr>
    `;
  });
}

const switchDistrito = (distrito) => {
  switch (distrito) {
    case 'san-isidro':
      orderByDistritSort("San Isidro");
      break;
    case 'miraflores':
      orderByDistritSort("Miraflores");
      break;
    case 'surco':
      orderByDistritSort("Surco");
      break;
    case 'pueblo-libre':
      orderByDistritSort("Pueblo Libre");
      break;
    case 'lima':
      orderByDistritSort("Lima");
      break;
    case 'san-borja':
      orderByDistritSort("San Borja");
      break;
    case 'smp':
      orderByDistritSort("S.M.P.");
      break;
    case 'molina':
      orderByDistritSort("La Molina");
      break;
    case 'callao':
      orderByDistritSort("Callao");
      break;
    case 'breña':
      orderByDistritSort("Breña");
      break;
    case 'sjl':
      orderByDistritSort("San Juan de Lurigancho");
      break;
    case 'san-miguel':
      orderByDistritSort("San Miguel");
      break;
    case 'independencia':
      orderByDistritSort("Independencia");
      break;
    case 'sjm':
      orderByDistritSort("San Juan De Miraflores");
      break;
    case 'cañete':
      orderByDistritSort("Cañete");
      break;
    case 'jesus-maria':
      orderByDistritSort("Jesús María");
      break;
    case 'surquillo':
      orderByDistritSort("Surquillo");
      break;
    case 'chorrilos':
      orderByDistritSort("Chorrillos");
      break;
    case 'san-luis':
      orderByDistritSort("San Luis");
      break;
    case 'los-olivos':
      orderByDistritSort("Los Olivos");
      break;
    case 'lince':
      orderByDistritSort("Lince");
      break;

    default:
      break;
  }

}

// funciones firebase

//FUNCION PARA CREAR POST Y GUARDAR EN DATABASE DE FIREBASE
const makePost = () => {
  const x = firebase.auth().currentUser;
  let datePosted = new Date().getTime();
  let posts = {
    fecha: datePosted,
    description: postUser.value,
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
  let elems = document.querySelectorAll('.dropdown-trigger');
  M.Dropdown.init(elems);
  mostrarAllPost();
}

// FUNCION PARA MOSTRAR POST EN INTERFAZ
const mostrarAllPost = () => {
  let cont = 0;
  // debugger
  let ref = firebase.database();
  ref.ref('/post')
    .on('child_added', (newPost) => {
      var post = newPost.val();
      let x = firebase.auth().currentUser;
      cont++;
      ref.ref('/users/' + post.uid).once('value').then((snapshot) => {
        var username = (snapshot.val().username) || 'Anonymous';
        bodyPosts.innerHTML = `
        <div id="${post.idPost}">
          <div class="col s12 m9">
            <div class="card">
              <div class="card-content black-text">
                <div class="col s12 m6 right">
                  <a class="dropdown-trigger right" href="#" data-target="dropdown${cont}">
                    <i class="material-icons left ${x.uid == post.uid ? "dblock" : "dnone"}">more_vert</i>
                  </a>
                  <ul id="dropdown${cont}" class="dropdown-content">
                    <li data-idpost="${post.idPost}" data-iduser="${post.uid}" onclick="editPost(this) ">
                      <a >
                        <i class="material-icons">mode_edit</i>Editar</a>
                    </li >
                    <li data-idpost="${post.idPost}" data-iduser="${post.uid}" onclick="deletePost(this)">
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
                  <i class="material-icons ${post.idPost}" onclick="likePost(this)">favorite_border</i>
                </a>
                <a class="post-likes">${post.countLike ? post.countLike : 0}</a>
                <a>Comentario</a>
                <a id="${post.idPost}" onclick="savePost(this)" class="dnone waves-effect waves-light btn">
                  <i class="mdi-maps-rate-review left">Guardar</i>
                </a>
              </div>
            </div>
          </div>
        </div>
    ` + bodyPosts.innerHTML;
        let elems = document.querySelectorAll('#section_posts .dropdown-trigger');
        M.Dropdown.init(elems);
      });
    });
}

// FUNCION QUE PERMITE ELIMINAR POST
const deletePost = (post) => {
  let postId = post.dataset.idpost,
    postBlock = document.querySelector("div#" + postId);
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
const editPost = (post) => {
  const x = firebase.auth().currentUser;
  // let idpost = post.idPost;
  let postId = post.dataset.idpost;
  postP = document.querySelector("p." + postId),
    saveButton = document.querySelector("a#" + postId),
    postTextArea = document.querySelector("textarea." + postId);
  //mostrar text area y oculpar p tag
  postP.style.display = "none";
  postTextArea.style.display = "block";
  saveButton.style.display = "inline-block";
}

// FUNCION QUE PERMITE GUARDAR  EN FIREBASE PUBLICACION EDITADA
const savePost = (post) => {
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
  let updates = {};
  updates['/post/' + postId] = newPostValues;
  updates['/users/' + x.uid + '/posts/' + postId] = newPostValues;
  firebase.database().ref().update(updates, (error) => {
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

const likePost = (favorite) => {
  const x = firebase.auth().currentUser;
  let cantLikes = parseInt(favorite.parentNode.nextElementSibling.innerText) + 1; {
    countLike: cantLikes
  };

  updates = {};
  updates['/post/' + favorite.classList[1] + '/countLike'] = cantLikes;
  updates['/users/' + x.uid + '/posts/' + favorite.classList[1] + '/countLike'] = cantLikes;
  firebase.database().ref().update(updates, (error) => {
    if (error) {
      alert("Ocurrio un error, intentelo mas tarde!");
    } else {
      favorite.innerHTML = "favorite";
      favorite.parentNode.nextElementSibling.innerText = cantLikes;
    }
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

tabHome.addEventListener("click", () => tabHomeDescription());
tabHospital.addEventListener("click", (e) => tabHospitalDescription(e.currentTarget.id));
tabProfileUser.addEventListener("click", () => tabProfileUserDescription());
tabSearch.addEventListener("click", (e) => tabSearchDescription(e.currentTarget.id));
miniTabHome.addEventListener("click", () => tabHomeDescription());
miniTabHospital.addEventListener("click", (e) => tabHospitalDescription(e.currentTarget.id));
miniTabProfileUser.addEventListener("click", () => tabProfileUserDescription());
miniTabSearch.addEventListener("click", (e) => tabSearchDescription(e.currentTarget.id));

search.addEventListener("input", (e) => getHospital(e.target.value));
SelectDistrito.addEventListener("change", () => switchDistrito(SelectDistrito.options[SelectDistrito.selectedIndex].value));

// boton de publicar un post
btnPublic.addEventListener("click", () => {
  privacityPost = null;
  if (postUser.value !== "") {
    if (selectPrivacity.options[selectPrivacity.selectedIndex].value == "") {
      privacityPost = "public";
      makePost();
      postUser.value = "";
    } else {
      privacityPost = selectPrivacity.options[selectPrivacity.selectedIndex].value;
      makePost();
      postUser.value = "";
    }
  } else console.log("no escribiste");
});
