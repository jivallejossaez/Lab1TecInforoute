
class tache {
    nom = "";
    priorite = "";
    heure = "";
    minutes = "";
    secondes = "";

    constructor(nom, priorite, heure, minutes, secondes) {
        this.nom = nom,
            this.priorite = priorite,
            this.heure = heure,
            this.minutes = minutes,
            this.secondes = secondes
    }
    get nom() { return this.nom; }
    get priorite() { return this.priorite }
    get heure() { return this.heure }
    get minutes() { return this.minutes }
    get secondes() { return this.secondes }

}

class bilan {
    cantiteTachesEnCours = 0;
    constructor() {

    }
    getTachesEnCours() { return this.cantiteTachesEnCours; }
}

$(document).ready(function () {
    creerElementsTache();
});
 

const tache1 = new tache("Tache1", "haute", "12", "40", "23");
const tache2 = new tache("Tache1", "basse", "12", "40", "23");
const tache3 = new tache("Tache1", "faible", "12", "40", "23");
const allTaches = [tache1, tache2, tache3];

function refreshDataBilan() {

}

function AjouterTache() {
    var titleTache = $("#titleTacheModal")[0].value;
    var prioriteTache = $("#idChoisir")[0].value;
    var heureTache = $("#heure")[0].value;
    var minuteTache = $("#minutes")[0].value;
    var secTache = $("#secondes")[0].value;
    $("#mainTitleTache")[0].value = '';
    console.log( $("#idForm"));
    $('#modalCreer').modal('toggle');

}
function handleTitleTache() {
    var data = $("#mainTitleTache")[0].value;
    console.log(data);
    $("#titleTacheModal")[0].value = data;
}

function reinitialicer() {
    $("#titleTacheModal")[0].value = '';
    $("#mainTitleTache")[0].value = '';
    $("#heure")[0].value = '';
    $("#minutes")[0].value = '';
    $("#secondes")[0].value = '';
}
function getTacheData() {
    var form = document.forms['formTache'];
    //console.log(document.getElementById('mainTitleTache'));
    console.log( $("idForm").serialize());
}


function creerElementsTache() {
    for (i = 0; i < allTaches.length; i++) {
        var tacheAjout = allTaches[i];
        var newTache = document.createElement("div");
        $(newTache).attr({
            class: "row",
            id: "tacheId" + i
        })

        //créer div nom tache
        var nomdiv = document.createElement("div");
        nomdiv.setAttribute("class", "col");
        var nomP = document.createElement("p");
        nomP.innerHTML = tacheAjout.nom;
        nomdiv.append(nomP);
        newTache.append(nomdiv);

        //créer div priorité
        var prioriDiv = document.createElement("div");
        prioriDiv.setAttribute("class", "col");
        var prioriBtn = document.createElement("button");
        $(prioriBtn).attr({
            id: "btnPriorite",
            type: "button",
            class: "btn btn-light",
            disabled: ""
        })
        prioriBtn.innerHTML = tacheAjout.priorite;
        prioriDiv.append(prioriBtn);
        newTache.append(prioriDiv);

        //créer div chrono
        var chronoDiv = document.createElement("div");
        chronoDiv.setAttribute("class", "col");
        var chronoBtn = document.createElement("button");
        $(chronoBtn).attr({
            id: "btnChrono",
            type: "button",
            class: "btn btn-light",
            disabled: ""
        })
        var chronostr = tacheAjout.heure + " : " + tacheAjout.minutes + " : " + tacheAjout.secondes;
        chronoBtn.innerHTML = chronostr;
        chronoDiv.append(chronoBtn);
        newTache.append(chronoDiv);

        //créer div avec icons
        var boutonsDiv = document.createElement("div");
        boutonsDiv.setAttribute("class", "col");
        var supBtn = document.createElement("button");
        $(supBtn).attr({
            class: "btn btn-default fas fa-trash-alt",
            type: "button",
            id: "btnSupprimer"
        })
        var checkBtn = document.createElement("button");
        $(checkBtn).attr({
            class: "btn btn-default fas fa-check",
            type: "button",
            id: "btnCheck"
        })
        var editBtn = document.createElement("button");
        $(editBtn).attr({
            class: "btn btn-default fas fa-pencil-alt",
            type: "button",
            id: "btnEdit"
        })
        boutonsDiv.append(supBtn);
        boutonsDiv.append(checkBtn);
        boutonsDiv.append(editBtn)
        newTache.append(boutonsDiv);

        $("div.container").append(newTache);

        $(newTache).css({
            "padding": "1%",
            "border": "1px solid",
            "margin": "1%"
        })
    }


}


