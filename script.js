const slotsDiv = document.querySelector("#slots");
const buttonContainer = document.querySelector("#button_container");

// slot variables
var slots = [];
var slotCount = 0;
var lastSpinTime = 0;
const slotSymbols = ["cherry", "lemon", "grapes", "bar", "seven"];
const slotTime = 3000 // 3 seconds in milliseconds

// money variables
var money = 0;

/** Returns a random integer in [min, max).
 *  Min is inclusive, max is exclusive. Min and Max are converted to integers first.
 *  @param {number} min - no number less than this will be returned
 *  @param {number} max - no number greater than or equal to this will be returned
 *
 *  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values
 */
function getRandomInt(min, max) {
	const minCeiled = Math.ceil(min);
	const maxFloored = Math.floor(max);
	return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
	// The maximum is exclusive and the minimum is inclusive
}

class Slot {
	/** Creates a new slot and appends it to the slots array. */
	constructor() {
		this.id = slots.length;
		this.result;

		this.element = document.createElement("img");
		this.element.className = "slot";
		slotsDiv.appendChild(this.element);

		slots.push(this);
	}

	spin() {
		this.result = slotSymbols[getRandomInt(0, slotSymbols.length)];
		//this.element.innerHTML = "<p>" + this.result + "</p>";
		this.element.src = "./assets/" + this.result + ".png";
		console.log("slot: " + this.id + "\n" + "result: " + this.result);
	}
}

/*function spinSlots() {
	for (let i = 0; i < slots.length; i++) {
		slots[i].spin();
	}
}*/

var buttons = [];

function createButton(_text, _id, _class, _function) {
	let _button = document.createElement("button");
	_button.innerHTML = _text;
	_button.id = _id;
	_button.class = _class;
	_button.onclick = _function;
	buttons.push(_button);
	return _button;
}

// spinny animation (just swaps images for rn)
function spinSlotsAnimated(){
	const spinsPerSlot = 10;
	const spinSpeed = 100; // time between changes (possible upgrade?)

	slots.forEach(slot => 
		{
		let spinCount = 0;
		function spinOnce(){
			const tempResult = slotSymbols[getRandomInt(0, slotSymbols.length)];
			slot.element.src = "./assets/" + tempResult + ".png"
			spinCount++;

			if (spinCount < spinsPerSlot) {
				setTimeout(spinOnce, spinSpeed);
			}
			else {
				//final result
				slot.result = slotSymbols[getRandomInt(0, slotSymbols.length)];
				slot.element.src = "./assets/" + slot.result + ".png";
			}
		}
		spinOnce();
	});
}

var spinButton = createButton("SPIN", "spin_button", "", () => { spinSlotsAnimated() });
var newSlotButton = createButton("NEW SLOT", "new-slot-button", "", () => { new Slot() });

function populateUI() {
	for (let i = 0; i < buttons.length; i++) {
		buttonContainer.appendChild(buttons[i]);
	}
}

populateUI();

//new Slot(slotCount);
new Slot();
spinSlots();

setInterval(spinSlots, slotTime);
