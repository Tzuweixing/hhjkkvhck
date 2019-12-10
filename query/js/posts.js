//const posts = document.getElementById('posts');
//const postRef = firebase.database().ref('posts');
//
//function loadPosts() {
//    postRef.on('child_added', function (snapshot) {
//        //        console.log(snapshot.key, snapshot.val());
//        if (users[snapshot.val().uid]) {
//            createPost(snapshot.val());
//        }
//
//    });
//}

function createElement(_class, text) {
    const element = document.createElement('div');
    element.classList.add(_class);
    element.textContent = text;
    return element;
}

function createPost(postData, _userData, postId) {
    
    const userData = _userData || { displayName: "Anonymous" };

    
    //    const post = document.createElement('div');
    const post = createElement('post');
    const text = createElement('text', postData.text);
    const author = createElement('author', 'by');
//    console.log(userData);
    const authorLink = document.createElement('a');
    authorLink.href = 'user.html?uid=' + postData.uid;
    authorLink.textContent = userData.displayName;
    author.appendChild(authorLink);
    
    var d = new Date(postData.date);
    //    console.log(d.getDate(), d.getMonth() + 1, d.getFullYear());
    const date = createElement('date', (d.getMonth() + 1) + "." + d.getDate() + "." + d.getFullYear());
    
    //    post.classList.add('post');
    //    post.textContent = data.text;
    posts.insertBefore(post, posts.firstElementChild);
    const img = new Image();
    //    posts.appendChild(post);
//    if (userData.imageURL) {
//
//        const userImage = new Image();
//        userImage.src = data.imageURL;
//        userImage.classList.add('user-image');
//        post.appendChild(userImage);
//    }
    
    if(userData.imageURL){
        img.src = userData.imageURL;
    }
    else{
        img.src = 'images/daytime.png'
    }
    img.classList.add('profile-image');
    
    
    /* Link to the post - permanent link */
    const postLink = document.createElement('a');
//    if (users[data.uid].imageURL) {
//        img.src = users[data.uid].imageURL;
//    } else {
//        img.src = 'images/daytime.png';
//    }
//    img.classList.add('profile-image');
    postLink.href = 'post.html?id=' + postId;
    postLink.textContent = "Permalink";

    post.appendChild(img);
    post.appendChild(text);
    post.appendChild(author);
    post.appendChild(date);
    post.appendChild(postLink);

}

