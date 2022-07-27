//Creating & initializing canvas 
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const startScreen = document.querySelector('.game-intro');

//Creating the background image
let background = new Image();
background.src = '/lab-canvas-race-car/images/road.png';

//Creating the car image
let car = new Image();
car.src = '/lab-canvas-race-car/images/car.png';
let carX = 210;
let carY = 500;
const carWidth = 80;
const carHeight = 130;

//Creating obstacle car
let obstacleCar = new Image();
obstacleCar.src = '/lab-canvas-race-car/images/car2.png';
let obstacleCarX = 100;
let obstacleCarY = -400;

//Creating obstacle car that goes up
let obstacleCarUp = new Image();
obstacleCarUp.src = '/lab-canvas-race-car/images/car2.png';
let obstacleCarUpX = 300;
let obstacleCarUpY = 700;

//isGameOver condition
let isGameOver = false;

//declaring score variable
let score = 0;

//window onload 
window.onload = () => {
  canvas.style.display ='none';
  document.getElementById('start-button').onclick = () => {
    startGame();
  };

  //Event listener
  document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowRight' && carX + carWidth < canvas.width){
      carX += 5;
    } else if (e.code === 'ArrowLeft' && carX > 0){
      carX -= 5;
    } else if (e.code === 'ArrowUp'){
      carY -= 5;
    } else if (e.code === 'ArrowDown'){
      carY += 5;
    }
  });
  
  //startGame function 
  function startGame() {
    //display styles 
    canvas.style.display ='block';
    startScreen.style.display ='none';
    //drawing images 
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(car, carX, carY, carWidth, carHeight);
    ctx.drawImage(obstacleCar, obstacleCarX, obstacleCarY, carWidth, carHeight);
    ctx.drawImage(obstacleCar, obstacleCarUpX, obstacleCarUpY, carWidth, carHeight);

    //obstacle car movement
    let randomX = Math.floor(Math.random() * 500); //random x coordinate 
    let randomX2 = Math.floor(Math.random() * 500); 
    obstacleCarY += 2;
    if (obstacleCarY > canvas.height){
      obstacleCarY = -400;
      obstacleCarX = randomX; 
    }

    //obstacle car up movement
    obstacleCarUpY -= 2;
    if (obstacleCarUpY <= -100){
      obstacleCarUpY = 700;
      obstacleCarUpX = randomX2;
    }
   
    //collision 
    if (carY < obstacleCarY + car.height - 195 && 
      carX < obstacleCarX + carWidth - 10 &&
      carX + carWidth > obstacleCarX &&
      carY + carHeight > obstacleCarY)
    {
      isGameOver = true;
    }

    
    //score 
    ctx.font = "30px Arial";
    ctx.fillText(`Score: ${score} `, 350, 35);
    intervalID = requestAnimationFrame(startGame);
    
    //Stopping the game 
    if (isGameOver){
      cancelAnimationFrame(intervalID);
    }
  }
};
