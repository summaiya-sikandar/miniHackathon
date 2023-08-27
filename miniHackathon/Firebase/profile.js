const app = firebase.initializeApp(firebaseConfig);
console.log(app)

let userr= JSON.parse(localStorage.getItem('user'));
console.log(userr)
let userID= userr.userID
let email= userr.email
let userName= userr.username
let password = userr.password
document.getElementById('nameOnTop').innerHTML= userName;
let inputField=document.getElementById('currentName');
inputField.placeholder= userName;

const changeName= () => {
    const db = firebase.database();
    const userRef= db.ref("users").child(userID); 
    let newUsername= document.getElementById('currentName').value;
    const myArray = newUsername.split(" ");
    userRef.update({ userName: newUsername })
    userRef.update({firstName:myArray[0] })
    userRef.update({lastName: myArray[1]})
    .then(() => {
      console.log("Username updated successfully.");
      document.getElementById('nameOnTop').innerHTML= newUsername;
      const user = { 
        email: email , 
        username: newUsername , 
        userID:userID ,
        password: password };
      localStorage.setItem('user', JSON.stringify(user));
      let userrr= JSON.parse(localStorage.getItem('user'));

    })
    .catch((error) => {
      console.error("Error updating username:", error);
    });
}



function changePassword(){
    const newPassword = document.getElementById("newPassword").value;
  const againPassword = document.getElementById("againPassword").value;
if (newPassword == againPassword){

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("gotchaa")
      const user = firebase.auth().currentUser;
      const newPassword = document.getElementById("newPassword").value;
      console.log(newPassword)
      user.updatePassword(newPassword).then(() => {
        const user = { 
            email: email , 
            username: userr.username , 
            userID:userID ,
            password: password };
          localStorage.setItem('user', JSON.stringify(user));
          let userrr= JSON.parse(localStorage.getItem('user'));
    
        console.log(" Update successful.")
      }).catch((error) => {
        console.log(error)

      }); 

      // ...
    } else {
      console.log(" User is signed out")
      // User is signed out
      // ...
    }
  });
}
else{
  console.log("Entered wrong")
  document.getElementById("info").innerHTML="Enter same password!!"
}   

}
