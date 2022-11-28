let cases = [...document.getElementsByClassName("case")];
let joueur = document.getElementById("joueur");
let score1 = document.getElementById("score1");
let score2 = document.getElementById("score2");
let scoreNul = document.querySelector(".scoreNul");
let modal = document.querySelector(".modalHome");
let btnRejouer = document.getElementById("buttonRejouer");
let btnReset = document.getElementById("buttonReset");
let numberWinJoueur = document.getElementById("numWinJoueur");
let modalTextSuccess = document.getElementById("modaltextSuccess");
let modalTextMatchNull = document.getElementById("modaltextMatchNull");

let state = {
  joueurEnCours: 1,
  scoreJ1: 0,
  scoreJ2: 0,
  matchsNul: 0,
  c1: 0,
  c2: 0,
  c3: 0,
  c4: 0,
  c5: 0,
  c6: 0,
  c7: 0,
  c8: 0,
  c9: 0,
};

// Reset Case in State
function resetcaseInState() {
  state.joueurEnCours = 1;
  state.c1 = 0;
  state.c2 = 0;
  state.c3 = 0;
  state.c4 = 0;
  state.c5 = 0;
  state.c6 = 0;
  state.c7 = 0;
  state.c8 = 0;
  state.c9 = 0;
}

function verifierVicatoire() {
  if (
    (state.c1 == state.c2 && state.c2 == state.c3 && state.c1 > 0) ||
    (state.c1 == state.c4 && state.c4 == state.c7 && state.c1 > 0) ||
    (state.c2 == state.c5 && state.c5 == state.c8 && state.c2 > 0) ||
    (state.c3 == state.c6 && state.c6 == state.c9 && state.c3 > 0) ||
    (state.c4 == state.c5 && state.c5 == state.c6 && state.c4 > 0) ||
    (state.c7 == state.c8 && state.c8 == state.c9 && state.c7 > 0) ||
    (state.c1 == state.c5 && state.c5 == state.c9 && state.c1 > 0) ||
    (state.c3 == state.c5 && state.c5 == state.c7 && state.c3 > 0)
  ) {
    return true;
  } else if (
    state.c1 !== 0 &&
    state.c2 !== 0 &&
    state.c3 !== 0 &&
    state.c4 !== 0 &&
    state.c5 !== 0 &&
    state.c6 !== 0 &&
    state.c7 !== 0 &&
    state.c8 !== 0 &&
    state.c9 !== 0
  ) {
    return null;
  } else {
    return false;
  }
}

function displayModal() {
  modal.style.visibility = "visible";
  if (verifierVicatoire() == true) {
    modalTextMatchNull.style.visibility = "hidden";
    modalTextMatchNull.style.height = 0;
    modalTextMatchNull.style.width = 0;
    modalTextSuccess.style.visibility = "inherit";
    modalTextSuccess.style.height = "inherit";
    modalTextSuccess.style.width = 100 + "%";
  } else if (verifierVicatoire() === null) {
    modalTextSuccess.style.visibility = "hidden";
    modalTextSuccess.style.height = 0;
    modalTextSuccess.style.width = 0;
    modalTextMatchNull.style.visibility = "inherit";
    modalTextMatchNull.style.height = "inherit";
    modalTextMatchNull.style.width = 100 + "%";
  }
}

function hideyModal() {
  modal.style.visibility = "hidden";
}

function incrementScore(elem1, elem2) {
  elem1.textContent = elem2;
}

function jouerCase(e) {
  let idCase = e.target.id;
  if (state[idCase] !== 0) return;
  state[idCase] = state.joueurEnCours;
  let isVictoire = verifierVicatoire();
  if (isVictoire == true) {
    if (state.joueurEnCours == 1) {
      e.target.textContent = "X";
      state.scoreJ1++;
      incrementScore(score1, state.scoreJ1);
      numberWinJoueur.textContent = 1;
    } else {
      e.target.textContent = "O";
      state.scoreJ2++;
      incrementScore(score2, state.scoreJ2);
      numberWinJoueur.textContent = 2;
    }
    displayModal();
  } else if (isVictoire === null) {
    if (state.joueurEnCours == 1) {
      e.target.textContent = "X";
    } else {
      e.target.textContent = "O";
    }
    state.matchsNul++;
    scoreNul.textContent = state.matchsNul;
    displayModal();
  } else if (isVictoire == false) {
    if (state.joueurEnCours == 1) {
      e.target.textContent = "X";
      state.joueurEnCours = 2;
      joueur.textContent = state.joueurEnCours;
    } else {
      e.target.textContent = "O";
      state.joueurEnCours = 1;
      joueur.textContent = state.joueurEnCours;
    }
  }
}

//  Function for modal button

btnRejouer.addEventListener("click", function () {
  resetcaseInState();
  cases.forEach((el) => {
    el.textContent = "";
  });
  hideyModal();
});

btnReset.addEventListener("click", function () {
  state.scoreJ1 = 0;
  state.scoreJ2 = 0;
  resetcaseInState();
  cases.forEach((el) => {
    el.textContent = "";
  });
  incrementScore(score1, state.scoreJ1);
  incrementScore(score2, state.scoreJ2);
  scoreNul.textContent = 0;
  hideyModal();
});

// Add event listener for each case
cases.forEach((el) => {
  el.addEventListener("click", jouerCase);
});
