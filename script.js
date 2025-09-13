const gameCanvas = document.querySelector("#game_canvas");
const ctx = gameCanvas.getContext("2d");

// font setup
function setStyle() {
	ctx.font = "20px serif";
	ctx.fillStyle = "#000000";
	ctx.strokeStyle = "#000000";
}

// slot variables
var slots = [];
var slotCount = 0;
var slotPos = {x: 0, y: 0};
var lastSpinTime = 0;
const slotWidth = 100;
const slotHeight = 100;
const slotSymbols = ["cherry", "lemon", "grape", "bar", "seven"];
const slotTime = 3000 // 3 seconds in milliseconds

// money variables
var money = 0;

// random math function that is needed like once
function rand_range(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// slot spinning logic
class Slot {
	constructor() {
		this.id = slotCount;
		this.result;
		slots.push(this);
		slotCount = slots.length;
	}

	spin() {
		// selects a random result symbol from the array
		this.result = slotSymbols[rand_range(0, slotSymbols.length - 1)];
		console.log("slot: " + this.id + "\n" + "result: " + this.result);
	}
}

function spinSlots() {
	for (let i = 0; i < slotCount; i++) {
		slots[i].spin();
	}
}

// slot and ui drawing logic
function drawSlots() {
	setStyle();
	for (let i = 0; i < slotCount; i++) {
		ctx.strokeRect(slotPos.x, slotPos.y, slotWidth, slotHeight);
		slotPos.x += slotWidth;
		ctx.fillText(slots[i].result, slotPos.x - 75, 55);
	}
	slotPos.x = 0;
}

var buttons = [];
const buttonContainer = document.querySelector("#button_container");

function createButton(_text, _id, _class, _function) {
	let _button = document.createElement("button");
	_button.innerHTML = _text;
	_button.id = _id;
	_button.class = _class;
	_button.onclick = _function;
	buttons.push(_button);
	return _button;
}

function test() { alert("test!"); } 

var spinButton = createButton("SPIN", "spin_button", "", test);

function populateUI() {
	for (let i = 0; i < buttons.length; i++) {
		buttonContainer.appendChild(buttons[i]);
	}
}

populateUI();

// main function(s)
function draw() {
	ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
	drawSlots();
	requestAnimationFrame(draw);
}

// changes canvas size to window size
function changeCanvasSize() {
	gameCanvas.width = window.innerWidth;
	gameCanvas.height = window.innerHeight;
}

addEventListener("resize", changeCanvasSize);

changeCanvasSize();

new Slot(slotCount);
spinSlots();

requestAnimationFrame(draw);
setInterval(spinSlots, slotTime);