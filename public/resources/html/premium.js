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
			document.getElementById('ad').src ="https://d2rw7fmapbgpu6.cloudfront.net/stores/beta-sf608504prep.storefront.co.za/pictures/636341365304433773/sitewide-sale-pb-gif-(1800x200).gif";
		}
	});
}