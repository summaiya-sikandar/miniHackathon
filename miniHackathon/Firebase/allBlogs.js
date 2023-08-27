// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
console.log(app)


const displayBlogs = () => {
    let markup = " "
        var blogs= firebase.database().ref('blogs');
        blogs.once('value').then(function (snapshot) {
            snapshot.forEach((childSnapshot) => {
              var childKey = childSnapshot.key;
              var childData = childSnapshot.val();
    
                markup += `
                <div class="blog" id="blog">
        <h3 id="blogTitle">${childData.blogTitle}</h3>
        <span id="username"  class="sameLine">Summaiya Sikandar -</span>
        <span id="date" class="sameLine">${childData.date}</span>
        <p id="blogContent">${childData.blogContent}</p>

        <button class="blogButton" email="${childData.email}" onclick="allFromUser(event)"> See all from this user</button>
    </div>
           `
            
         })
         
    document.getElementById("allBlogs").innerHTML= markup;
    });
    
    }
    
    
displayBlogs();


function allFromUser(event){
  const email= event.target.getAttribute("email")
  console.log(email)

    let markup = " "
        var blogs= firebase.database().ref('blogs');
        blogs.once('value').then(function (snapshot) {
            snapshot.forEach((childSnapshot) => {
              var childKey = childSnapshot.key;
              var childData = childSnapshot.val();
    
              if( email== childData.email){
                markup += `<div class="blog" id="blog">
                <h3 id="blogTitle"${childData.blogTitle}</h3>
                <span id="username"  class="sameLine">Summaiya Sikandar -</span>
                <span id="date" class="sameLine">${childData.date}</span>
                <p id="blogContent">${childData.blogContent}</p>
            </div>
        
           `
      
              }
            
         })
         document.getElementById("replaceHeading").innerHTML= "All from this user"; 
    document.getElementById("allBlogs").innerHTML= markup;
    });
    
    }

