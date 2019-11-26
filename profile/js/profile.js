const uid = location.search.split('=')[1];
const userRef = firebase.database().ref('users').child(uid);

const profileName = document.getElementById('profile-name');
const bioInput = document.getElementById('bio');
const updateButton = document.getElementById('update-profile');

const profilePhone = document.getElementById('profile-phone');

const profileEmail = document.getElementById('profile-email');






userRef.on('value', function(snapshot) {
	const userInfo = snapshot.val();
	profileName.value = userInfo.displayName;
	
	if (userInfo.bio) {
		bioInput.value = userInfo.bio;
    }
    if(userInfo.email){
        profileEmail.value = userInfo.email;
        }
    
    if(userInfo.phone){
        profilePhone.value = userInfo.phone;
	}
});

updateButton.onclick = function() {
	userRef.update({
		displayName: profileName.value,
		bio: bioInput.value,
		email: profileEmail.value,
        phone: profilePhone.value,
	});
};
