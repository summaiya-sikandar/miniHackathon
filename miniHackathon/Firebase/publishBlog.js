// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
console.log(app)

   
const userData = JSON.parse(localStorage.getItem("user"));
document.getElementById("showUsername").innerHTML= userData.username;

const publishBlog= () => {
    const datee = new Date();
     const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
   ];

    const day = datee.getDate();
    const month = datee.getMonth(); 
    const year = datee.getFullYear();

const date = `${day} ${monthNames[month]} ${year}`;

const userData = JSON.parse(localStorage.getItem("user"));
const email= userData.email;  

const  newBlog={
   blogTitle: document.getElementById("blogTitle").value,
   blogContent: document.getElementById("blogContent").value,
   date: date,
   email:email,
   username: userData.username

}
    var blogs= firebase.database().ref('blogs');
    console.log(newBlog)
    var newBlogRef = blogs.push(newBlog);
    newBlogRef.push(newBlog).then(function () {
        console.log('Blog uploaded successfully');
        document.getElementById("blogTitle").value= ""
        document.getElementById("blogContent").value= ""
        displayBlogs()
        console.log(newBlog)

    }).catch(function (error) {
        console.error('Error uploading product data:', error);
    });
}

const displayBlogs = () => {
    
const userData = JSON.parse(localStorage.getItem("user"));
let markup = " "
    var blogs= firebase.database().ref('blogs');
    blogs.once('value').then(function (snapshot) {
        snapshot.forEach((childSnapshot) => {
          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
           console.log(childData)
          if( userData.email== childData.email){
            markup += `
            <div class="blog" id="blog">
            <h3 id="blogTitle">${childData.blogTitle}</h3>
            <span id="username"  class="sameLine" >${userData.username} -</span>
            <span id="date" class="sameLine">${childData.date}</span>
            <p id="blogContent" style="  font-size: 18px;">${childData.blogContent}</p>
            <button class="blogButton" id="deleteBlog" blogID="${childKey}" onclick="deleteBlog(event)">Delete</button>
        </div>
       `
          }
        
     })
     
document.getElementById("allBlogs").innerHTML= markup;
});

}
displayBlogs();

function deleteBlog(event) {
     const blogID= event.target.getAttribute("blogID")
     console.log(blogID)

    const db = firebase.database();
    const blogRef = db.ref("blogs").child(blogID); // Replace with the actual path
    blogRef.remove()
    .then(() => {
      console.log("Blog deleted successfully.");
      displayBlogs();
    })
    .catch((error) => {
      console.error("Error deleting blog:", error);
    });
}

