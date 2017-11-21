var formule1 = "(¬(p→((p→q)→q)))";
var formule2 = "(¬(p→((¬q)→(¬(p→q)))))";
var formule3 = "(¬(((¬p)→(¬q))→(q→p)))";
var formule4 = "(¬((p∧(p→q)∧((p→q)→r))→((p∧q)∧r)))"; // ATTENTION probleme: les ET ne sont pas écrits en ligne donc ca bloque la resolution
var formule5 = "(¬((p→q)→((q→r)→(p→r))))";
var formule6 = "(¬((((s∧p)→(q∧r))∧((¬r)∨(¬q))∧p)→(¬s)))"; //ATTENTION : pareil que la 4
var formule7 = "(¬(((p→q)∧((r∧s)→p)∧(t→r)∧(s∧t))→q))"; //ATTENTION : pareil que la 4
var formule8 = "(¬((p→(q→r))→((p→q)→(p→r))))";
var formule9 = "(¬((q→p)→(((¬q)→p)→p)))"; //ATTENTION ? (¬(¬q)) ET (¬q) ne doivent-ils pas "s'annuler" à l'étape d'après ?
var formule10 = "(¬(p→(q→r)→((p→r)∨(q→r))))"; //ATTENTION ? Qui est prioritaire dans p→q→r ( (p→q)→r ou p→(q→r) ???)
var formule11 = "(¬(((p→r)∨(q→r))→(p→(q→r))))";
var formule12 = "(¬((((p→q)∧(q→p))∨(p∧(¬q)))∨((¬p)∧q)))"; //ATTENTION jusqu'a maintenant on faisais (p∧q)∧r au lieu de p∧q∧r pour notre structure de données. Or ici, il faudrait (je pense) que ca se fasse en une etape et pas deux !
var formule13 = "(¬((¬(a∧b))→((¬a)∨(¬b))))"; //ATTENTION ? pareil que 9
var formule14 = "(¬(((¬a)∨(¬b))→(¬(a∧b))))";
var formule15 = "(¬(((a∨b∨(¬c))∧(a∨b∨c)∧(a∨(¬b)))→a))"; //ATTENTION pareil que 12
var formule16 = "(¬((u∧(w→v)∧(t→v)∧(u→(w∨t)))→v))"; //ATTENTION pareil que la 12
var formule17 = "(¬(r∨((p∧(p→q)∧((p→q)→r))→(p∧q∧r))∧(t→(¬r))))"; //ATTENTION pareil que la 12; globalement, quand il y a 3 operandes : normal mais est-ce qu'on doit continuer à mettre des parenthèses?
var formule18 = "(¬((p∨(q→(¬p)))∨((p∧(p→q)∧((p→q)→r))→(p∧q∧r))))"; //PAREIL
var formule19 = "";
var formule20="(¬((((s∧p)→(q∧r))∧((¬r)∨(¬q))∧p)∧(t∧(s→(¬t)))→(¬s)))"; //A essayer

// ¬
// ∨
// ∧
// →
// (¬())

var debut = 0;
var nbCoup = -1;

var formules = [formule20];

function createDiv(type, contenu) {
    var div = document.createElement("div");
    var h3 = document.createElement("h3");
    switch (type) {
        case "et":
            div.setAttribute("class", "center col m12 etape");
            contenu = '|';
            h3.setAttribute("class", "black-text");
            h3.innerHTML = contenu;
            div.appendChild(h3);
            return div;

        case "ouGauche" :
            div.setAttribute("class", "center col m6 etape");
            contenu = '/';
            h3.setAttribute("class", "black-text");
            h3.innerHTML = contenu;
            div.appendChild(h3);
            return div;

        case "ouDroite" :
            div.setAttribute("class", "center col m6 etape");
            contenu = '\\';
            h3.setAttribute("class", "black-text");
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

        default:

    }

}

function ajouterEtape(operation, formule) {
    if (operation !== "doubleNeg") {
        var strform1 = structtostr(formule[0]);
        var strform2 = structtostr(formule[2]);
    }

    var historique = chargerHistorique(historique);

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
        }
        // Vérification de fin de branche
        verifierFin(div);
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
            var sf2 = createDiv("newSF", strform2);
            divDroite.appendChild(sf2);

        }
        verifierFin(divGauche);
        verifierFin(divDroite);
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
        }
        verifierFin(div);
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
    var historique  = chargerHistorique();
    for (var i = 0; i < historique.length; i++) {
        for (var j = 0; j < historique.length; j++) {
            if (historique[i].innerHTML == "(¬" + historique[j].innerHTML + ")") {
                return arbre.className+= " red-text";
            }
        }
    }
}
function addEventListenerOnSfElements() {
    // Event listener sur les sf créées
    var sf = document.getElementsByClassName("sf");
    for (var i = 0; i < sf.length; i++) {
        sf[i].addEventListener("click", check, false);
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
    else {

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
}

function check(event) {
    var target = event.target;
    var contenu = target.innerHTML;
    if(target.getAttribute('ischecked') == 0){
        target.setAttribute('ischecked', 1);
        target.innerHTML = '<i class="material-icons green-text">check</i> ' + contenu;
        chargerArbre(target);
    }

    traiter(contenu);
}



function init() {
    var arbre = document.getElementById("arbre");
    var startBtn = document.getElementById("start");
    var restartBtn = document.getElementById("restart");
    var nbCoups = document.getElementById("nbCoups");
    var phraseNbCoups = document.getElementById("phraseNbCoups");
    var formule = afficheFormule();
    startBtn.addEventListener("click", commencer, false);
    startBtn.addEventListener("click", function x() {
        traiter(formule);
    }, false);
    restartBtn.addEventListener("click", function x() {location.reload();}, false);
}
