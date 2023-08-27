
function isAuthenticated() {
    const user = localStorage.getItem('user');
    return user !== null;
}

if (!isAuthenticated()) {
    window.location.href = '../Login/login.html' ;
}


function logout(){
    console.log("Loging out")
    localStorage.removeItem('user');
    window.location.href = '../Login/login.html' ;
    console.log("Logged out")

}