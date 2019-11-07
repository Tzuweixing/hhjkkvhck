const loginButton = document.getElementById("login-button");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const message = document.getElementById("login-message");

loginButton.onclick = function(event) {
	const promise = firebase.auth().signInWithEmailAndPassword(emailInput.value, passwordInput.value);
	promise.catch(function(error) {
		message.textContent = error.message;
	});
};

/* auth state */
const displayName = document.getElementById("user-name");
firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		document.body.classList.add('auth');
        /*find user in database*/
        const userRef = firebase.database().ref('users').child(user.uid);
        userRef.on('value',function(snapshot) {
//            console.log(snapshot.val());//
            const userInfo = snapshot.val();
            displayName.textContent = "Welcome," + userInfo.displayName;
        });/*userRef.once()*/
 
        const profileButton = document.getElementById("edit-profile");
        console.log(profileButton);
        profileButton.onclick = function(){
            location.href = "profile.html?uid=" + user.uid;
        }
	} else {
		document.body.classList.remove('auth');
		displayName.textContent = "";
	}
});

/* log out */
const logoutButton = document.getElementById("logout-button");
logoutButton.onclick = function() {
	firebase.auth().signOut();
};

