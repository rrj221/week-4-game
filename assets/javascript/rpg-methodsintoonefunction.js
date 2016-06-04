var gameFlowCounter = 0;
var selectedId = '';
var enemyId = '';
var deadEnemyCount = 0;
var musicCount = 0;

var audioLightsaber = new Audio('assets/sounds/lightsaber.mp3');
var audioDie = new Audio('assets/sounds/jabba_laugh.wav');
var audioKill = new Audio('assets/sounds/chewbacca.wav');
var audioSelect = new Audio('assets/sounds/r2-beep-beep.mp3');
var audioThemeSong = new Audio('assets/sounds/theme-song-short.mp3');

var characters = {
	luke: {
		name: 'Luke Skywalker',
		hp: 120,
		attack: 0,
		ab: 8,
		ca: 15,
	},

	jawa: {
		name: 'A pack of wild jawas',
		hp: 100,
		attack: 0,
		ab: 10,
		ca: 5,			
	},

	solo: {
		name: 'Han Solo',
		hp: 150,
		attack: 0,
		ab: 6,
		ca: 20,			
	},

	vader: {
		name: 'Darth Vader',
		attack: 0,
		hp: 180,
		ab: 4,
		ca: 25, 		
	}	
};

audioThemeSong.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
audioThemeSong.play();

$(".attackButton").hide();
$("#saber").hide();

function attackAfterAnimate() {
	gameFlowCounter = 2;
}

function counterAfterAnimate() {
	gameFlowCounter = 2;
}

function attack(attacker, attackee) {       //there are two types of people in this world
	console.log(characters[attackee].hp);	//the attacker and the attackee
	console.log(characters[attacker]);
	characters[attacker].attack = characters[attacker].attack + characters[attacker].ab
	characters[attackee].hp = characters[attackee].hp - characters[attacker].attack;
	console.log(characters[attackee].hp);
	var attackeeId = "#"+attackee+"HpDisplay";
	$(attackeeId).html("HP: "+characters[attackee].hp);
	$('#attackUpdate').html("You attacked "+characters[attackee].name+" for "+characters[attacker].attack+" damage");
	$('#counterUpdate').html("");
	audioLightsaber.play();

    $("#buttonAttack").prop("disabled", true);
    setTimeout(function() {
    	$("#buttonAttack").prop("disabled", false)
    }, 400);

	// gameFlowCounter = 5;
	$("#saber").show(0).delay(400).hide(0);
	// show(300, attackAfterAnimate());
	// gameFlowCounter = 2;


};
 
function counter(attackee, attacker) {
	console.log(characters[attacker].hp);
	characters[attacker].hp = characters[attacker].hp - characters[attackee].ca;
	console.log(characters[attacker].hp);	
	var attackerId = "#"+attacker+"HpDisplay";
	$(attackerId).html("HP: "+characters[attacker].hp);
	$("#counterUpdate").html(characters[attackee].name+" attacked you for "+characters[attackee].ca+" damage");

	//fire the lazors
	audioLightsaber.play();
	$("#saber").show(0).delay(400).hide(0);
};

function dieAsAttackee(attackee) {
	console.log("ouch I'm dead");
	var deadAttackeeId = "#"+attackee;
	$(deadAttackeeId).animate({height: '0px', width: '0px'}, 2000)
	setTimeout(function() {
		$(deadAttackeeId).appendTo(deadAttackeeId+"MainSlot");
		$(deadAttackeeId).animate({height: "260.33px", width: "260.33px"});
		$(deadAttackeeId).hide();
		$(deadAttackeeId).removeClass("enemy");
	}, 2000);

	// $(deadAttackeeId).appendTo(deadAttackeeId+"MainSlot");
	$(deadAttackeeId).removeClass("enemy");
	// $(deadAttackeeId).hide();
	// $(deadAttackeeId).animate({height: "260.33px"});
	gameFlowCounter = 1;
	deadEnemyCount++;
	audioKill.play();
	if (deadEnemyCount === 1) {
		$("#attackUpdate").html("You killed "+characters[enemyId].name);
		$("#counterUpdate").html("Select another opponent");
	}
	if (deadEnemyCount === 2) {
		$("#attackUpdate").html("You killed "+characters[enemyId].name);
		$("#counterUpdate").html("Select another opponent");
	}	
	if (deadEnemyCount === 3) {
		gameFlowCounter = 3;
		$(".resetButton").html("Reset!");
		$("#attackUpdate").html("You Won!");
		$("#counterUpdate").html("Press the reset button to play again");	
	}
}

function dieAsAttacker(attacker) {
	console.log("ouch I'm dead");
	var deadAttackerId = "#"+attacker;
	$(deadAttackerId).animate({height: '0px', width: '0px'}, 2000)
	setTimeout(function() {
		$(deadAttackerId).appendTo(deadAttackerId+"MainSlot");
		$(deadAttackerId).animate({height: "260.33px", width: "260.33px"});
		$(deadAttackerId).removeClass("selected");
		$(deadAttackerId).hide();
	}, 2000);	
	gameFlowCounter = 4;
	audioDie.play();
	$(".resetButton").html("Reset!");
	$("#attackUpdate").html("You Lost!");
	$("#counterUpdate").html("Press the reset button to play again");
}


function moveWinnerUp(attacker, attackee) {
	if (characters[attacker].hp > 0) {
		var winnerId = "#"+attacker;
		$(winnerId).appendTo(winnerId+"MainSlot");
	}	

	if (characters[attackee].hp > 0) {
		var winnerId2 = "#"+attackee;
		$(winnerId2).appendTo(winnerId2+"MainSlot");
	}	
}


function reset() {

	//move winner up
	moveWinnerUp(selectedId, enemyId);

	characters[selectedId].attack = 0;

	gameFlowCounter = 0;
	selectedId = '';
	enemyId = '';
	baseAttackMultiplier = 0;
	deadEnemyCount = 0;

	//reset all hp's
	characters["luke"].hp = 120;
	characters["jawa"].hp = 100;
	characters["solo"].hp = 150;
	characters["vader"].hp = 180;

	//reset hp displays
	$("#lukeHpDisplay").html("HP: "+characters["luke"].hp);
	$("#jawaHpDisplay").html("HP: "+characters["jawa"].hp);
	$("#soloHpDisplay").html("HP: "+characters["solo"].hp);
	$("#vaderHpDisplay").html("HP: "+characters["vader"].hp);

	//show hidden characters
	$("#luke, #jawa, #solo, #vader").show();

	//remove eroneous classes
	$("#luke, #jawa, #solo, #vader").removeClass("enemy");
	$("#luke, #jawa, #solo, #vader").removeClass("selected");


	//make button invisible
	//try not to do it the stupid way
	$(".attackButton").hide();

	$("#attackUpdate, #counterUpdate").html("");
	$(".chooseText").html("Choose Your Character");
};



//this is what happens when you first choose your character
$('#luke, #jawa, #solo, #vader').on('click', function startFunction() {
	//only want to do it on the first click
	if (gameFlowCounter !== 0) {
		return;
	}
	selectedId = $(this).attr("id");

	audioSelect.play();

    // moves selected character and makes enemies red
    $('#luke, #jawa, #solo, #vader').addClass('enemy');
    $(this).removeClass("enemy");
    $(this).addClass("selected");
    $(this).appendTo("#PlayerZone");
    $(".chooseText").html("Choose Your Opponent");

    gameFlowCounter++;
});  

//choose the enemy to fight against - try to use enemy class here
$('#luke, #jawa, #solo, #vader').on('click', function chooseEnemyFunction() {
	//can't choose enemy before first character
	if ($(this).attr("id") === selectedId) {
		return;
	}

	//also can't choose enemy if first enemy is still alive
	if (gameFlowCounter === 1) {
		audioSelect.play();
		$(this).appendTo("#EnemyZone");
		$(".attackButton").show();
		enemyId = $(this).attr("id");
		$("#attackUpdate").html("");
		$("#counterUpdate").html("");

		gameFlowCounter++;
	}
}); 

$('.attackButton').on('click', function attackFunction() {
    if ($("#saber").is(':animated'))
    {
        return false;
    }	
	//also can't choose enemy if first enemy is still alive
	if (gameFlowCounter === 2) {
		attack(selectedId, enemyId);
		if (characters[enemyId].hp <= 0) {
			console.log("Hi Ryan");
			dieAsAttackee(enemyId);
			return;
		}
		// $('.attackButton').delay(1000); Trying to figure out how to delay the counter 
		// for now i'll just show one lightsaber flash
		
		setTimeout(function() {
    		counter(enemyId, selectedId);
    		if (characters[selectedId].hp <= 0) {
				dieAsAttacker(selectedId);
			}
    	}, 1000);
	}
}); 

$('.resetButton').on('click', function resetFunction() {
	//on the click that the attacker dies, it is regestered so i had to make the counter 4 not three
	if (gameFlowCounter === 3) {
		gameFlowCounter++;
		return;
	}
	if (gameFlowCounter !== 4) {
		return;
	}

	console.log("reset button was clicked");

	$('.attackButton').html("Attack!");
	reset();
}); 

$('#buttonMusic').on('click', function() {
	if (musicCount === 0) {
		audioThemeSong.pause();
		musicCount = 1;
		$(this).text("Play Annoying Music");
	} else {
		audioThemeSong.play()
		musicCount = 0;
		$(this).text("Pause Annoying Music");
	}

});