const words = [
  "apple",
  "banana",
  "cherry",
  "date",
  "fig",
  "grape",
  "kiwi",
  "lemon",
  "mango",
  "apricot",
  "avocado",
  "blueberry",
  "clementine",
  "cranberry",
  "dragonfruit",
  "elderberry",
  "fig",
  "gooseberry",
  "grapefruit",
  "guava",
  "honeydew",
  "huckleberry",
  "jackfruit",
  "kumquat",
  "lemon",
  "lime",
  "longan",
  "loquat",
  "mango",
  "mangosteen",
  "mulberry",
  "nectarine",
  "papaya",
  "passionfruit",
  "peach",
  "pear",
  "persimmon",
  "pineapple",
  "plum",
  "pomegranate",
  "pomelo",
  "quince",
  "rambutan",
  "raspberry",
  "salak",
  "starfruit",
  "tangerine",
  "umeboshi",
  "watermelon",
  "yellow passionfruit",
  "zucchini"
];

const lvls = {
    'Easy': 6,
    'Normal': 4,
    'Hard': 2
};

//default lvl
let defLvlName = 'Normal';    //change level from here
let defLvlTime = lvls[defLvlName];
//selectors
let startBtn = document.querySelector('.start');
let spanName = document.querySelector('.msg .lvl');
let spanSecond = document.querySelector('.msg .seconds');
let theWord = document.querySelector('.theWord');
let input = document.querySelector('.input');
let upcomingWords = document.querySelector('.upcomingWords');
let timeLeft = document.querySelector('.time span');
let scoreGot = document.querySelector('.score .got');
let scoreTotal = document.querySelector('.score .total');
let msgFinish = document.querySelector('.finish');

alert('welcome in The Test Speed App')

//lvl anme + score + second
spanName.innerHTML = defLvlName;
spanSecond.innerHTML = defLvlTime;
timeLeft.innerHTML = defLvlTime;
scoreTotal.innerHTML = words.length;

//pervent paste event
input.onpaste = () => {
    return false;
}

//start game
startBtn.addEventListener('click', () => {
    startBtn.remove();
    input.focus();
    genWords();
});

//generate word func
//get random word from array
//remove word from array
//emptu upcoming words
//gen words for loop
genWords = () => {
    let randomWord = words[Math.floor(Math.random() * words.length)];
    let idxWord = words.indexOf(randomWord);
    words.splice(idxWord, 1);
    theWord.innerHTML = randomWord;
    upcomingWords.innerHTML = '';
    for (let w = 0; w < words.length; w++){
        let div = document.createElement('div');
        let txt = document.createTextNode(words[w]);
        div.appendChild(txt);
        upcomingWords.append(div);
    }

    //call play func
    startPlay();
}

//stop timer
//compere words
//emptu input field
//increase score
startPlay = () => {
    timeLeft.innerHTML = defLvlTime;
    let start = setInterval(() => {
        timeLeft.innerHTML--;
        if (timeLeft.innerHTML === '0') {
            clearInterval(start);
            if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
                input.value = '';
                scoreGot.innerHTML++;
                if (words.length > 0) {
                    genWords();
                } else {
                    alert("You Win!");
                    let span = document.createElement('span');
                    span.className = 'good';
                    let spanTxt = document.createTextNode('You Win!');
                    span.appendChild(spanTxt);
                    msgFinish.appendChild(span);
                    upcomingWords.remove();
                }
            } else {
                let span = document.createElement('span');
                span.className = 'bad';
                let spanTxt = document.createTextNode('Game Over');
                span.appendChild(spanTxt);
                msgFinish.appendChild(span);
            }
        }
    }, 1000)
}