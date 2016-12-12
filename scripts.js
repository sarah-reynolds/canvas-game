		// SET ALL VARIABLES
			
			// create the canvas tag with js. the canvas holds the game
			var canvas = document.createElement('canvas');
			// create a context for JS to work with (methods, properties, etc)
			var context = canvas.getContext('2d')
			var gameStart = 0;
			var gameEnd = 0;
			var userScore = 0;
			var highScore = 0;
			var highScoreName = 0;
			var timerInterval;
			var playerArray = [];
			var playerName = "Player"
			// Default name set to "Player" in var above. Push below will add the default user name to playerArray, which tracks all users' scores and names per session (resets on browser refresh). Also add's user's name on the screen. See function newPlayer if user enters their name.
			playerArray.push(new Player(playerName));
				document.getElementById('nameBoard').innerHTML = playerName + "'s score: "
			// Game/canvas background
			var backgroundImage = new Image();
				backgroundImage.src = "background.png";
				canvas.width = 512; 
				canvas.height = 480;
				// add the canvas tag to the dom
				document.body.appendChild(canvas);
			var speedModifier = .7; // Harry's speed
			var snitchSpeed = 2.33; // Snitch's speed
			var bludgerSpeed = 2.33;
			var gameOn = false;

			var hero = new Image();
				hero.src = "hp2.png";
				var heroLocation = {
					x: 50,
					y: 50
				}
			var snitch = new Image();
				snitch.src = "snitch3.png";
				var snitchLocation = {
					x: 350,
					y: 350,
					newX: 350,
					newY: 350
				}
			var bludger = new Image();
				bludger.src = "bludger3.png";
				var bludgerLocation = {
					x: 250,
					y: 250,
					newX: 250,
					newY: 250
				}
			// array to hold all the keys that are currently pressed down
			var keysDown = [];

		// FUNCTIONS

			function Player(name){
				this.name = name;
				this.highscore = 0;
			}

			function newPlayer(){
				var playerNameDiv = document.getElementById('player-name');
				playerName = playerNameDiv.value;
				playerArray.push(new Player(playerName));
				document.getElementById('nameBoard').innerHTML = playerName + "'s score: "
			}

			// startGame function is called when user clicks 'Start game'. Function
			function startGame(){
				gameOn = true;
				// User started the game. Save the time and time plus 30 seconds
				gameStart = Date.now();
				gameEnd = Date.now() + 30000;
				// start timerInterval
				timerInterval = Math.floor(setInterval(updateTimer, 1000));
				userScore = 0;
				// here add document to update your score to reflect 0
				document.getElementById('score').innerHTML = userScore
			}

			function updateTimer() {
				var newNow = Date.now();
				var timeDifference = (gameEnd - newNow) / 1000;
				if(timeDifference < 0){
					clearInterval(timerInterval);
					gameOn = false;
					timeDifference = 0;
					document.getElementById('timer').innerHTML = "Time's up";
					context.font = "30px Arial";
					context.strokeText("Game Over",10,50);
					
				}else{
				document.getElementById('timer').innerHTML = "Timer: " + Math.floor(timeDifference) + " seconds";
				}
			}

				addEventListener('keyup', function(event){
					delete keysDown[event.keyCode];
				});

				// We need a way to tell if the user has pushed the arrow key
				//anonymous function has no name, and is only called if its parents calls it (which here is the keydown event) -- and with it comes an event parameter
				addEventListener('keydown', function(event){
					// keyDown[39] right -- keyDown[40] down -- keyDown[37] left -- keyDown[38] up

					keysDown[event.keyCode] = true;
				})

			// updates Harry's, snitch, and bludger locations
				function update(){
					// if user presses arrow, it will show up in kesDown array
					//stay inside right
					if(39 in keysDown){
						if(heroLocation.x <= 425){
							heroLocation.x += (10 * speedModifier);
						}
					}
					// stay inside left
					if(37 in keysDown){
						if(heroLocation.x >= 0){
							heroLocation.x -= (10 * speedModifier);
						}
					}
					// stay inside the top
					if(38 in keysDown){
						if(heroLocation.y >= 5){
							heroLocation.y -= (10 * speedModifier);
						}
					}
					//stay inside the bottom
					if(40 in keysDown){
						if(heroLocation.y <= 400){
							heroLocation.y += (10 * speedModifier);
						}
					}

					// move snitch on collision
					if(
						(heroLocation.x <= snitchLocation.x + 32)
						&& (heroLocation.y <= snitchLocation.y + 32)
						&& (snitchLocation.x <= heroLocation.x + 32)
						&& (snitchLocation.y <= heroLocation.y + 32)
						){
							userScore++;
						document.getElementById('score').innerHTML = userScore
						if(userScore > highScore){
							highScore = userScore;
							document.getElementById('hiScore').innerHTML = "High score: " + highScore + " (set by " + playerName + ") "
						}
						var currentPlayerIndex = playerArray.length-1;
						if(userScore > playerArray[currentPlayerIndex].highscore){
							playerArray[currentPlayerIndex].highscore = userScore
						}

						// randomize the location of the snitch upon contact
							var random = Math.random() * 450;
							var random2 = Math.random() * 400;
							snitchLocation.x = random;
							snitchLocation.y = random2;
						}

					// move bludger on collision
					if(
						(heroLocation.x <= bludgerLocation.x + 25)
						&& (heroLocation.y <= bludgerLocation.y + 25)
						&& (bludgerLocation.x <= heroLocation.x + 25)
						&& (bludgerLocation.y <= heroLocation.y + 25)
						){
							// if you hit the bludger, slow down speed for 3 seconds, then return to normal speed
							speedModifier = .1;
							setTimeout(function(){ speedModifier = .7; }, 3000);
						}
				}
				
				// move objects randomnly on the page by creating new random coordinates (snitch and bludger)
				function moveOnCollision(objectLocation, objectSpeed){
					if(gameOn){

						if(
							(objectLocation.x <= objectLocation.newX + 32)
							&& (objectLocation.y <= objectLocation.newY + 32)
							&& (objectLocation.newX <= objectLocation.x + 32)
							&& (objectLocation.newY <= objectLocation.y + 32)
							){
							objectLocation.newX = Math.ceil(Math.random() * 400)
							objectLocation.newY = Math.ceil(Math.random() * 400)
						}else{
							if(objectLocation.newX > objectLocation.x){
								objectLocation.x += (1 * objectSpeed)
							}
							if(objectLocation.newX < objectLocation.x){
								objectLocation.x -= (1 * objectSpeed)
							}
							if(objectLocation.newY > objectLocation.y){
								objectLocation.y += (1 * objectSpeed)
							}
							if(objectLocation.newY < objectLocation.y){
								objectLocation.y -= (1 * objectSpeed)
							}
						}
					}
				}

			// KEEP THIS AT THE BOTTOM
				function draw(){
					if(gameOn){
						update();
					}
					moveOnCollision(snitchLocation, snitchSpeed);
					moveOnCollision(bludgerLocation, bludgerSpeed);
					context.drawImage(backgroundImage,0,0);
					context.drawImage(hero, heroLocation.x, heroLocation.y);
					context.drawImage(snitch, snitchLocation.x, snitchLocation.y);
					context.drawImage(bludger, bludgerLocation.x, bludgerLocation.y);
					requestAnimationFrame(draw);
				}

			draw();