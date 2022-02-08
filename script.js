//selecting all required elements
const selectBox = document.querySelector(".select-box"),
selectXBtn = selectBox.querySelector(".playerX"),
selectOBtn = selectBox.querySelector(".playerO"),
playBoard = document.querySelector(".play-board"),
allBox = document.querySelectorAll("section span"),
players = document.querySelector(".players"),
slider = document.querySelector(".players .slider"),
resultBox = document.querySelector(".result-box"),
wonText = resultBox.querySelector(".won-text"),
replayBtn = resultBox.querySelector("button");

window.onload = () => {//onde windows loaded
    for(let i = 0; i < allBox.length; i++){ //add onclick attrribute in all avaliable spans
        allBox[i].setAttribute("onclick", "clickedBox(this)");
    }
    
    selectXBtn.onclick = () => {
        selectBox.classList.add("hide");
        playBoard.classList.add("show");
    }
    selectOBtn.onclick = () => {
        selectBox.classList.add("hide");
        playBoard.classList.add("show");
        players.setAttribute("class", "players active player");
    }
};

let playerXIcon = "X";
let playerOIcon = "O";

// user click function
function clickedBox(element){
    if (players.classList.contains("player")){
        element.innerHTML = "<p>O</p>"; //adding cross icon tag inside user clicked element
        element.setAttribute("id", playerOIcon); //mark id of this element
        players.classList.remove("player", "active");
    }else{
        element.innerHTML = "<p>X</p>";
        players.classList.add("player", "active");
        element.setAttribute("id", playerXIcon); //mark id of this element
    }
    
    players.style.pointerEvents = "none"; //once user select any box, then that box can't be selected again
    element.style.pointerEvents = "none"; //once user select any box, then that box can't be selected again
    if (!selectWinner()){ //verify if has selection winner, ifnot bot plays
        let randomDelayTime = ((Math.random() * 1000) + 200).toFixed(); //random time for bot select delay
        setTimeout(()=>{
            bot();
        }, randomDelayTime); //passing random delay time
    }else{
        playBoard.style.pointerEvents = "none";
    }
}

// bot click function
function bot(){
    let array = [];
    for(let i = 0; i < allBox.length; i++){ 
        if(allBox[i].childElementCount == 0){ //Create an array without elements marked
            array.push(i);
        }
    }
    let randomBox = array[Math.floor(Math.random() * array.length)]; //getting random element to bot play
    
    //bot play while array isnt empty
    if (array.length > 0){
        if (players.classList.contains("player")){
            allBox[randomBox].innerHTML = "<p>O</p>";
            players.classList.remove("player", "active");
            allBox[randomBox].setAttribute("id", playerOIcon); //mark id of this element
        }else{
            allBox[randomBox].innerHTML = "<p>X</p>"; 
            players.classList.add("player", "active");
            allBox[randomBox].setAttribute("id", playerXIcon); //mark id of this element
        }
        allBox[randomBox].style.pointerEvents = "none";
    } else {
        wonText.innerHTML = `<p>DRAW GAME</p>`;
        setTimeout(()=>{
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
        }, 700);
    }
    
    if(selectWinner()){
        playBoard.style.pointerEvents = "none";
    }; //calling winner function

}

// winner flag
function getId(idName){
    return document.querySelector(".box" + idName).id;
}

function checkClass(val1, val2, val3){
    
    val1 = getId(val1);
    val2 = getId(val2);
    val3 = getId(val3);

    if(val1 === val2 && val1 === val3 && val1 != ""){
        return [true, val1];
    } else{
        return false;
    }
}

function selectWinner(){ //if one combination matched select the winner
    let result = checkClass(1,2,3) || checkClass(4,5,6) || checkClass(7,8,9) || checkClass(1,4,7) || checkClass(2,5,8) || checkClass(3,6,9) || checkClass(1,5,9) || checkClass(3,5,7);

    if(result[0]) {
        console.log(`${result[1]} is the winner!`);
        wonText.innerHTML = `<p>${result[1]}</p> is the winner!`;
        setTimeout(()=>{
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
        }, 700);
        return true;
    }else{
        return false;
    }

}


//refresh page for new match
replayBtn.onclick = () => {
    window.location.reload();
}

