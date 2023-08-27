// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
console.log(app)


// const displayBlogs = () => {
//     let markup = " "
//         var blogs= firebase.database().ref('blogs');
//         blogs.once('value').then(function (snapshot) {
//             snapshot.forEach((childSnapshot) => {
//               var childKey = childSnapshot.key;
//               var childData = childSnapshot.val();
//               console.log(childData)
    
//                 markup += `
//                 <div class="blog" id="blog">
//         <h3 id="blogTitle">${childData.blogTitle}</h3>
//         <span id="username"  class="sameLine">${childData.username} -</span>
//         <span id="date" class="sameLine">${childData.date}</span>
//         <p id="blogContent"  style="  font-size: 14px;">${childData.blogContent}</p>

//         <button class="blogButton" email="${childData.email}" onclick="allFromUser(event)"> See all from this user</button>
//     </div>
//            `
            
//          })
         
//     document.getElementById("allBlogs").innerHTML= markup;
//     });
    
//     }
    
    
// displayBlogs();

var recentBlogs = firebase.database().ref('blogs');
let markup='';
recentBlogs.orderByChild("date").once("value")
  .then((snapshot) => {
    const sortedBlogs = [];
    snapshot.forEach((childSnapshot) => {
      const childData = childSnapshot.val();
      sortedBlogs.push(childData);
    });
    sortedBlogs.reverse()
    for(let i = 0; i< sortedBlogs.length ; i++){
        const blog= sortedBlogs[i]
        console.log(blog)
        markup += `
        <div class="blog" id="blog">
        <h3 id="blogTitle">${blog.blogTitle}</h3>
        <span id="username"  class="sameLine">${blog.username} -</span>
        <span id="date" class="sameLine">${blog.date}</span>
        <p id="blogContent"  style="  font-size: 14px;">${blog.blogContent}</p>

        <button class="blogButton" email="${blog.email}" onclick="allFromUser(event)"> See all from this user</button>
    </div>
        `
    }
    document.getElementById("allBlogs").innerHTML= markup;
    localStorage.setItem('sortedBlogs', JSON.stringify(sortedBlogs));
    console.log("Sorted Blogs:",sortedBlogs);
  })
  .catch((error) => {
    console.error("Error retrieving sorted blogs:", error);
  });



function allFromUser(event){
  const email= event.target.getAttribute("email")
  console.log(email)
  let sortedBlogs = [];
    let markup = " "
        var blogs= firebase.database().ref('blogs');
        blogs.orderByChild("date").once("value")
  .then(function (snapshot) {
            snapshot.forEach((childSnapshot) => {
              var childKey = childSnapshot.key;
              var childData = childSnapshot.val();
    
              if( email== childData.email){
                markup += `<div class="blog" id="blog">
                <h3 id="blogTitle">${childData.blogTitle}</h3>
                <span id="username"  class="sameLine">${childData.username} -</span>
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

