// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
console.log(app)


const signin = () => {
    let email = document.getElementById('email').value
    // let userName = document.getElementById('userName').value
    let password = document.getElementById('password').value
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            let user = userCredential.user;
            
            const dbRef = firebase.database().ref();
            dbRef.child("users").child(user.uid).get().then((snapshot) => {
                if (snapshot.exists()) {
                    const userData = snapshot.val()
                    const user = { email: email,
                         username: userData.username,
                         password: password,
                         userID : userData.uid
                        };
                    localStorage.setItem('user', JSON.stringify(user));
                    console.log('User created successfully.')
                    window.location.href = '../Dashboard/dashboard.html'
                    
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });
        })
        .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode + ': ' + errorMessage)
        });

}