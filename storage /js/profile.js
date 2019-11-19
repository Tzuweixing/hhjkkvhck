const uid = location.search.split('=')[1];
const userRef = firebase.database().ref('users').child(uid);

const profileName = document.getElementById('profile-name');
const bioInput = document.getElementById('bio');
const updateButton = document.getElementById('update-profile');
const profileEmail = document.getElementById('email');
const profilePhone = document.getElementById('phone');

userRef.on('value', function(snapshot) {
	const userInfo = snapshot.val();
	profileName.value = userInfo.displayName;
	
	if (userInfo.bio) {
		bioInput.value = userInfo.bio;
		(userInfo.email)
        emailInput.value = userInfo.email;
    
    (userInfo.phone)
        phoneInput.value = userInfo.phone;
	}
    if(userInfo.imageURL){
        document.getElementById('profile-image').src = userInfo.imageURL;
        document.getElementById('add-image').style.display = 'none';
    }
});

updateButton.onclick = function() {
	userRef.update({
		displayName: profileName.value,
		bio: bioInput.value,
		email: emailInput.value,
        phone: phoneInput.value,
	});
};


const imageButton = document.getElementById('submit-image');
imageButton.addEventListener('click', function(){
    //get file//
    const file = document.getElementById('image-file').file[0];
//    console.log(file);
    if(file){
        //upload the file//
        const storage = firebase.storage();
        const user = firebse.auth().currentUser;
        const ref = storage.ref('users').child(user.uid).child('profile-image');
        const promise = ref.put(file);
        
        promise.then(function(image){
            return image.ref.getDownloadURL();
                     
                     }).then(function(url){
//                             console.log(url);
        userRef.update({ imageURL: url });
        document.getElementById('profile-image').src = url;
            document.getElementById('add-image').style.display = 'none';
                             });
        
    }
    
});