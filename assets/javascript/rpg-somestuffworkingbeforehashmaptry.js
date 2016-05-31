var gameFlowCounter = 0;
var selectedId = '';
var enemyId = '';
var baseAttackMultiplier = 1;

// var people = {  
// 	'luke': {
// 		hp: 120,
// 		ab: 8,
// 		...
// 	},

// };

// people['luke'].hp = 2;

var luke = {
	hp: 120,
	ab: 8,
	ca: 15,
	attack: function(attackee) {    //there are two types of people in this world
		console.log(attackee.hp);	//the attacker and the attackee
		attackee.hp = attackee.hp - this.ab;
		this.ab = this.ab * 2;
		console.log(attackee.hp);
	}
}

var jawa = {
	hp: 100,
	ab: 10,
	ca: 5,
	attack: function(attackee) {     
		console.log(attackee.hp);	
		attackee.hp = attackee.hp - this.ab;
		this.ab = this.ab * 2;
		console.log(attackee.hp);
	}		
}

var solo = {
	hp: 150,
	ab: 6,
	ca: 20,
	attack: function(attackee) {     
		console.log(attackee.hp);	
		attackee.hp = attackee.hp - this.ab;
		this.ab = this.ab * 2;
		console.log(attackee.hp);
	}	
}

var vader = {
	hp: 180,
	ab: 4,
	ca: 25, 
	attack: function(attackee) {     
		console.log(attackee.hp);	
		attackee.hp = attackee.hp - this.ab;
		this.ab = this.ab * 2;
		console.log(attackee.hp);
	}	
}

function initialize() {
	gameFlowCounter = 0;
}

//this is what happens when you first choose your character
$('#luke, #jawa, #solo, #vader').on('click', function startFunction() {
	//only want to do it on the first click
	if (gameFlowCounter !== 0) {
		return
	}
	selectedId = $(this).attr("id");
    // Trigger an alert.
    alert("I've been clicked!");

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

//attack button action
$('.attackButton').on('click', function attackFunction() {
	//also can't choose enemy if first enemy is still alive
	if (gameFlowCounter > 1) {
		console.log(selectedId, enemyId);
		var attackerObj = null;
		if (selectedId === 'luke') {
			attackerObj = luke;
		} else if (selectedId === 'jawa') {
			attackerObj = jawa;
		} else if (selectedId === 'solo') {
			attackerObj = solo;
		} else if (selectedId === 'vader') {
			attackerObj = vader;
		} else {
			console.log("I stink");
		}

		var attackeeObj = null;
		if (enemyId === 'luke') {
			attackeeObj = luke;
		} else if (enemyId === 'jawa') {
			attackeeObj = jawa;
		} else if (enemyId === 'solo') {
			attackeeObj = solo;
		} else if (enemyId === 'vader') {
			attackeeObj = vader;
		} else {
			console.log("I fail");
		}

		attackerObj.attack(attackeeObj);

	}


}); 















