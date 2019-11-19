const posts = document.getElementById('posts');
const postRef = firebase.database().ref('posts');

function loadPosts(){
    postRef.on('child_added', function(snapshot){
//        console.log(snapshot.key, snapshot.val());
        if (users[snapshot.val().uid]) {
            createPost(snapshot.val());
        }
        
    });
}

function createElement(_class, text){
    const element = document.createElement('div');
    element.classList.add(_class);
    element.textContent = text;
    return element;
}

function createPost(data){
//    console.log(data);
//    const post = document.createElement('div');
    const post = createElement('post');
    const text = createElement('text', data.text);
    const author = createElement('author', 'by' + users[data.uid].displayName);
    var d = new Date(data.date);
//    console.log(d.getDate(), d.getMonth() + 1, d.getFullYear());
    const date  = createElement('date',(d.getMonth() + 1) + "." + d.getDate() + "." + d.getFullYear());
//    post.classList.add('post');
//    post.textContent = data.text;
    posts.insertBefore(post, posts.firstElementChild);
//    posts.appendChild(post);
   
    /* adding user profile image*/
    const img = new Image();
    if(users[data.uid].imageURL){
        img.src = users[data.uid].imageURL;
    }
    else{
        img.src = 'images/daytime.png';
    }
    img.classList.add('profile-image');
    
    post.appendChild(img);   
    post.appendChild(text);
    post.appendChild(author);
    post.appendChild(date);
    
}


/*get users*/
let userCount = 0;
const users = {};

firebase.database().ref('users').on('child_added', function(snapshot){
    users[snapshot.key] = snapshot.val();
    userCount += 1;

});

firebase.database().ref('users').once('value',function(snapshot){
    if(userCount === snapshot.numChildren()){
        loadPosts();
    }
});
