var formule1 = "(¬(p→((p→q)→q)))";
var formule2 = "(¬(p→((¬q)→(¬(p→q)))))";
var formule3 = "(¬(((¬p)→(¬q))→(q→p)))";
var formule4 = "(¬((p∧(p→q)∧((p→q)→r))→((p∧q)∧r)))";
var formule5 = "(¬((p→q)→((q→r)→(p→r))))";
var formule6 = "(¬((((s∧p)→(q∧r))∧((¬r)∨(¬q))∧p)→(¬s)))";
var formule7 = "(¬(((p→q)∧((r∧s)→p)∧(t→r)∧(s∧t))→q))";
var formule8 = "(¬((p→(q→r))→((p→q)→(p→r))))";
var formule9 = "(¬((q→p)→(((¬q)→p)→p)))"; //ATTENTION ? (¬(¬q)) ET (¬q) ne doivent-ils pas "s'annuler" à l'étape d'après ?
var formule10 = "(¬((p→(q→r))→((p→r)∨(q→r))))";
var formule11 = "(¬(((p→r)∨(q→r))→(p→(q→r))))";
var formule12 = "(¬((((p→q)∧(q→p))∨(p∧(¬q)))∨((¬p)∧q)))";
var formule13 = "(¬((¬(a∧b))→((¬a)∨(¬b))))"; //ATTENTION ? pareil que 9
var formule14 = "(¬(((¬a)∨(¬b))→(¬(a∧b))))";
var formule15 = "(¬(((a∨b∨(¬c))∧(a∨b∨c)∧(a∨(¬b)))→a))";
var formule16 = "(¬((u∧(w→v)∧(t→v)∧(u→(w∨t)))→v))";
var formule17 = "(¬(r∨((p∧(p→q)∧((p→q)→r))→(p∧q∧r))∧(t→(¬r))))";

var debut = 0; // passe à 1 au premier choix d'une sous formule
var nbCoup = -1; // compteur de nombre de choix de sous formule

var formules = [formule1,formule2,formule3,formule4,formule5,formule6,formule7,formule8,formule9,formule10,formule11,formule12,formule13,formule14,formule15,formule16,formule17]; // tableau contenant l'ensemble des formules à traiter

function createDiv(type, contenu) {
  var div = document.createElement("div");
  var h3 = document.createElement("h3");
  switch (type) {
    case "et":
    div.setAttribute("class", "center col m12 etape");
    contenu = '|';
    h3.setAttribute("class", "branche");
    h3.innerHTML = contenu;
    div.appendChild(h3);
    return div;

    case "ouGauche" :
    div.setAttribute("class", "center col m6 etape");
    contenu = '/';
    h3.setAttribute("class", "branche");
    h3.innerHTML = contenu;
    div.appendChild(h3);
    return div;

    case "ouDroite" :
    div.setAttribute("class", "center col m6 etape");
    contenu = '\\';
    h3.setAttribute("class", "branche");
    h3.innerHTML = contenu;
    div.appendChild(h3);
    return div;

    case "newSF":
    div.setAttribute("class", "center col m12");
    h3.setAttribute("class", "sf");
    h3.setAttribute("ischecked", 0);
    h3.innerHTML = contenu;
    div.appendChild(h3);
    debut = 1;
    return div;

    case "signalerFin" :
    div.setAttribute("class","center col m12");
    div.innerHTML = '<a class="btn-floating btn-large waves-effect waves-light orange"><i class="material-icons">content_cut</i></a>';
    div.appendChild(h3);
    div.addEventListener("click", function x() { return verifierFin(div);});
    return div;
    break;

  }

}

function ajouterEtape(operation, formule) {
  if ((operation !== "doubleNeg") && (operation !== "multiEt")) {
    var strform1 = structtostr(formule[0]);
    var strform2 = structtostr(formule[2]);
  }

  var historique = chargerHistorique(historique); // remplit le tableau historique de l'ensemble des formules de la branche courante (sur celle où on a cliqué)
  var signalerFin = createDiv("signalerFin");

  if (operation === "et") {
    nbCoup++;
    var div = createDiv("et");
    arbre.appendChild(div);

    if (debut === 0) { // première étape
      var sf1 = createDiv("newSF", strform1);
      div.appendChild(sf1);
      var sf2 = createDiv("newSF", strform2);
      div.appendChild(sf2);
    } else {
      for (var i = 0; i < historique.length; i++) {
        if (historique[i].getAttribute("ischecked") == 0) { // Si la sous formule n'est pas checkée, on l'a raffiche
        var sfHisto = createDiv("newSF", structtostr(historique[i].innerHTML));
        div.appendChild(sfHisto);
      }
    }
    var sf1 = createDiv("newSF", strform1);
    div.appendChild(sf1);
    var sf2 = createDiv("newSF", strform2);
    div.appendChild(sf2);
    div.appendChild(signalerFin);
  }
  // Vérification de fin de branche
  //verifierFin(div);
}
else if (operation === "ou") {
  nbCoup++;
  var divGauche = createDiv("ouGauche");
  arbre.appendChild(divGauche);
  var divDroite = createDiv("ouDroite");
  arbre.appendChild(divDroite);

  if (debut === 0) { // L'historique est vide = première étape
  var sf1 = createDiv("newSF", strform1);
  divGauche.appendChild(sf1);
  var sf2 = createDiv("newSF", strform2);
  divDroite.appendChild(sf2);
} else {
  for (var i = 0; i < historique.length; i++) { // Pour chaque sous formules enregistrées dans l'historique
  if (historique[i].getAttribute("ischecked") == 0) { // Si la sous formule n'est pas checkée, on l'a raffiche
  var sfHisto = createDiv("newSF", structtostr(historique[i].innerHTML));
  divGauche.appendChild(sfHisto);
  sfHisto = createDiv("newSF", structtostr(historique[i].innerHTML));
  divDroite.appendChild(sfHisto);
}
}
var sf1 = createDiv("newSF", strform1);
divGauche.appendChild(sf1);
divGauche.appendChild(signalerFin);
signalerFin = createDiv("signalerFin");
var sf2 = createDiv("newSF", strform2);
divDroite.appendChild(sf2);
divDroite.appendChild(signalerFin);

}
//verifierFin(divGauche);
//verifierFin(divDroite);
} else if (operation == "doubleNeg") {
  nbCoup++;
  var strform = structtostr(formule);

  var div = createDiv("et");
  arbre.appendChild(div);

  if (debut === 0) { // première étape
    var sf = createDiv("newSF", strform);
    div.appendChild(sf);
  } else {
    for (var i = 0; i < historique.length; i++) {
      if (historique[i].getAttribute("ischecked") == 0) { // Si la sous formule n'est pas checkée, on l'a raffiche
      var sfHisto = createDiv("newSF", structtostr(historique[i].innerHTML));
      div.appendChild(sfHisto);
    }
  }
  var sf = createDiv("newSF", strform);
  div.appendChild(sf);
  div.appendChild(signalerFin);
}
//verifierFin(div);
}else if(operation == "multiEt"){
  var cpt =0;
  var div = createDiv("et");
  nbCoup++;
  arbre.appendChild(div);
  while(cpt<formule.length){
    var strform = structtostr(formule[cpt]);
    cpt+=2;
    var sf = createDiv("newSF", strform);
    div.appendChild(sf);
  }
  for (var i = 0; i < historique.length; i++) {
    if (historique[i].getAttribute("ischecked") == 0) { // Si la sous formule n'est pas checkée, on l'a raffiche
    var sfHisto = createDiv("newSF", structtostr(historique[i].innerHTML));
    div.appendChild(sfHisto);
  }
}
div.appendChild(signalerFin);


//verifierFin(div);

}
afficherNbCoups();
addEventListenerOnSfElements();
scrollToBottom();


}

function chargerHistorique() {
  var historique = [];
  var child = arbre.getElementsByClassName("sf");
  for (var i = 0; i < child.length; i++) {
    historique[i] = child[i];
  }
  return historique;
}

function chargerArbre(target) {
  arbre = target;
  while ((arbre.className !== "center col m12 etape") && (arbre.className !== "center col m6 etape")) {
    arbre = arbre.parentNode; // le div
  }

}
function verifierFin(div) {
  chargerArbre(div);
  var signalerFinBtn = arbre.lastChild;
  console.log("btn signaler fin :", signalerFinBtn);
  var historique  = chargerHistorique();
  for (var i = 0; i < historique.length; i++) {
    for (var j = 0; j < historique.length; j++) {
      if (historique[i].innerHTML == "(¬" + historique[j].innerHTML + ")") {
        signalerFinBtn.innerHTML='<a class="btn-floating btn-large waves-effect waves-light green"><i class="material-icons contradictionIcon">⊥</i></a>';
       arbre.className+= " cantClick red-text";
        return Materialize.toast("Bien joué, une contradiciton a été trouvée", 4000) // 4000 is the duration of the toast
      }
    }
  }
  return Materialize.toast("Il n'y a pas de contradiction ici !", 4000) // 4000 is the duration of the toast
}
function addEventListenerOnSfElements() {
  // Event listener sur les sf créées
  var sf = document.getElementsByClassName("sf");
  for (var i = 0; i < sf.length; i++) {
    sf[i].addEventListener("click", check);
  }
}
function scrollToBottom() {
  window.scroll({
    top: document.body.scrollHeight,
    left: 0,
    behavior: 'smooth'
  });
}
function afficherNbCoups() {
  nbCoups.innerHTML = nbCoup;
}

function structtostr(formule) {
  return JSON.stringify(formule).replace(/"/g, "").replace(/,/g, "").replace(/\[/g, "(").replace(/\]/g, ")");
}

function strtostruct(formule) {
  var newFormule = "";
  for (var i = 0; i < formule.length; i++) {
    if ((formule[i] !== "(") && (formule[i] !== ")") && (formule[i + 1] !== ")")) {
      newFormule += "\"" + formule[i] + "\", ";
    }
    else if ((formule[i + 1] === ")") && (formule[i] != "(") && (formule[i] != ")")) {
      newFormule += "\"" + formule[i] + "\"";
    }
    else if (formule[i] === "(") {
      newFormule += "[";
    }
    else if ((formule[i] === ")")) {
      if ((formule[i + 1] != null) && (formule[i + 1] != ")")) {
        newFormule += "], ";
      }
      else {
        newFormule += "]";
      }
    }
  }
  return JSON.parse(newFormule);
}

function traiter(form) {
  form = strtostruct(form);
  var formule_traitee = [];

  if (form.length === 2) { //cas ou on a la negation de qqc
    if (form[1].length === 2) {
      ajouterEtape("doubleNeg", form[1][1]);
    }
    else if (Array.isArray(form[1])) {


      formule_traitee[0] = ["¬", form[1][0]];
      formule_traitee[2] = ["¬", form[1][2]];

      switch (form[1][1]) {
        case "→":
        formule_traitee[0] = form[1][0];
        formule_traitee[1] = "∧";
        ajouterEtape("et", formule_traitee);
        break;
        case "∧":
        formule_traitee[1] = "∨";
        ajouterEtape("ou", formule_traitee);
        break;
        case "∨":
        formule_traitee[1] = "∧";
        ajouterEtape("et", formule_traitee);
        break;
      }
      return formule_traitee;
    }
  }
  else if (form.length === 3) { //cas ou on a une operation logique
    if (form[1] === "→") {
      formule_traitee[0] = ["¬", form[0]];
      formule_traitee[1] = "∨";
      formule_traitee[2] = form[2];
      ajouterEtape("ou", formule_traitee);
    }
    else if (form[1] === "∨") {
      ajouterEtape("ou", form);
    }
    else if (form[1] === "∧") {
      ajouterEtape("et", form);
    }

    return formule_traitee;
  }
  else if(form.length > 3){
    switch(form[1]){
      case "∧" :
      ajouterEtape("multiEt",form);
      break;
    }

  }
  return formule_traitee;
}

function afficheFormule() {
  var rand = Math.floor((Math.random() * formules.length) + 0);
  form = formules[rand]; //Notre formule aléatoirement choisie
  document.getElementById("form").innerHTML = structtostr(form);
  return form;
}

function commencer() {
  document.getElementById("start").remove();
  document.getElementById("restart").remove();
  phraseNbCoups.innerHTML = "Nombre de coups";
  welcomeTxt.remove();
}

function check(event) {
  var target = event.target;
  var contenu = target.innerHTML;
  if((contenu.length == 1) || (contenu.length == 4)){ // p ou (¬p)
    Materialize.toast('Formule non simplifiable !', 4000) // 4000 is the duration of the toast
  }
  else {
    console.log("formule cliquable");
    target.setAttribute('ischecked', 1);
    target.innerHTML = '<i class="material-icons green-text">check</i> ' + contenu;
    chargerArbre(target); // attribue à la variable arbre la div mère de la branche courante (sur celle où on a cliqué)
    desactiveBranche();
    traiter(contenu);
  }
}

function desactiveBranche(){
  var elementsBranche = arbre.children; // tableau de l'ensemble des elements de la branche courante
  for(var i =1; i<elementsBranche.length;i++){
    if((elementsBranche[i].className !== "center col m12 etape") && (elementsBranche[i].className !== "center col m6 etape")){

      elementsBranche[i].className = "grey-text";
      if(elementsBranche[i].firstChild.className == 'btn-floating btn-large waves-effect waves-light orange'){
        elementsBranche[i].firstChild.className+=" grey";
    }
    elementsBranche[i].className+=" cantClick";

  }
}
}

function scrollToSf(){
  var brancheActive =$("[class='btn-floating btn-large waves-effect waves-light orange']");
  if(brancheActive.length > 0) {
    var sf = brancheActive[0]; // la plus proche du bas de la page
    while((sf.className !== "center col m12 etape") && (sf.className !== "center col m6 etape")){
      sf = sf.parentNode;
    }
    console.log(sf);

  return sf.scrollIntoView(false);
  }
}

function init() {
  var arbre = document.getElementById("arbre");
  var startBtn = document.getElementById("start");
  var restartBtn = document.getElementById("restart");
  var nbCoups = document.getElementById("nbCoups");
  var welcomeTxt = document.getElementById("welcomeTxt");
  var phraseNbCoups = document.getElementById("phraseNbCoups");
  var formule = afficheFormule();
  var scrollBtn = document.getElementById("scrollBtn");
  scrollBtn.addEventListener("click", scrollToSf);
  startBtn.addEventListener("click", commencer, false);
  startBtn.addEventListener("click", function x() {
    traiter(formule);
  }, false);
  restartBtn.addEventListener("click", function x() {location.reload();}, false);
}
