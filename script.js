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

class Button {
	constructor(_x, _y, _text) {
		this.x = _x;
		this.y = _y;
		this.width = 100;
		this.height = 40;
		this.text = _text;
		this.selected = false;
		this.color = "#FFFF00";
		this.selected_color = "#FFFF99";
		buttons.push(this);
	}

	draw() {
		setStyle();
		ctx.fillStyle = this.color;
		if (this.selected) {
			ctx.fillStyle = this.selected_color;
		}
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.strokeText(this.text, this.x + 25 / 2, this.y + 25);
	}

	onclick() {
		alert("button clicked!");
	}
}

var spinButton = new Button(375, 435, "spin slots");

function drawUI() {
	setStyle();
	ctx.fillText("$" + money, 25, 460);
	for (let i = 0; i < buttons.length; i++) {
		buttons[i].draw();
	}
}

// mouse shit but related to buttons
function getMousePos(gameCanvas, event) {
    const rect = gameCanvas.getBoundingClientRect();
    return {
    	x: event.clientX - rect.left,
    	y: event.clientY - rect.top
    };
}

function handleHovering(event) {
	const mousePos = getMousePos(gameCanvas, event);
	for (let i = 0; i < buttons.length; i++) {
		if (mousePos.x >= buttons[i].x && mousePos.x <= buttons[i].x + buttons[i].width && mousePos.y >= buttons[i].y && mousePos.y <= buttons[i].y + buttons[i].width) {
			buttons[i].selected = true;
		} else {
			buttons[i].selected = false;
		}
	}
}

function handleClick(event) {
	const mousePos = getMousePos(gameCanvas, event);
	for (let i = 0; i < buttons.length; i++) {
		if (mousePos.x >= buttons[i].x && mousePos.x <= buttons[i].x + buttons[i].width && mousePos.y >= buttons[i].y && mousePos.y <= buttons[i].y + buttons[i].width) {
			buttons[i].onclick();
		}
	}
}

gameCanvas.addEventListener("mousemove", handleHovering);
gameCanvas.addEventListener("click", handleClick);

// main function(s)
function draw() {
	ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
	drawSlots();
	drawUI();
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