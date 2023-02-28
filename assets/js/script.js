
//au chargement de la page, le jeu se lance pour 5 parties
window.onload = shifumi(5)


// fonction appelée lors du start
function shifumi(nbDeParties) {
    let displayTimer = document.querySelector('#timer');
    startShiFuMi(displayTimer, nbDeParties);
}


//fonction qui retire tout à l'écran et qui affiche le tableau des scores
function gameOver() {
    document.querySelector('.selector').style.display = `none`;
    document.querySelector('.fist').style.display = `none`;
    document.querySelector('.stats-hidden').style.display = `block`
    document.querySelector('.round').style.display = `none`;
    //document.querySelector('#score-tableau').display='block';
}

// fonction qui permet de faire la temporisation
function wait(millisec) {
    return new Promise(resolve => {
        setTimeout(() => { resolve('') }, millisec);
    })
}


// fonction qui execute la majorité des actions
async function startShiFuMi(displayTimer, nbDeParties) {
    //déclaration des variables et initialisation
    let computerString;
    let computer;
    let playerString;
    let player;
    let scoreComputer = 0;
    let scorePlayer = 0;
    let statsComputer = 0;
    let statsPlayer = 0
    let nbPartiesPlayed = 0;
     console.log('le console log de scoreComputer est $',scoreComputer)
    // console.log(`le console log de scorePlayer est ${scorePlayer} `)
    // console.log(`le console log de nbDeParties est ${nbDeParties} `)
    // mise en place de l'écran de jeu, on affiche à l'écran les scores et stats    
    writeOneStringHTML(scoreComputer, '#left-score p');
    writeOneStringHTML(scorePlayer, '#right-score p');
    writeOneStringHTML(nbDeParties, '.round p:last-child');

    // cette boucle while execute tous les rounds
    while (nbDeParties > 0) {
        nbPartiesPlayed++;
        resetButtonAndChoice();
        computer = 0;
        player = 0;
        writeOneStringHTML(nbPartiesPlayed, '.round p:nth-child(2)');
        document.querySelector('#left-fist').style.width='';
        document.querySelector('#right-fist').hidden = false;
        
        //cette boucle for permet de faire le décompte et d'afficher Shi Fu MI
        for (let seconds = 4; seconds > 0; seconds--) {
            await wait(1000);
            console.log(seconds - 1);
            let sfm = displayShiFuMi(seconds - 1);
            displayTimer.innerText = `${sfm}`;
        }
        //choix de l'ordinateur en chiffre
        computer = computerChoice();
        //choix converti en mot
        computerString = convertChoiceToString(computer);

        playerString = readMyChoice();
        player = convertChoiceToNumber(playerString);
        // player et computer contiennent 0, 1, 2, ou 3
        switch (battle(computer, player, displayTimer)) {
            case 'computer':
                scoreComputer++;
                writeOneStringHTML(scoreComputer, '#left-score p');
                break;
            case 'player':
                scorePlayer++;
                writeOneStringHTML(scorePlayer, '#right-score p');
                break;
            default:
            //return 'nothing';
        }

        var x = window.matchMedia("(max-width: 459px)");


        if (player == 0 && x.matches) { 
            document.querySelector('#left-fist').style.width='175px';
        } else if(player == 0){
            document.querySelector('#left-fist').style.width='500px';
        }

        console.log(`le console log de playerString est ${playerString}`)
        statsComputer = Math.round(100 * scoreComputer / nbPartiesPlayed);
        statsPlayer = Math.round(100 * scorePlayer / nbPartiesPlayed);

        //console.log(`le console log de playerString est  ${playerString}`);
        console.log(`Computer : ${computerString} VS Player : ${playerString}`);
        console.log('LOOP');
        replaceFist('left', computerString);
        replaceFist('right', playerString);
        await wait(2000);
        nbDeParties--;
    }
    await wait(2000);

    gameOver();
    console.log("Loop execution finished!)");
    displayTimer.style.display = `none`;
}

// 1 : pierre : Stone
// 2 : papier : Paper
// 3 : Ciseaux : Cisors
// cette fonction permet d'afficher ShiFuMi en guise de décompte de chaque round
function displayShiFuMi(number) {
    switch (number) {
        case 3:
            return (`SHI`);
            break;
        case 2:
            return (`FU`);
            break;
        case 1:
            return (`MI !`);
            break;
        case 0:
            return (`Ready ?`);
            break;
        default:
            console.log(`Out`);
    }

}

// fonction qui convertit le choix string (stone, paper, cisors) en chiffre : 1, 2, 3
function convertChoiceToNumber(selection) {
    switch (selection) {
        case 'stone':
            return 1;
            break;
        case 'paper':
            return 2;
            break;
        case 'cisors':
            return 3;
            break;
        default:
            return 0;
    }
}

// fonction qui convertit le choix chiffre : 1, 2, 3 vers un choix string(stone, paper, cisors) 
function convertChoiceToString(selection) {
    switch (selection) {
        case 1:
            return 'stone';
            break;
        case 2:
            return 'paper';
            break;
        case 3:
            return 'cisors';
            break;
        default:
            return 'nothing';
    }
}

// mettre la class selected au bouton choisi en appelant la fonction qui ajoute la class
document.querySelectorAll('img.selection').forEach((item) =>
    item.addEventListener('click', addSelectedClass))


// lire dans le html le choix du bouton et l'obtenir en lettre (stone, paper, cisors)
function readMyChoice() {
    let choiceString;
    if (document.querySelector('.selected') === null) {
        document.querySelector('#right-fist').hidden = true
        choiceString = '';
    } else {
        //console.log(`${document.querySelector('.selected').id}`)
        choiceString = document.querySelector('.selected').parentNode.id;
    }
    return choiceString;

}

// désactiver les autres boutons
function hidePicture() {
    document.querySelectorAll('.selection:not(img.selected)').forEach((item) =>
        item.hidden = true)
}


function addSelectedClass(event) {
    event.target.classList.add('selected')
    const Spinning = [
        { transform: "scale(1)" },
        { transform: "scale(1.5)" },
      ];
      
      const Timing = {
        duration: 500,
        iterations: 3,
		direction: 'alternate'
      };
    event.target.animate(Spinning, Timing)
    hidePicture();
    return event.target.parentNode.id;
}

function resetButtonAndChoice() {
    let element = document.querySelectorAll('.selected');
    element.forEach((item) => item.classList.remove('selected'));
    document.querySelector('#stone').hidden = false;
    document.querySelector('#paper').hidden = false;
    document.querySelector('#cisors').hidden = false;
    replaceFist('left', 'Attente poing');
    replaceFist('right', 'Attente poing2');
}



// fonction qui génére de façon aléatoire un chiffre entre1 et 3 inclus
function computerChoice() {
    return Math.trunc((Math.random() * 100) % 3) + 1;
}



// 1 : pierre : Stone
// 2 : papier : Paper
// 3 : Ciseaux : Cisors
// on rentre des chiffres 1 à 3 dans cette fonction
function battle(computer, player, displayTimer) {
    let winner = 'égalité';

    if (player == '0') {
        console.log(`Perdu ! computer=  ${computer} player = ${player}`);
        displayTimer.innerText = `You loose !`;
        winner = 'computer';
    } else if (computer == player) {
        console.log(`égalité  computer=  ${computer} player = ${player}`);
        displayTimer.innerText = `Draw ! !`;
        winner = 'égalité';
    } else if (computer == '1' && player == '2') {
        console.log(`Gagné ! computer=  ${computer} player = ${player}`);
        displayTimer.innerText = `You Win !`;
        winner = 'player';
    } else if (computer == '1' && player == '3') {
        console.log(`Perdu ! computer=  ${computer} player = ${player}`);
        displayTimer.innerText = `You Loose !`;
        winner = 'computer';
    } else if (computer == '2' && player == '1') {
        console.log(`Perdu ! computer=  ${computer} player = ${player}`);
        displayTimer.innerText = `You Loose !`;
        winner = 'computer';
    } else if (computer == '2' && player == '3') {
        console.log(`Gagné ! computer=  ${computer} player = ${player}`);
        displayTimer.innerText = `You Win !`;
        winner = 'player';
    } else if (computer == '3' && player == '1') {
        console.log(`Gagné ! computer=  ${computer} player = ${player}`);
        displayTimer.innerText = `You Win !`;
        winner = 'player';
    } else if (computer == '3' && player == '2') {
        console.log(`Perdu ! computer=  ${computer} player = ${player}`);
        displayTimer.innerText = `You Loose !`;
        winner = 'computer';
    } else {
        console.log(`Gagné ! computer=  ${computer} player = ${player}`);
        displayTimer.innerText = `You Win !`;
        winner = 'player';
    }
    // la variable winner contient du texte 'égalité' ou 'player' ou 'computer'
    return winner
}


//permet d'écrire dans le HTML
function writeOneStringHTML(stringToWrite, placeToWriteIt) {
    let place = document.querySelector(placeToWriteIt)
    place.innerText = `${stringToWrite}`;
    place.classList.add('js-added')
}



function replaceFist(side, chosen) {
    document.querySelector(`#${side}-fist img`).src = `assets/img/${chosen}.png`
}

document.querySelector('.back-Home').addEventListener('click',hardQuit)
function hardQuit(){
    window.location.assign('index.html')
}





// Fonctions à la poubelle

//permet d'afficher le plateau de jeu
// function gameInitialize(nbDeParties, displayTimer) {
//     document.querySelector('.selector').style.display = `flex`;
//     document.querySelector('.fist').style.display = `flex`;
//     document.querySelector('.scores').style.display = `flex`;
//     document.querySelector('.round').style.display = `flex`;
//     document.querySelector('.round').style.display = `flex`;
//     writeOneStringHTML('0', '.round p:nth-child(2)');
//     writeOneStringHTML(nbDeParties, '.round p:last-child');
//     displayTimer.style.display = `block`;
// }



