const uid = location.search.split('=')[1];
const userRef = firebase.database().ref('users').child(uid);

const profileName = document.getElementById('profile-name');
const bioInput = document.getElementById('bio');
const updateButton = document.getElementById('profile-email');
const profileEmail = document.getElementById('profile-phone');


//const profilePhone = document.getElementById('phone');


userRef.on('value', function(snapshot) {
	const userInfo = snapshot.val();
	profileName.value = userInfo.displayName;
	
	if (userInfo.bio) {
		bioInput.value = userInfo.bio;}
	if(userInfo.email){
        emailInput.value = userInfo.email;}
    
    if(userInfo.phone){
        phoneInput.value = userInfo.phone;
	}
});

updateButton.onclick = function() {
	userRef.update({
		displayName: profileName.value,
		bio: bioInput.value,
		profile-email: emailInput.value,
        profile-phone: phoneInput.value,
	});
};
