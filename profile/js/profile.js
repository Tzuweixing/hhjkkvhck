const uid = location.search.split('=')[1];
const userRef = firebase.database().ref('users').child(uid);

const profileName = document.getElementById('profile-name');
const bioInput = document.getElementById('bio');
const updateButton = document.getElementById('update-profile');
const profileEmail = document.getElementById('email');
const email = document.getElementById('Add your email');

const profilePhone = document.getElementById('phone');
const phone = document.getElementById('Phone Number');

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
});

updateButton.onclick = function() {
	userRef.update({
		displayName: profileName.value,
		bio: bioInput.value,
		email: emailInput.value,
        phone: phoneInput.value,
	});
};
