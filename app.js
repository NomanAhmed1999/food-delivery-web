




// initialize

let namee = document.getElementById("name");
let profilePic = document.getElementById("profilePic");
let email = document.getElementById("email");
let phoneNumber = document.getElementById("phoneNumber");
let countryName = document.getElementById("countryName");
let CityName = document.getElementById("CityName");
let fullAddress = document.getElementById("fullAddress");
let password = document.getElementById("password");
let reTypePassword = document.getElementById("reTypePassword");
let profileInput = document.getElementById("profileInput");
let userRole = document.getElementsByName('user-role');
// let profilePic = document.getElementById("profilePic");
// let storage = firebase.storage();
let auth = firebase.auth();
let db = firebase.firestore();






// initialize for restorant
let restorantNamee = document.getElementById("restorantName");
let restorantEmail = document.getElementById("restorantEmail");
let restorantPhoneNumber = document.getElementById("restorantPhoneNumber");
let restorantCountryName = document.getElementById("restorantCountryName");
let restorantCityName = document.getElementById("restorantCityName");
let restorantFullAddress = document.getElementById("restorantFullAddress");
let restorantPassword = document.getElementById("restorantPassword");

userImageEl = document.getElementById('upload-image');
let uploadImage = document.getElementById("upload-image");
let resImg = document.getElementById("resImg");


// initialize end


// User Account create




function imageSelected() {
    let image = userImageEl.files[0];
    resImg.src = `./images/${image.name}`;
}


let CreateUser = () =>{
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;


      let usertObj = {
          userId : user.uid,
          namee : namee.value,
          email : email.value,
          phoneNumber : phoneNumber.value,
          countryName : countryName.value,
          CityName : CityName.value,
          fullAddress : fullAddress.value,
          userRole : "user",
          
        }
        
        saveUser(usertObj) 
        
        
        
        
        // ...
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
    });
}








let saveUser = (saveusertObj) => {
    console.log("usertObj")
    db.collection("User").doc(saveusertObj.userId).set(saveusertObj)
    .then(
        console.log("save restorant")
        )
    }



    // let CreateRestorant = () =>{

     function CreateRestorant() {
    firebase.auth().createUserWithEmailAndPassword(restorantEmail.value, restorantPassword.value)
    .then( async (userCredential) => {
      // Signed in 
      var user = userCredential.user;
    //   let restorantId = userCreated.user.uid;
    //   let imageURL = await uploadImageToStorage(restorantId);

      let restorantObj = {
        //   restorantImage: imageURL,
          restorantId : user.uid,
          restorantName : restorantNamee.value,
          restorantEmail : restorantEmail.value,
          restorantPhoneNumber : restorantPhoneNumber.value,
          restorantCountryName : restorantCountryName.value,
          restorantCityName : restorantCityName.value,
          restorantFullAddress : restorantFullAddress.value,
          userRole : "restorant",
          
        }
        // await db.collection('restorant').doc(restorantId).set(imageURL);
        
        saveRestorant(restorantObj) 
        window.location = "admin-panel.html"     
        
            // ...


            // function uploadImageToStorage(restorantId) {
            //     return new Promise(async (resolve, reject) => {
            //         let image = userImageEl.files[0];
            //         let storageRef = storage.ref();
            //         let imageRef = storageRef.child(`resImg/${UID}/${image.name}`);
            //         await imageRef.put(image);
            //         let url = await imageRef.getDownloadURL();
            //         resolve(url);
            //     })
            // }
    })


    
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // 
        // ..
    });


    
    
}


function uploadImageToStorage(restorantId) {
    return new Promise(async (resolve, reject) => {
        let image = userImageEl.files[0];
        let storageRef = storage.ref();
        let imageRef = storageRef.child(`avatar/${restorantId}/${image.name}`);
        await imageRef.put(image);
        let url = await imageRef.getDownloadURL();
        resolve(url);
    })
}


// User Account create end


let saveRestorant = (saveRestorantObj) => {
    console.log("restorantObj")
    db.collection("restorant").doc(saveRestorantObj.restorantId).set(saveRestorantObj)
    .then(
        console.log("save restorant")
        )
    }
    
    
    
    
    
    



let restorantLogin = () =>{

    
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
    .then((userCredential) => {
        // Signed in
        let userId = userCredential.user.uid;
        // ...
        console.log("Document data:", userId);

        var docRef = db.collection("restorant").doc(userId);

        docRef.get().then((doc) => {
            if (doc.exists) {
                let userObj = doc.data();
                if( userObj.userRole === "restorant"){
                    window.location = "admin-panel.html";
                }else{
                    
                    window.location = "index.html";
                }
                console.log("Document data:", doc.data(), userObj);
            } else {
                // doc.data() will be undefined in this case
                window.location = "index.html"
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

        // console.log("welcome" );
        // let info = db.collection("restorant").doc(userId).data();
        // console.log(info)

        // window.location = "index.html"
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
}



let forgatePassword = () => {
    firebase.auth().sendPasswordResetEmail(email.value)
  .then(() => {
    // Password reset email sent!
    // ..
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });
}





firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      console.log("state change")
      // ...
    } else {
      // User is signed out
      // ...
    }
  });


let userLogout = () => {

firebase.auth().signOut().then(() => {
    // Sign-out successful.
    window.location = "login-form.html";
  }).catch((error) => {
    // An error happened.
  });
}


// firebase.auth().onAuthStateChanged((user) => {
//     if (user) {

//       var uid = user.uid;
//         if(user){
//             console.log("login")
//         }
//         if(!user){
//             console.log("log out")
//             let user = firebase.auth().currentUser;

// if (user) {

//   // ...
// } else {
//     console.log("error")

// }
//         }
//         // ...
//     } else {
//         console.log("error")

//     }
//   });






    
    
    
    
    
    
    
    
    // // User Login
    // let userLogin = () =>{
//     firebase.auth().signInWithEmailAndPassword(email.value, password.value)
//   .then((userCredential) => {
//     // Signed in
//     var user = userCredential.user;
//     window.location = "./index.html"
//     // ...
//   })
//   .catch((error) => {
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     console.error(error);
//   });
// }
// // User Login end




// // user stateChange (checking user login or not)
// firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//       // User is signed in, see docs for a list of available properties
//       // https://firebase.google.com/docs/reference/js/firebase.User
//       var uid = user.uid;
//       console.log("user login");
//       // window.location = "./index.html";
//       // ...
//     } else {
//       // User is signed out
//       // ...
//       console.log("user log out");
//       // window.location = "./login-form.html";
//     }
//   });
// // user stateChange end (checking user login or not)


// // logOut
// let userLogout = () =>{
//     firebase.auth().signOut().then(() => {
//         // Sign-out successful.
//       }).catch((error) => {
//         // An error happened.
//         console.warning(error);
//       });
      
// }
// // logOut


// // forgate password
// let forgatePassword = () => {
//     firebase.auth().sendPasswordResetEmail(email)
//   .then(() => {
//     // Password reset email sent!
//     // ..
//   })
//   .catch((error) => {
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // ..
//   });
// }
// // forgate password end















// // let profile = profilePicInput.files[0];
// // unknownProfilePic.src = `./images/${profile.name}`


// function dpChange() {
//   let dpImgFile = profileInput.files[0];
//    profilePic.src = `./images/${dpImgFile.name}`
//     console.log(profileInput.files[0]);
//     console.log(profilePic);
// }












// let craetContainer = document.getElementById("craetContainer");
// craetContainer.style.display = "none";
// let displayCart = () =>{
//     if(craetContainer.style.display == "none"){
//         craetContainer.style.display = "block";
//     }else if(craetContainer.style.display = "block"){
//         craetContainer.style.display = "none";
//     }
// }


// let cartImg = document.getElementById("cartImg");
// console.log(cartImg);

// let items = (item) => {
//     let selectedItem = item.parentNode.parentNode.childNodes[1].src;
//     let itemImg = cartImg.src = selectedItem;
//     // console.log(item.parentNode.parentNode.childNodes[1].src);
//     // console.log(cartImg);

// }