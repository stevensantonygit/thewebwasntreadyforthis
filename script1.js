const button = document.querySelector('.button');
const container = document.querySelector('.container');
const clicksCounter = document.querySelector('.clicks-counter');
const victoryText = document.querySelector('.victory-text');

let attempts = 0;
let buttonClicked = false;

const insults = [
"Too slow!",
"Not even close!",
"My grandma clicks faster!",
"Are you even trying?",
"HAHAHA!",
"Missed me!",
"Try harder!",
"You're embarrassing yourself!",
"This is just sad now...",
"Maybe try using a touchscreen?",
"I can do this all day!",
"Did you forget how to use a mouse?",
"Epic fail!",
"LOL! Nope!",
"Maybe computers aren't for you?"
];

function getRandomPosition() {
const maxX = window.innerWidth - button.offsetWidth;
const maxY = window.innerHeight - button.offsetHeight;

const x = Math.max(0, Math.floor(Math.random() * maxX));
const y = Math.max(0, Math.floor(Math.random() * maxY));

return { x, y };
}

function moveButton() {
if (buttonClicked) return;

const newPos = getRandomPosition();
button.style.left = `${newPos.x}px`;
button.style.top = `${newPos.y}px`;
}

function showInsult(x, y) {
attempts++;
clicksCounter.textContent = `Attempts: ${attempts}`;

if (attempts >= 50) {
button.style.transition = "none";
}

const insult = document.createElement('div');
insult.className = 'insult';
insult.textContent = insults[Math.floor(Math.random() * insults.length)];
insult.style.left = `${x}px`;
insult.style.top = `${y}px`;
document.body.appendChild(insult);

setTimeout(() => {
insult.style.opacity = '1';
}, 10);

setTimeout(() => {
insult.style.opacity = '0';
setTimeout(() => {
  insult.remove();
}, 500);
}, 1000);
}

const initialPos = getRandomPosition();
button.style.left = `${initialPos.x}px`;
button.style.top = `${initialPos.y}px`;

document.addEventListener('mousemove', (e) => {
if (buttonClicked) return;

const buttonRect = button.getBoundingClientRect();
const buttonCenterX = buttonRect.left + buttonRect.width / 2;
const buttonCenterY = buttonRect.top + buttonRect.height / 2;

const mouseX = e.clientX;
const mouseY = e.clientY;

const distance = Math.sqrt(
Math.pow(mouseX - buttonCenterX, 2) + 
Math.pow(mouseY - buttonCenterY, 2)
);

if (distance < 150) {
moveButton();
}
});

document.addEventListener('click', (e) => {
if (e.target !== button && !buttonClicked) {
showInsult(e.clientX, e.clientY);
}
});

button.addEventListener('click', () => {
buttonClicked = true;
button.style.position = 'static';
button.style.transform = 'scale(1.5)';
button.textContent = 'YOU GOT ME!';
victoryText.style.opacity = '1';

document.body.style.animation = 'spin 3s linear infinite';

setTimeout(() => {
button.textContent = 'Refresh to try again!';
document.body.style.animation = '';
victoryText.style.opacity = '0';
}, 3000);
});

setTimeout(moveButton, 500);