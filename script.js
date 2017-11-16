var formule = "(¬(p→((p→q)→q)))";
var formule2 = "(¬(p→((¬q)→(¬(p→q)))))";
var formule3 = "(p→((p→q)→q))";
var formule4 = "(¬(p→q))";
var formule5 = "(¬(p∨q))";
var formule6 = "(¬(p∧q))";
var formule7 = "(p∨q)";
var formule8 = "(p∧q)";

var historique = [];

var formules = [formule, formule2, formule3, formule4, formule5, formule6, formule7, formule8];


function ajouterEtape(operation, formule){
    if(operation === "et"){
        var strform1 = structtostr(formule[0]);
        var strform2 = structtostr(formule[2]);

        var div = document.createElement("div"); div.setAttribute("class", "center col m12");
        var h3 = document.createElement("h3"); h3.setAttribute("class","black-text");h3.innerHTML = "|";
        div.appendChild(h3); arbre.appendChild(div);

        if(historique.length === 0){
            console.log("vide");
            var sf1 = document.createElement("div"); sf1.setAttribute("class", "center col m12");
            var sf1_h3 = document.createElement("h3"); sf1_h3.setAttribute("class", "sf"); sf1_h3.setAttribute("ischecked", 0);
            sf1_h3.innerHTML = strform1;
            sf1.appendChild(sf1_h3); div.appendChild(sf1);

            var sf2 = document.createElement("div"); sf2.setAttribute("class", "center col m12");
            var sf2_h3 = document.createElement("h3"); sf2_h3.setAttribute("class", "sf"); sf2_h3.setAttribute("ischecked", 0);
            sf2_h3.innerHTML = strform2;
            sf2.appendChild(sf2_h3); div.appendChild(sf2);

            historique.push(sf1_h3);
            historique.push(sf2_h3);
        }
        else{
            console.log("pas vide");
            for(var i=0; i<historique.length; i++){
                  console.log(historique[i].getAttribute("ischecked"));
                if(historique[i].getAttribute("ischecked") == 0){
                    console.log("je rentre dans le checked 0");
                    var sfHisto = document.createElement("div"); sfHisto.setAttribute("class", "center col m12");
                    var sfHisto_h3 = document.createElement("h3"); sfHisto_h3.setAttribute("class", "sf"); sfHisto_h3.setAttribute("ischecked", 0);
                    sfHisto_h3.innerHTML = structtostr(historique[i].innerHTML);
                    sfHisto.appendChild(sfHisto_h3); div.appendChild(sfHisto);

                }
            }
            var sf1 = document.createElement("div"); sf1.setAttribute("class", "center col m12");
            var sf1_h3 = document.createElement("h3"); sf1_h3.setAttribute("class", "sf"); sf1_h3.setAttribute("ischecked", 0);
            sf1_h3.innerHTML = strform1;
            sf1.appendChild(sf1_h3); div.appendChild(sf1);

            var sf2 = document.createElement("div"); sf2.setAttribute("class", "center col m12");
            var sf2_h3 = document.createElement("h3"); sf2_h3.setAttribute("class", "sf"); sf2_h3.setAttribute("ischecked", 0);
            sf2_h3.innerHTML = strform2;
            sf2.appendChild(sf2_h3); div.appendChild(sf2);

            historique.push(sf1_h3);
            historique.push(sf2_h3);
        }


        console.log(historique);
    }
    else if(operation === "ou"){
        var divLeft = document.createElement("div"); divLeft.setAttribute("class", "center col m6");
        var arrowLeft_h3 = document.createElement("h3"); arrowLeft_h3.setAttribute("class","black-text"); arrowLeft_h3.innerHTML = "/";
        divLeft.appendChild(arrowLeft_h3); arbre.appendChild(divLeft);

        var sf1 = document.createElement("div"); sf1.setAttribute("class", "center col m12");
        var sf1_h3= document.createElement("h3");  sf1_h3.setAttribute("class", "sf"); sf1_h3.innerHTML = structtostr(formule[0]);
        sf1.appendChild(sf1_h3); divLeft.appendChild(sf1);


        var divRight = document.createElement("div"); divRight.setAttribute("class", "center col m6");
        var arrowRight_h3 = document.createElement("h3"); arrowRight_h3.setAttribute("class","black-text"); arrowRight_h3.innerHTML = "\\";
        divRight.appendChild(arrowRight_h3); arbre.appendChild(divRight);

        var sf2 = document.createElement("div"); sf2.setAttribute("class", "center col m12");
        var sf2_h3 = document.createElement("h3");sf2_h3.setAttribute("class", "sf"); sf2_h3.innerHTML = structtostr(formule[2]);
        sf2.appendChild(sf2_h3); divRight.appendChild(sf2);

    }

    // Event listener sur les sf créées
    var sf = document.getElementsByClassName("sf");
    for(var i=0;i<sf.length;i++) {
        sf[i].addEventListener("click", check, false);
    }
}

function structtostr(formule){
    return JSON.stringify(formule).replace(/"/g, "").replace(/,/g, "").replace(/\[/g, "(").replace(/\]/g, ")");
}

function strtostruct(formule){
    var newFormule = "";
    for(var i = 0; i < formule.length; i++) {
        if((formule[i] !== "(")&&(formule[i] !== ")") && (formule[i+1] !==")")) {
            newFormule += "\"" + formule[i] + "\", ";
            //console.log(newFormule);
        }
        else if((formule[i+1] === ")")&&(formule[i] != "(")&&(formule[i] != ")")){
            newFormule += "\"" + formule[i] + "\"";
        }
        else if(formule[i] === "("){
            newFormule += "[";
        }
        else if((formule[i] === ")")) {
            if((formule[i+1] != null)&& (formule[i+1] != ")")){
                newFormule += "], ";
            }
            else{
                newFormule += "]";
            }
        }
    }

    return JSON.parse(newFormule);
}

function traiter(form){
    form = strtostruct(form);
    var formule_traitee = [];

    if(form.length === 2){ //cas ou on a la negation de qqc
        if(form[1].length === 2){
            //todo
            return traiter(form[1][1]);
        }
        else if(Array.isArray(form[1])){


            formule_traitee[0] = ["¬", form[1][0]];
            formule_traitee[2] = ["¬", form[1][2]];

            switch(form[1][1]){
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
    else if(form.length === 3){ //cas ou on a une operation logique
        if(form[1] === "→"){
            console.log("toto");
            formule_traitee[0] = ["¬", form[0]];
            formule_traitee[1] = "∨";
            formule_traitee[2] = form[2];
            ajouterEtape("ou", formule_traitee);
        }
        else if(form[1] === "∨"){
            ajouterEtape("ou", form);
        }
        else if(form[1] === "∧"){
            ajouterEtape("et", form);
        }

        return formule_traitee;
    }
    else{

    }
    return formule_traitee;
}

function afficheFormule() {
    var rand = Math.floor((Math.random() * formules.length) + 0);
    console.log(rand);//Index random qui va choisir la formule à traiter
    form = formules[rand]; //Notre formule aléatoirement choisie
    document.getElementById("form").innerHTML = structtostr(form);
    console.log(strtostruct(form));
    return form;
}

function commencer(){
    document.getElementById("start").remove();
    document.getElementById("restart").remove();
}

function check(event){
    var target = event.target;
    var contenu = target.innerHTML;target.setAttribute('ischecked', 1);
    target.innerHTML = '<i class="material-icons green-text">check</i> ' + contenu;
    traiter(contenu);
}

function init(){
    var arbre = document.getElementById("arbre");
    var startBtn = document.getElementById("start");
    var restartBtn = document.getElementById("restart")
    var formule = afficheFormule();
    startBtn.addEventListener("click", commencer, false);
    startBtn.addEventListener("click", function x() {traiter(formule);}, false);
    restartBtn.addEventListener("click", afficheFormule, false);
}
