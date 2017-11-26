function saveFirebase(){
	
	//get email and password
	const email = document.getElementById('txtEmail').value;
	const pass = document.getElementById('txtPassword').value;
	const pass2 = document.getElementById('txtPassword2').value;
	//SignIn
	if(pass == pass2){ 
		const auth = firebase.auth();
		const promise = auth.createUserWithEmailAndPassword(email, pass)
		.then(function(firebaseUser){
		
			//get path and uid		
			const fb=firebase.database().ref().child('Users');
			var userid = auth.currentUser.uid;
		
			//get Elements on page store into data_to_save
		
			const Artsy = false
			const Funny = false
			const Nerdy = false
			const Sporty = false
			const Foody = false
			const Kinky = false
			const Messy = false
			const Quirky = false
			const LookingAt = null
			const name = null
			const Sex = null
			const Pref = null
			const pic_url = null
			const AboutMe = null
			const Premium = false
		
			data_to_save = {Sex, Pref, Premium, userid, email, pass, name, AboutMe, pic_url, Artsy, Funny, Kinky, Nerdy, Foody, Messy, Sporty, Quirky}
		
			//store data into database		
			var windowchangePromise = fb.child(userid + '/').set(data_to_save);

			/*

			windowchangePromise.then(function(firebaseUser){
				window.location.href = "profile.html";
			});

			*/



			var user = firebase.auth().currentUser;

			user.sendEmailVerification().then(function()
			{
				
			})


			})
		.catch(function(error){
			alert('Email Taken');
			console.log(error);
		});
	}
	else{
		alert('Passwords do not Match');
	}
}

function loginFirebase(){
	//elements
	const txtEmail = document.getElementById('txtEmail');
	const txtPassword = document.getElementById('txtPassword');
	
	const email = txtEmail.value;
	const pass = txtPassword.value;
	const auth = firebase.auth();
		firebase.auth().signInWithEmailAndPassword(email, pass)
			.then(function(firebaseUser){
				window.location.href = 'matches.html?arrnum=0';
				//window.location.href = 'messaging.html?user=WcrUos34ojc5NTeSQIpXUCffNVz2';
			})
			.catch(function(error){
				alert('Wrong email/password');
		});
}

function setAttributes(){
	const auth = firebase.auth();
	var userid = auth.currentUser.uid;
	const fb=firebase.database().ref().child('Users');
	
	const Artsy = document.getElementById('checkbox').checked
	const Nerdy = document.getElementById('checkbox2').checked
	const Sporty = document.getElementById('checkbox3').checked
	const Funny = document.getElementById('checkbox4').checked
	const Foody = document.getElementById('checkbox5').checked
	const Kinky = document.getElementById('checkbox6').checked
	const Quirky = document.getElementById('checkbox7').checked
	const Messy = document.getElementById('checkbox8').checked
	
	
	const name= document.getElementById('name').value
	const AboutMe= document.getElementById('AboutMe').value
	const Likes= document.getElementById('Likes').value
	const Dislikes= document.getElementById('Dislikes').value
	const Birthday= document.getElementById('Birthday').value
	const Sex= document.getElementById('Sex').value
	const Pref= document.getElementById('Pref').value
	
	attributes = {name, Artsy, Nerdy, Sporty, Foody, Kinky, Quirky, Messy, AboutMe, Sex, Pref, Likes, Dislikes, Birthday}
	
	var AttPromise = fb.child(userid + '/').update(attributes);
	AttPromise.then(function(value){
		window.location.href = "matches.html?arrnum=0";
	});
}

function gotoownprofile(){
	const auth = firebase.auth();
	var userid = auth.currentUser.uid;
	
	window.location.href = 'profile.html?uid=' + userid;
}
function MatchMaking(){
	var fullurl = window.location.href;
	var arrnum = fullurl.slice(fullurl.indexOf("?arrnum="+4), fullurl.length);
	console.log(arrnum);
	var match8 =[], match7 =[], match6 =[], match5 =[], match4 =[], match3 =[], match2 =[], match1 =[], match0 =[];
		window.onload = function(){
			firebase.auth().onAuthStateChanged(function(userin) {
			if(userin) {
				const auth = firebase.auth();
				var userid = auth.currentUser.uid;
			
				var query = firebase.database().ref("Users").orderByKey();
					query.once("value")
						.then(function(snapshot){
							const cuser = snapshot.child(userid);
							snapshot.forEach(function(childSnapshot){
							
							
								if(userid != childSnapshot.child("userid").val() && childSnapshot.hasChildren()){		
										var i = 0;
									
										if(cuser.child("Artsy").val() == childSnapshot.child("Artsy").val()){
											i++;
										} 
									
										if(cuser.child("Nerdy").val() == childSnapshot.child("Nerdy").val()){
											i++;
										} 
									
										if(cuser.child("Sportsy").val() == childSnapshot.child("Sportsy").val()){
											i++;
										} 
									
										if(cuser.child("Foody").val() == childSnapshot.child("Foody").val()){
											i++;
										} 
									
										if(cuser.child("Kinky").val() == childSnapshot.child("Kinky").val()){
											i++;
										} 
									
										if(cuser.child("Quirky").val() == childSnapshot.child("Quirky").val()){
											i++;
										} 
									
										if(cuser.child("Shy").val() == childSnapshot.child("Shy").val()){
											i++;
										}
									
										if(i == 0) match0.push(childSnapshot.child("userid").val());
										if(i == 1) match1.push(childSnapshot.child("userid").val());
										if(i == 2) match2.push(childSnapshot.child("userid").val());
										if(i == 3) match3.push(childSnapshot.child("userid").val());
										if(i == 4) match4.push(childSnapshot.child("userid").val());
										if(i == 5) match5.push(childSnapshot.child("userid").val());
										if(i == 6) match6.push(childSnapshot.child("userid").val());
										if(i == 7) match7.push(childSnapshot.child("userid").val());
										if(i == 8) match8.push(childSnapshot.child("userid").val());
								}
						});
						
						var arraymat =[];
						var j = 0;
						for(j = 0; j < match8.length; j++) { arraymat.push(match8[j] + "&" + 8); }
						for(j = 0; j < match7.length; j++) { arraymat.push(match7[j] + "&" + 7); }
						for(j = 0; j < match6.length; j++) { arraymat.push(match6[j] + "&" + 6); }
						for(j = 0; j < match5.length; j++) { arraymat.push(match5[j] + "&" + 5); }
						for(j = 0; j < match4.length; j++) { arraymat.push(match4[j] + "&" + 4); }
						for(j = 0; j < match3.length; j++) { arraymat.push(match3[j] + "&" + 3); }
						for(j = 0; j < match2.length; j++) { arraymat.push(match2[j] + "&" + 2); }
						for(j = 0; j < match1.length; j++) { arraymat.push(match1[j] + "&" + 1); }
						for(j = 0; j < match0.length; j++) { arraymat.push(match0[j] + "&" + 0); }
						
						print_user(arraymat[arrnum]);
						
						
					});
				}
			});
		}
}

function print_user(arraymat){
	var numatt = arraymat.slice(arraymat.indexOf("&"+1), arraymat.length)
	var match = arraymat.slice(0, arraymat.indexOf("&"))
	
	
	const auth = firebase.auth();
	var userid = auth.currentUser.uid;
	const fb=firebase.database().ref().child('Users/' + match);
	
	const name = fb.child("name");
	name.on('value', function(datasnapshot){
		document.getElementById('nameHolder').innerHTML = datasnapshot.val();
		console.log(datasnapshot.val());
	});
	
	document.getElementById('nummatch').innerHTML = numatt + '/8 Match!';
	
}

function prevpage(){
	var fullurl = window.location.href;
	var arrnum = fullurl.slice(fullurl.indexOf("?arrnum="+4), fullurl.length);
	arrnum--;
	window.location.href = 'matches.html?arrnum=' + arrnum;
}

function nextpage(){
	var fullurl = window.location.href;
	var arrnum = fullurl.slice(fullurl.indexOf("?arrnum="+4), fullurl.length);
	arrnum++;
	window.location.href = 'matches.html?arrnum=' + arrnum;
}
