
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
console.log(app)

const signup = () => {
    
const email=document.getElementById("email").value;
const firstName=document.getElementById("firstName").value;
const lastName=document.getElementById("lastName").value;
const password=document.getElementById("password").value;
const repeatPassword=document.getElementById("repeatPassword").value;
const userName = firstName + " "+ lastName;


    console.log(email, password)
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            let user = userCredential.user;
            firebase.database().ref('users/' + user.uid).set({
                uid: user.uid,
                username: userName,
                email: email,
                password: password
            })
                .then(() => {
                    const user = {  username: userName,
                email: email,
                password: password };
                    console.log('User created successfully.')
                    window.location.href = '../Login/login.html'
                })
                .catch((error) => {
                    console.log(error);
                })
        })
        .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode + ': ' + errorMessage)
        });
}




// function signup(){
//     firebase.auth().createUserWithEmailAndPassword(email, password)
//     .then((userCredential) => {
//         var user = userCredential.user;
//         firebase.database().ref('users/' + user.uid).set({
//             uid: user.uid,
//             email: email,
//             firstName : firstName,
//             lastName: lastName,
//             userName: userName,
//             password: password
//         })
//         .then(() => {
//             const user = {
//                 uid: user.uid,
//                 email: email,
//                 firstName : firstName,
//                 lastName: lastName,
//                 userName: userName,
//                 password: password};
//             localStorage.setItem('user', JSON.stringify(user));
//             console.log('User created successfully.')
//             window.location.href = '../Login/login.html'
//         })
//         .catch((error) => {
//             console.log(error);
//         // })
// })
   
//     .catch((error) => {
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       console.log(error)
//       // ..
//     });

// }
