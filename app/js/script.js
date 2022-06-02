// get the solution word from the wordle list randomly
let solutionWord='';
let solutionList=[];

const chooseWordFromList= () => {

	$.get('airQualityWords.txt').then(function(data) {
		solutionList= data.split('\r\n');    //regu expression here
		solutionWord=solutionList[Math.floor(Math.random()*solutionList.length)];
		console.log(solutionWord);
	})
}

let wordleWordList=[];
const makeWordleList= () => {

	$.get('valid-wordle-words.txt').then(function(data) {
	wordleWordList= data.split('\n');   //no reg exp here!

	})
}

//waiting to run the load function after page loade
$(window).on("load", function() {
    //alert('hellow there 2');
	chooseWordFromList();
	makeWordleList();

});


const letterPattern=/[a-z]/;

let currentGuessCount=1;
let currentGuess=document.querySelector('#guess'+currentGuessCount);


document.addEventListener('keydown',(e) => {

	

	//if letter
	let keypress=e.key;
	if (currentGuessCount<7){
		if (keypress.length==1 && letterPattern.test(e.key) && 
		currentGuess.dataset.letters.length<5){
			updateLetters(keypress);
		}
		else if(e.key=='Backspace' && currentGuess.dataset.letters != ''){
			deleteFromLetter();
		}
		else if(e.key=='Enter' && currentGuess.dataset.letters.length==5){
			if (checkWordExists(currentGuess.dataset.letters)){
				submitGuess();
			}else{
				shake();
				

			}	
		}
	}
	
})

const submitGuess = () => {
	for (let i=0; i<5;i++){		
		setTimeout(() => {
			revealTile(i,checkLetter(i));
		},i*100);
	}
}

const checkIfguessComplete = (i) => {
	if (i==4){
		checkWin();
	}
	else {
		//console.log('not complete')
	}
}

const jumpTiles = () => {
	for (let i=0; i<5;i++){		

		setTimeout(() => {
			let currentTile=document.querySelector('#guess'+currentGuessCount+'Tile'+(i+1));
		currentTile.classList.add ('jump');
		},i*100+800);
		
	}
}

const checkWin = () =>{
	if (solutionWord==currentGuess.dataset.letters)
	{
		//win
		console.log('game is won!');
		jumpTiles(); 
	}
	else{
		currentGuessCount=currentGuessCount+1;
		currentGuess=document.querySelector('#guess'+currentGuessCount);
		console.log('not a win, increment guess to'+currentGuessCount);
		if (currentGuessCount==7){
			showSolution();
		}
	}
}

const showSolution=() =>{

	setTimeout(() => {
		alert('Solution was "'+ solutionWord.toUpperCase() +'"');
	},600);
	
}
//update letters

const updateLetters=(letter) => {
	let oldLetters=currentGuess.dataset.letters;
	let newLetter=oldLetters+letter;
	let currentTile=newLetter.length;
	currentGuess.dataset.letters=newLetter;
	updateTiles(currentTile,letter);
	
}

//updae tile markup

const updateTiles=(tileNumber, letter) =>{
	let currentTile=document.querySelector('#guess'+currentGuessCount+'Tile'+tileNumber);
	currentTile.innerText = letter;
	currentTile.classList.add('has-letter');

}
//delete last letter
//backspace delete last letter
const deleteFromLetter=() => {
	let oldLetters=currentGuess.dataset.letters;
	let newLetters=oldLetters.slice(0,-1);
	currentGuess.dataset.letters=newLetters;
	deleteFromTiles(oldLetters.length);

}

const deleteFromTiles=(tileNumber) =>{
	let currentTile=document.querySelector('#guess'+currentGuessCount+'Tile'+tileNumber);
	currentTile.innerText = '';
	currentTile.classList.remove('has-letter');
}

const checkLetter=(position) =>{
	let guessLetter=currentGuess.dataset.letters.charAt(position);
	let solutionLetter=solutionWord.charAt(position);

	//if letters match return correct
	if (guessLetter==solutionLetter){
		return ('correct')
	}
	//if letter exist return present
	else{
		return checkLetterExists(guessLetter) ? 'present' : 'absent';
	}
	//does not exist return absent
}

const checkLetterExists=(letter) => {
	return (solutionWord.includes(letter))
}

const revealTile=(i,status)=>{
	let tileNum=i+1;
	let tile=document.querySelector('#guess'+currentGuessCount+'Tile'+tileNum);
	flipTile(tileNum,status);

	checkIfguessComplete(i);
}


const flipTile = (tileNum,status) => {
	let tile = document.querySelector('#guess'+currentGuessCount+'Tile'+tileNum);
	
	tile.classList.add('flip-in');

	setTimeout(() => {
		tile.classList.add(status)
	},250)
	
	setTimeout(() => {
		tile.classList.remove('flip-in');
		tile.classList.add('flip-out');
	},250)
	
}

// check if the word is in the wordle list
const checkWordExists=(word) => {
	return (wordleWordList.includes(word));
}

//Shake 
const shakTile = (tileNum) => {
	let tile = document.querySelector('#guess'+currentGuessCount+'Tile'+tileNum);
	
	tile.classList.add('shake-in');

	
	setTimeout(() => {
		tile.classList.remove('shake-in');
	},250)
	
}

const shake = () => {
	for(let i=1;i<6;i++){
		shakTile(i);
	}
	$("<div class='alert'>Not a word!</div>").appendTo('body').delay(1000).queue(function() { $(this).remove(); });
	//;
}


//modal info
const modal = document.querySelector(".modal");
const trigger = document.querySelector(".trigger");
const closeButton = document.querySelector(".close-button");

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
		
    }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

//copy current url 
var url = document.location.href;

var clipboard = new Clipboard('.copyClipboard', {
	
  text: function(e) {
    return url;
  }
});

clipboard.on('success', function(e) {
    alert("URL copied!");
});
