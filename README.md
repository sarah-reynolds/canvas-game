# Quidditch Practice
## Canvas game

A Harry Potter themed game built using canvas. The user plays as Harry Potter on a broom, and uses the arrow keys on the keyboard to catch as many golden snitches possible in 30 seconds. Being hit by a the bludger will slow you down for 3 seconds. High scores are stored in each browser session.

### Technologies 
- HTML 
- CSS 
- JavaScript 

### Code snippets
```
// updates Harry's, snitch, and bludger locations
	function update(){
		// if user presses arrow, it will show up in keysDown array
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
```

```
// collision detection - if Harry hits the snitch, increase the user's score
	if(
		(heroLocation.x <= snitchLocation.x + 32)
		&& (heroLocation.y <= snitchLocation.y + 32)
		&& (snitchLocation.x <= heroLocation.x + 32)
		&& (snitchLocation.y <= heroLocation.y + 32)
		){
			userScore++;