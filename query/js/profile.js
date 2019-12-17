const uid = location.search.split('=')[1];
const userRef = firebase.database().ref('users').child(uid);

const profileName = document.getElementById('profile-name');
const bioInput = document.getElementById('bio');
const updateButton = document.getElementById('update-profile');
const profileEmail = document.getElementById('profile-email');
const profilePhone = document.getElementById('profile-phone');


userRef.on('value', function(snapshot) {
	const userInfo = snapshot.val();
	profileName.value = userInfo.displayName;

    
    
//	if (userInfo.bio) {
//		bioInput.value = userInfo.bio;
//    }
    
	if(userInfo.email){
        emailInput.value = userInfo.email;
    }
    
    if(userInfo.phone){
        phoneInput.value = userInfo.phone;
	}
});

updateButton.onclick = function() {
	userRef.update({
		displayName: profileName.value,
		bio: bioInput.value,
		profileEmail: emailInput.value,
        profilePhone: phoneInput.value,
	});
};

const imageButton = document.getElementById('submit-image');
imageButton.addEventListener('click', function(){
    //get the file
    const file = document.getElementById('image-file').file[0];
    if(file){
        //upload the file
        const storage = firebase.storage();
        const user = firebase.auth().currentUser;
        const ref = storage.ref('users').child(user.uid).child('profile-image');
        const promise = ref.put(file);
        promise.then(function(image){
            return image.ref.getDownloadURL();
            
        }).then(function(url){
            userRef.update({imageURL: url});
            document.getElementById('profile-image').src = url;
            document.getElementById('add-image').style.display = 'none';
        });
    }
});
