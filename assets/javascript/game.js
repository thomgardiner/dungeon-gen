let player = null;

const character = function(name, focus, level, experience, health, mana, strength, endurance, intelligence, finesse, luck){
    this.name = name;
    this.focus = focus;
    this.level = level;
	this.experience = experience;
    this.health = health;
    this.mana = mana;
    this.strength = strength;
	this.endurance = endurance;
    this.finesse = finesse;
    this.intelligence = intelligence;
    this.luck = luck;
}

const levelUp = function(name){
	name.level++;
 	name.health = name.health + levelMod(name.level); 
	name.strength = name.strength + levelMod(name.level);
	name.endurance = name.endurance + levelMod(name.level);
    name.finesse = name.finesse + levelMod(name.level);
    name.luck = name.luck + levelMod(name.level);
}

const levelMod = function(n){
	return Math.floor(n * .5);
}

const characterCreationMenuCreation = function(){
    let creation = $("<div>");
    creation.addClass("col-md-2");
    creation.attr("id", "character-creation-box");
    $("#main").append(creation);
    
    let nameBox = $("<div>");
    nameBox.html('<span>Name: </span><br><input id="name-box"><br>');
    $("#character-creation-box").append(nameBox);

    let focusBox = $("<div>");
    focusBox.html('<span>Class:</span><br><select id="class-select"><option value="warrior">Warrior</option><option value="mage">Mage</option><option value="thief">Thief</option>');
    $("#character-creation-box").append(focusBox);

    let background = $("<div>");
    background.html('<span>Family History: </span><br><select id="background-select"><option value="merchant">Merchants</option><option value="adventurer">Adventurers</option><option value="noble">Nobility</option>')
    $("#character-creation-box").append(background);

    let submit = $("<div>");
    submit.attr("id", "submit-button-character");
    submit.addClass("button");
    submit.text("Create Character!");
    $("#character-creation-box").append(submit);

}

const characterStats = function(character){
    console.log("Name: " + character.name);
    console.log("Health: " + character.health);
    console.log("Mana: " + character.mana);
    console.log("Class" + character.focus);
    console.log("Strength: " + character.strength);
    console.log("Endurance: " + character.endurance);
    console.log("Finesse: " + character.finesse);
    console.log("Intelligence" + character.intelligence);
    console.log("Luck: " + character.luck);
}

const classes = [
    {class: "Warrior",
    baseHealth: 20,
    baseMana: 20,
    baseStrength: 20,
    baseEndurance: 20,
    baseFinesse: 20,
    baseIntelligence: 20,
    baseLuck: 20 },
    {class: "Mage",
    baseHealth: 20,
    baseMana: 20,
    baseStrength: 20,
    baseEndurance: 20,
    baseFinesse: 20,
    baseIntelligence: 20,
    baseLuck: 20 },
    {class: "Thief",
    baseHealth: 20,
    baseMana: 20,
    baseStrength: 20,
    baseEndurance: 20,
    baseFinesse: 20,
    baseIntelligence: 20,
    baseLuck: 20 }
]

const createCharacter = function(name, classSelected){
    let selected = classSelected;
    if(selected == "warrior"){
        player = new character(name, 
                              "Warrior", 
                               1, //level
                               0, //exp
                               classes[0].baseHealth, //hp
                               classes[0].baseMana, //mana
                               classes[0].baseStrength, //str
                               classes[0].baseEndurance, //end
                               classes[0].baseIntelligence, //int
                               classes[0].baseFinesse, //fin
                               classes[0].baseLuck); //luck
                            }
    else if(selected == "Mage"){
        player = new character(name, 
                              "Mage", 
                               1, //level
                               0, //exp
                               classes[1].baseHealth, //hp
                               classes[1].baseMana, //mana
                               classes[1].baseStrength, //str
                               classes[1].baseEndurance, //end
                               classes[1].baseIntelligence, //int
                               classes[1].baseFinesse, //fin
                               classes[1].baseLuck); //luck
                            }
    else if(selected == "Thief"){
        player = new character(name, 
                              "Thief", 
                               1, //level
                               0, //exp
                               classes[2].baseHealth, //hp
                               classes[2].baseMana, //mana
                               classes[2].baseStrength, //str
                               classes[2].baseEndurance, //end
                               classes[2].baseIntelligence, //int
                               classes[2].baseFinesse, //fin
                               classes[2].baseLuck); //luck
                            }

}

$(document).ready(function(){

    characterCreationMenuCreation();

    $("body").on("click", "#submit-button-character", function(){
        let nameSelection = $("#name-box").val();
        let classSelected = $("#class-select").val();
        let backgroundSelected = $("#background-select").val();
        
        createCharacter(nameSelection, classSelected);
        console.log(player);
        console.log("Character created!");
    })


})
