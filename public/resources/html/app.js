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
			const name = null
			const Sex = null
			const Pref = null
			const pic_url = null
			const AboutMe = null
			const Premium = false
			
			const MessagesSent = 100
			const ProfilesChecked = 50
			
		
			data_to_save = {Sex, pic_url,  Pref, Premium, userid, email, pass, name, AboutMe, pic_url, Artsy, Funny, Kinky, Nerdy, Foody, Messy, Sporty, Quirky, MessagesSent, ProfilesChecked}
		
			//store data into database		
			var windowchangePromise = fb.child(userid + '/').set(data_to_save);
			windowchangePromise.then(function(firebaseUser){
				window.location.href = "profile.html";
			});
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

function signOutFirebase(){
	const auth = firebase.auth();
	const promise = auth.signOut();
	promise.then(function(firebaseUser){
		window.location.href = "index.html";
	})
	.catch(function(error){
		console.log(error);
	});
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
				window.location.href = 'profile.html';
				//window.location.href = 'messaging.html?user=WcrUos34ojc5NTeSQIpXUCffNVz2';
			})
			.catch(function(error){
				alert('Wrong email/password');
		});
}

var temp

function updatePic(input){
	console.log('i am in')

	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.onload = function (e) {
			$('#myimg')
				.attr('src', e.target.result)
				// .width(150)
				// .height(200);
		};

		reader.readAsDataURL(input.files[0]);
	}
}

function setAttributes(){
	const auth = firebase.auth();
	var userid = auth.currentUser.uid;
	const fb=firebase.database().ref().child('Users');
	
	var profilepic

	var Premium = false;
	const prem = fb.child(userid);
	prem.on('value', function(datasnapshot){
		if(datasnapshot.hasChild('Premium')){
			Premium = datasnapshot.child('Premium').val();
		}
	});


	// if there is user submission for a picture
	if ( $(myimg).attr("src") != null ) {
		profilepic = $(myimg).attr("src")

	} else {
		// if there is no input for picture
		// use the image in database

		prem.on('value', function(datasnapshot) {
			profilepic = datasnapshot.val().profilepic

	})
	}

	
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


	// profilepic = document.getElementById('myimg').getElementsByTagName("img")[0].src

	attributes = {userid, Premium, name, profilepic, Artsy, Nerdy, Sporty, Foody, Kinky, Quirky, Messy, AboutMe, Sex, Pref, Likes, Dislikes, Birthday}
	
	var AttPromise = fb.child(userid + '/').update(attributes);
	console.log('continuing')
	
	AttPromise.then(function(value){
		window.location.href = "matches.html?arrnum=0";
	});
	
}

function gotoownprofile(){
	const auth = firebase.auth();
	var userid = auth.currentUser.uid;
	
	window.location.href = 'profile.html?uid=' + userid;
}

function blockUser(){
	const auth = firebase.auth();
	var userid = auth.currentUser.uid;
	const fb=firebase.database().ref().child('Users/' + userid);
	const blockeduser = document.getElementById('userid').value;
	var prom = fb.child("Blocked/" + blockeduser).set(blockeduser);
	prom.then(function(value){
		window.location.href = "matches.html?arrnum=0";
	});
}

function checkBlocked(user1, user2){
	const u1=firebase.database().ref().child('Users/' + user1);
	u1.on('value', function(datasnapshot){
		const u2=firebase.database().ref().child('Users/' + user2);
		u2.on('value', function(datasnapshot2){
			console.log("1");
			if(!datasnapshot.hasChild("Blocked") && !datasnapshot2.hasChild("Blocked")) return true;
			else if(datasnapshot.hasChild("Blocked")){
				var query = firebase.database().ref("Users/" + user1 + "/Blocked").orderByKey();
					query.once("value")
						.then(function(snapshot){
							snapshot.forEach(function(childSnapshot){
								if(childSnapshot.val() == user2){ return false; }
							});
						});		
			}
			
			else if(datasnapshot2.hasChild("Blocked")){
				var query = firebase.database().ref("Users/" + user2 + "/Blocked").orderByKey();
					query.once("value")
					.then(function(snapshot){
						    console.log("4");
							snapshot.forEach(function(childSnapshot){
								console.log(user1);
								if(childSnapshot.val() == user1) { return false; }
								console.log(childSnapshot.val());
							});
						});		
			}
			
		});
	});
	return true;
	
}
function MatchMaking(){
	
	
	var x = document.getElementById("userid");
	x.style.display = "none";
	console.log(userid);
	
	var fullurl = window.location.href;
	var arrnum = fullurl.slice(fullurl.indexOf("?arrnum="+4), fullurl.length);
	console.log(arrnum);
	
	
	var match8 =[], match7 =[], match6 =[ ], match5 =[], match4 =[], match3 =[], match2 =[], match1 =[], match0 =[];
				
			firebase.auth().onAuthStateChanged(function(userin) {
			if(userin) {
				
				if(arrnum == 0){
					document.getElementById("prevpg").style.display = "none";
				}
				const auth = firebase.auth();
				var userid = auth.currentUser.uid;
				var has_prem = firebase.database().ref("Users/" + userid).child("Premium");
				has_prem.on("value", function(snapshot){
					has_prem = snapshot.val();
				});
			
				var query = firebase.database().ref("Users").orderByKey();
					query.once("value")
						.then(function(snapshot){
							const cuser = snapshot.child(userid);
							snapshot.forEach(function(childSnapshot){
								
								if((userid != childSnapshot.child("userid").val()) && (childSnapshot.hasChildren()) 
									&& (cuser.child("Pref").val() == childSnapshot.child("Sex").val()) 
									&& (cuser.child("Sex").val() == childSnapshot.child("Pref").val())) {		
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
						
						console.log(arraymat.length -1);
						if((arrnum == (arraymat.length - 1)) || ((has_prem == false) && (arrnum == 2))){
							console.log('1');
							document.getElementById("nextpg").style.display = "none";
						}
						
						print_user(arraymat[arrnum]);
						
						
					});
				}
			});
}



function print_user(arraymat){
	var numatt = arraymat.slice(arraymat.indexOf("&"+1), arraymat.length)
	var match = arraymat.slice(0, arraymat.indexOf("&"))
	
	
	const auth = firebase.auth();
	var userid = auth.currentUser.uid;
	const fb=firebase.database().ref().child('Users/' + match);
	
	document.getElementById('userid').value = match;
	console.log(arraymat);
	
	const name = fb.child("name");
	name.on('value', function(datasnapshot){
		document.getElementById('nameHolder').innerHTML = datasnapshot.val();
		console.log(datasnapshot.val());
	});
	var first = true;
	const artsy = fb.child("Artsy");
	artsy.on('value', function(datasnapshot){
		if(datasnapshot.val() == true){
			var Att = document.getElementById('traitID').innerHTML;
			document.getElementById('traitID').innerHTML = Att + "Artsy";
			first = false;
		}
	});
	
	const nerdy = fb.child("Nerdy");
	nerdy.on('value', function(datasnapshot){
		if(datasnapshot.val() == true){
			var Att = document.getElementById('traitID').innerHTML;
			if(!first) Att = Att + ", ";
			document.getElementById('traitID').innerHTML = Att + "Nerdy";
			first = false;
		}
	});
	
	const sporty = fb.child("Sporty");
	sporty.on('value', function(datasnapshot){
		if(datasnapshot.val() == true){
			var Att = document.getElementById('traitID').innerHTML;
			if(!first) Att = Att + ", ";
			document.getElementById('traitID').innerHTML = Att + "Sporty";
			first = false;
		}
	});
	
	const funny = fb.child("Funny");
	funny.on('value', function(datasnapshot){
		if(datasnapshot.val() == true){
			var Att = document.getElementById('traitID').innerHTML;
			if(!first) Att = Att + ", ";
			document.getElementById('traitID').innerHTML = Att + "Funny";
			first = false;
		}
	});
	
	const foody = fb.child("Foody");
	foody.on('value', function(datasnapshot){
		if(datasnapshot.val() == true){
			var Att = document.getElementById('traitID').innerHTML;
			if(!first) Att = Att + ", ";
			document.getElementById('traitID').innerHTML = Att + "Foody";
			first = false;
		}
	});
	
	const kinky = fb.child("Kinky");
	kinky.on('value', function(datasnapshot){
		if(datasnapshot.val() == true){
			var Att = document.getElementById('traitID').innerHTML;
			if(!first) Att = Att + ", ";
			document.getElementById('traitID').innerHTML = Att + "Kinky";
			first = false;
		}
	});
	
	const quirky = fb.child("Quirky");
	quirky.on('value', function(datasnapshot){
		if(datasnapshot.val() == true){
			var Att = document.getElementById('traitID').innerHTML;
			if(!first) Att = Att + ", ";
			document.getElementById('traitID').innerHTML = Att + "Quirky";
			first = false;
		}
	});
	
	const messy = fb.child("Messy");
	messy.on('value', function(datasnapshot){
		if(datasnapshot.val() == true){
			var Att = document.getElementById('traitID').innerHTML;
			if(!first) Att = Att + ", ";
			document.getElementById('traitID').innerHTML = Att + "Messy";
			first = false;
		}
	});
	
	const myimg = fb.child("profilepic");
	myimg.on('value', function(datasnapshot){
			if(!datasnapshot.val()) document.getElementById('myimg').src = 'https://raw.githubusercontent.com/jherr029/Dating-Website/master/resources/images/cat.png';
			else document.getElementById('myimg').src = datasnapshot.val();
	});
	
	const likes = fb.child("Likes");
	likes.on('value', function(datasnapshot){
		document.getElementById('likesID').innerHTML = datasnapshot.val();
	});
	
	const dislikes = fb.child("Dislikes");
	dislikes.on('value', function(datasnapshot){
		document.getElementById('dislikesID').innerHTML = datasnapshot.val();
	});
	
	const AboutMe = fb.child("AboutMe");
	AboutMe.on('value', function(datasnapshot){
		document.getElementById('aboutMeID').innerHTML = datasnapshot.val();
	});
	
	const Birthday = fb.child("Birthday");
	Birthday.on('value', function(datasnapshot){
		document.getElementById('nummatch').innerHTML = "Birthday: " + datasnapshot.val();
	});
	
	var matpercent = numatt/8 * 100;
	document.getElementById('bar').value = matpercent;
	document.getElementById('percent').innerHTML = matpercent + '%';
	
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

function gotoMessenger(){
	const userid = document.getElementById('userid').value;
	console.log(userid);
	const locat = 'Messaging/messaging.html?user=' + userid
	window.location.href= locat;
}

function loadDetails(){
	firebase.auth().onAuthStateChanged(function(userin) {
			if(userin) {
				const auth = firebase.auth();
				var userid = auth.currentUser.uid;
				const fb=firebase.database().ref().child('Users/' + userid);
				
				const name = fb.child("name");
				name.on('value', function(datasnapshot){
					document.getElementById('name').value = datasnapshot.val();
				});
				
				const Birthday = fb.child("Birthday");
				Birthday.on('value', function(datasnapshot){
					document.getElementById('Birthday').value = datasnapshot.val();
				});
				
				const Sex = fb.child("Sex");
				Sex.on('value', function(datasnapshot){
					document.getElementById('Sex').value = datasnapshot.val();
				});
				
				const Pref = fb.child("Pref");
				Pref.on('value', function(datasnapshot){
					document.getElementById('Pref').value = datasnapshot.val();
				});
				
				
				
				
				const Artsy = fb.child("Artsy");
				Artsy.on('value', function(datasnapshot){
					document.getElementById('checkbox').checked = datasnapshot.val();
				});
				
				const Nerdy = fb.child("Nerdy");
				Nerdy.on('value', function(datasnapshot){
					document.getElementById('checkbox2').checked = datasnapshot.val();
				});
				
				const Sporty = fb.child("Sporty");
				Sporty.on('value', function(datasnapshot){
					document.getElementById('checkbox3').checked = datasnapshot.val();
				});
				
				const Funny = fb.child("Funny");
				Funny.on('value', function(datasnapshot){
					document.getElementById('checkbox4').checked = datasnapshot.val();
				});
				
				const Foody = fb.child("Foody");
				Foody.on('value', function(datasnapshot){
					document.getElementById('checkbox5').checked = datasnapshot.val();
				});
				
				const Kinky = fb.child("Kinky");
				Kinky.on('value', function(datasnapshot){
					document.getElementById('checkbox6').checked = datasnapshot.val();
				});
				
				const Quirky = fb.child("Quirky");
				Quirky.on('value', function(datasnapshot){
					document.getElementById('checkbox7').checked = datasnapshot.val();
				});
				
				const Messy = fb.child("Messy");
				Messy.on('value', function(datasnapshot){
					document.getElementById('checkbox8').checked = datasnapshot.val();
				});
				
				
				
				
				const Likes = fb.child("Likes");
				Likes.on('value', function(datasnapshot){
					document.getElementById('Likes').value = datasnapshot.val();
				});
				
				const Dislikes = fb.child("Dislikes");
				Dislikes.on('value', function(datasnapshot){
					document.getElementById('Dislikes').value = datasnapshot.val();
				});
				
				const AboutMe = fb.child("AboutMe");
				AboutMe.on('value', function(datasnapshot){
					document.getElementById('AboutMe').value = datasnapshot.val();
				});
				
				const MyImg = fb.child("profilepic");
				MyImg.on('value', function(datasnapshot){
					if(!datasnapshot.val()) document.getElementById('myimg').src = 'https://raw.githubusercontent.com/jherr029/Dating-Website/dev/public/resources/images/cat.png'
					document.getElementById('myimg').src = datasnapshot.val();
				});
			}
		});
}

function loadMessages(){
	var fullurl = window.location.href;
	var mssgpg = fullurl.slice(fullurl.indexOf("?mssgpg="+4), fullurl.length);
	console.log(mssgpg);
	
	
	
	
	firebase.auth().onAuthStateChanged(function(userin) {
			if(userin) {
				const auth = firebase.auth();
				var userid = auth.currentUser.uid;
				var query = firebase.database().ref("messages").orderByKey();
				query.once("value").then( function(snapshot){
					snapshot.forEach(function(childSnapshot){
						const messid= childSnapshot.child('pathid').val();
						if(messid){
							var id1 = messid.toString().slice(0, messid.toString().indexOf("&"));
							var id2 = messid.toString().slice(messid.toString().indexOf("&") + 1, messid.toString().length);

							if(id1 == userid){
								const idpath = firebase.database().ref('Users/' + id2 + '/name');
								idpath.on('value', function(datasnapshot){
								
									print_messages(datasnapshot.val(), id2, messid);
								});
							}
							else if(id2 == userid){
								const idpath = firebase.database().ref('Users/' + id1 + '/name');
								idpath.on('value', function(datasnapshot){

									print_messages(datasnapshot.val(), id1, messid);
									
								});
							}
						}
						
						
						
					});
				});
			}
	});
}

function print_messages(username, userid, messid){
	var articleMessage  = document.createElement('article')   // article 
        var headerP         = document.createElement('p')         // p element
        var strongName      = document.createElement('strong')    // bold the name
        var buttonSec       = document.createElement('a')         // button element
        var divHeader       = document.createElement('div')       // message header
        var divBody         = document.createElement('div')       // message body

		
		
        strongName.innerText  = username  // header title
        var fb = firebase.database().ref("messages/" + messid + "/mostrecent");
        fb.on('value', function(datasnapshot){
			divBody.innerText = datasnapshot.val();
		});

        buttonSec.href            = "/Messaging/messaging.html?user=" + userid      // the location change    
        articleMessage.className  = "message is-danger"
        divHeader.className       = "message-header"
        divBody.className         = "message-body"

        headerP.insertAdjacentElement('afterbegin', strongName)         // Places strongName in headerP
        buttonSec.insertAdjacentElement('afterbegin', divBody)          // Places divBody in buttonSec
        divHeader.insertAdjacentElement('afterbegin', headerP )         // Places headerP in divHeader
        articleMessage.insertAdjacentElement('afterbegin', divHeader )  // Places divHeader in articleMessage
        articleMessage.insertAdjacentElement('beforeend', buttonSec )   // Places buttonSec before the end of articleMessage
        
        ok.appendChild(articleMessage)
}

function ActivatePremium(){


	var premium = false;
	var food = true;
	const auth = firebase.auth();
	var uid = auth.currentUser.uid;
	var premRef = firebase.database().ref('Users/'+uid);
	premRef.once("value")
  	.then(function(snapshot) {
    	premium = snapshot.child('Premium').val();
		
  		
	
							
		var cv = document.getElementById("CVV").value;
		var cn = document.getElementById("CCN").value;
		var fn = document.getElementById("FullName").value;
		var ex = document.getElementById("exp").value;
		var pr = document.getElementById("pro").value;
		var clicked_flag = 0;

		

		if(((cv != "" && cn != "" && fn != "" && ex != "") || (pr == "GiveUsMaxScores")))
		{
			document.getElementById('cat').remove();
			document.getElementById('cat1').remove();
			document.getElementById('cat2').remove();
			document.getElementById('cat3').remove();
			document.getElementById("confirmation").style.display = "";
			window.alert("Thank you for your purchase. You are now a premium member");
			user.sendEmailVerification();
			premRef.update({Premium: true});
			document.getElementbyId('ad').remove();
			
		}

		else
		{
			window.alert("Error, 1 or more invalid fields");
		}
	});	
}

function LoadImages(){
	
		document.getElementById('cat').src="https://raw.githubusercontent.com/jherr029/Dating-Website/master/resources/images/cat.png";
		document.getElementById('cat1').src="https://raw.githubusercontent.com/jherr029/Dating-Website/master/resources/images/cat.png";
		document.getElementById('cat2').src="https://raw.githubusercontent.com/jherr029/Dating-Website/master/resources/images/cat.png";
		document.getElementById('cat3').src="https://raw.githubusercontent.com/jherr029/Dating-Website/master/resources/images/cat.png";
	
}

function LoadAds()
{
	firebase.auth().onAuthStateChanged(function(userin) {
		if(userin) {
			var auth = firebase.auth();
			var uid = auth.currentUser.uid;
			var AdRef = firebase.database().ref('Users/'+uid);
			var prem = false;
			AdRef.once("value")
		  	.then(function(snapshot) {
				prem = snapshot.child('Premium').val();
				console.log(prem);
			
				if(prem == false )
				{

					// FIX THIS two lines. error with src


					//document.getElementById('ad1').src = "../images/hankAd.png"
					//document.getElementById('ad').src ="https://d2rw7fmapbgpu6.cloudfront.net/stores/beta-sf608504prep.storefront.co.za/pictures/636341365304433773/sitewide-sale-pb-gif-(1800x200).gif";
				}
			});
		}
	});
}


