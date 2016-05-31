var gameFlowCounter = 0;
var selectedId = '';
var enemyId = '';
var baseAttackMultiplier = 1;

var characters = {
	'luke': {
		name: 'Luke Skywalker',
		hp: 120,
		ab: 8,
		ca: 15,
		attack: function(attackee) {   				//there are two types of people in this world
			console.log(characters[attackee].hp);	//the attacker and the attackee
			characters[attackee].hp = characters[attackee].hp - this.ab;
			baseAttackMultiplier++;
			this.ab = this.ab * baseAttackMultiplier;
			console.log(characters[attackee].hp);
			// var attackeeId = "."+attackee+"HpDisplay";
			// $('.vaderHpDisplay').html("HP: "+characters[attackee].hp);
			$('.attackUpdate').html("You attacked "+characters[attackee].name+"for "+this.ab+" damage");
		},
		counter: function(attacker) {
			console.log(characters[attacker].hp);
			characters[attacker].hp = characters[attacker].hp - this.ca;
			console.log(characters[attacker].hp);
			var attackerId = "#"+attacker+"HpDisplay";
			$(attackerId).html("HP: "+characters[attacker].hp);			
		},
		dieAsAttacker: function() {  
			console.log("i'm dead. owwww");
		},
		dieAsAttackee: function() {
			console.log("ouch I'm dead");
			$('#luke').detach().appendTo("#lukeMainSlot");
			$('#luke').removeClass("enemy");
			$('#luke').hide();
			gameFlowCounter = 1;
		}
	},

	'jawa': {
		name: 'A pack of wild jawas',
		hp: 100,
		ab: 10,
		ca: 5,
		attack: function(attackee) {    
			console.log(characters[attackee].hp);	
			characters[attackee].hp = characters[attackee].hp - this.ab;
			this.ab = this.ab * 2;
			console.log(characters[attackee].hp);
		},
		counter: function(attacker) {
			console.log(characters[attacker].hp);
			characters[attacker].hp = characters[attacker].hp - this.ca;
			console.log(characters[attacker].hp);
		}				
	},

	'solo': {
		name: 'Han Solo',
		hp: 150,
		ab: 6,
		ca: 20,
		attack: function(attackee) {    
			console.log(characters[attackee].hp);	
			characters[attackee].hp = characters[attackee].hp - this.ab;
			this.ab = this.ab * 2;
			console.log(characters[attackee].hp);
		},
		counter: function(attacker) {
			console.log(characters[attacker].hp);
			characters[attacker].hp = characters[attacker].hp - this.ca;
			console.log(characters[attacker].hp);
		}				
	},

	'vader': {
		name: 'Darth Vader',
		hp: 180,
		ab: 4,
		ca: 25, 
		attack: function(attackee) {    
			console.log(attackee.hp);	
			characters[attackee].hp = characters[attackee].hp - this.ab;
			this.ab = this.ab * 2;
			console.log(characters[attackee].hp);
		},
		counter: function(attacker) {
			console.log(characters[attacker].hp);
			characters[attacker].hp = characters[attacker].hp - this.ca;
			console.log(characters[attacker].hp);
		}			
	}	
};


function initialize() {
	gameFlowCounter = 0;
	selectedId = '';
	enemyId = '';
	baseAttackMultiplier = 1;

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

	//reset colors if need be


	//remove selected and enemy classnames? Do this in the Die

	//make button invisible
	//try not to do it the stupid way

};

//this is what happens when you first choose your character
$('#luke, #jawa, #solo, #vader').on('click', function startFunction() {
	//only want to do it on the first click
	if (gameFlowCounter !== 0) {
		return;
	}
	selectedId = $(this).attr("id");

    // moves selected character and makes enemies red
    $('#luke, #jawa, #solo, #vader').addClass('enemy');
    $(this).removeClass("enemy");
    $(this).addClass("selected");
    $(this).detach().appendTo("#selectedCharacter");
    $(".chooseText").html("Choose Your Opponent");

    gameFlowCounter++;
});  

//choose the enemy to fight against
$('#luke, #jawa, #solo, #vader').on('click', function chooseEnemyFunction() {
	//can't choose enemy before first character
	if ($(this).attr("id") === selectedId) {
		return;
	}

	//also can't choose enemy if first enemy is still alive
	if (gameFlowCounter === 1) {
		$(this).detach().appendTo("#EnemyZone");
		$(".attackButton").html("<a class='btn btn-primary btn-lg' href='#' role='button' style='opacity: 1'>Attack!</a>");
		enemyId = $(this).attr("id");

		gameFlowCounter++;
	}
}); 

$('.attackButton').on('click', function attackFunction() {
	//also can't choose enemy if first enemy is still alive
	if (gameFlowCounter > 1) {
		characters[selectedId].attack(enemyId);
		characters[enemyId].counter(selectedId);
		if (characters[selectedId].hp <= 0) {
			characters[selectedId].dieAsAttacker();
		}
		if (characters[enemyId].hp <= 0) {
			console.log("Hi Ryan");
			characters[enemyId].dieAsAttackee();
		}
	}
}); 
















