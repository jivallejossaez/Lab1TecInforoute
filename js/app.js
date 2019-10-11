class tache {
    nom = "";
    priorite = "";
    heure = "";
    minutes = "";
    secondes = "";
    retard = false;

    constructor(nom, priorite, heure, minutes, secondes) {
        this.nom = nom,
            this.priorite = priorite,
            this.heure = heure,
            this.minutes = minutes,
            this.secondes = secondes
    }
    nom() { return this.nom; }
    priorite() { return this.priorite }
    heure() { return this.heure }
    minutes() { return this.minutes }
    secondes() { return this.secondes }
    setHeure(h) { this.heure = h }
    setMinutes(m) { this.minutes = m }
    setSecondes(s) { this.secondes = s }
}

class bilanClass {
    tEnCours = 0;
    tAchevees = 0;
    tEnRetard = 0;
    tAcheveesEnRetard = 0;
    tAcheveesATemps = 0;
    total = 0;

    constructor() {}
    enCours() { return this.tEnCours }
    Achevees() { return this.tAchevees }
    Retard() { return this.tEnRetard }
    AcheveesRetard() { return this.AcheveesRetard }
    AcheveesTemps() { return this.AcheveesTemps }
    total() { return this.total }

    incEnCours() { this.tEnCours++ }
    incAchevees() { this.tAchevees++ }
    incEnRetard() { this.tEnRetard++ }
    incAcheveesEnRetard() { this.tAcheveesEnRetard++ }
    incAcheveesATemps() { this.tAcheveesATemps++ }
    incTotal() { this.total++ }

    deincEnCours() { this.tEnCours-- }
    deincAchevees() { this.tAchevees-- }
    deincEnRetard() { this.tEnRetard-- }
    deincAcheveesEnRetard() { this.tAcheveesEnRetard-- }
    deincAcheveesATemps() { this.tAcheveesATemps-- }
    deincTotal() { this.total-- }

    calculerPourc() {
        if (this.tEnCours == 0) {
            $("#tachesCoursPourcent")[0].textContent = 0 + "%";
        } else {
            var pour = (this.tEnCours / this.total) * 100;
            $("#tachesCoursPourcent")[0].textContent = pour.toFixed(2) + "%";
        }

        if (this.tAchevees == 0) {
            $("#tachesAchevesPourcent")[0].textContent = 0 + "%";
        } else {
            pour = (this.tAchevees / this.total) * 100;
            $("#tachesAchevesPourcent")[0].textContent = pour.toFixed(2) + "%";
        }

        if (this.tEnRetard == 0) {
            $("#tachesRetardPourcent")[0].textContent = 0 + "%";
        } else {
            pour = (this.tEnRetard / this.total) * 100;
            $("#tachesRetardPourcent")[0].textContent = pour.toFixed(2) + "%";
        }

        if (this.tAcheveesEnRetard == 0) {
            $("#tachesAchevesRetardPourcent")[0].textContent = 0 + "%";
        } else {
            pour = (this.tAcheveesEnRetard / this.total) * 100;
            $("#tachesAchevesRetardPourcent")[0].textContent = pour.toFixed(2) + "%";
        }

        if (this.tAcheveesATemps == 0) {
            $("#tachesAchevesTempsPourcent")[0].textContent = 0 + "%";
        } else {
            pour = (this.tAcheveesATemps / this.total) * 100;
            $("#tachesAchevesTempsPourcent")[0].textContent = pour.toFixed(2) + "%";
        }
    }

    upDateAffichage() {
        //calculer pourcetage
        //update l'affichage dans la fenêtre modale
        this.calculerPourc();
        $("#TotalTaches")[0].textContent = this.total;
        $("#tachesCoursQuant")[0].textContent = this.tEnCours;
        $("#tachesAchevesQuant")[0].textContent = this.tAchevees;
        $("#tachesRetardQuant")[0].textContent = this.tEnRetard;
        $("#tachesAchevesRetardQuant")[0].textContent = this.tAcheveesEnRetard;
        $("#tachesAchevesTempsQuant")[0].textContent = this.tAcheveesATemps;
    }
}

function upDateAffichage() {
    Bilan.upDateAffichage();
}

function onInputChange() {
    if ($('#mainTitleTache')[0].value != '') {
        $('#btnAjouter').removeAttr('disabled');
    } else {
        $('#btnAjouter').attr('disabled', 'disabled');
    }
}

function chrono(x) {
    var timer = setInterval(function() {
        var secondes = parseInt(allTaches[x].secondes);
        var min = parseInt(allTaches[x].minutes);
        var heure = parseInt(allTaches[x].heure);
        if (secondes == 0) {
            secondes = 59;
            allTaches[x].setSecondes(secondes);
            if (min == 0) {
                min = 59;
                allTaches[x].setMinutes(59);
                if (heure == 0) {
                    tacheEnRetard()
                } else {
                    heure--;
                    allTaches[x].setHeure(heure);
                }
            } else {
                min--;
                allTaches[x].setMinutes(min);
            }

        } else {
            secondes--;
            allTaches[x].setSecondes(secondes);
        }
        $('#' + x + ' #btnChrono')[0].innerText = heure + ' : ' + min + ' : ' + secondes;
    }, 1000);
}

function tacheEnRetard(id) {
    //changer coleurs
    //call to bilan
    Bilan.Retard();


}

function modifierTache(id) {
    var titleTache = $('#' + id)[0].value;
    var tacheModifier = new tache()
    tacheModifier = allTaches.find(x => x.nom() == titleTache);


    $("#titleTacheModal")[0].value = tacheModifier.nom();
    $('#selectPriorite').prop('selectedIndex', 0);
    $("#heure")[0].value = tacheModifier.heure();
    $("#minutes")[0].value = tacheModifier.minutes();
    $("#secondes")[0].value = tacheModifier.secondes();

    /////ici modifier la tacheeee
    var data = $("#mainTitleTache")[0].value;
    console.log(data);
    $("#titleTacheModal")[0].value = data;



    var titleTache = $("#titleTacheModal")[0].value;
    var prioriteTache = $("#selectPriorite")[0].value;
    var heureTache = $("#heure")[0].value;
    var minuteTache = $("#minutes")[0].value;
    var secTache = $("#secondes")[0].value;
    var tchx = new tache(titleTache, prioriteTache, heureTache, minuteTache, secTache);
    creerUneTache(tchx);
    allTaches.push(tchx);
    $("#mainTitleTache")[0].value = '';
    console.log('data: ', titleTache, prioriteTache, heureTache, minuteTache, secTache);
    reinitialicer();
    $('#modalCreer').modal('toggle');

}

function creerUneTache(tacheAjout) {

    var newTache = document.createElement("div");
    $(newTache).attr({
        class: "row",
        id: i
    });

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
        id: "btnPriorite" + i,
        type: "button",
        disabled: ""
    })
    if (tacheAjout.priorite == "haute") {
        $(prioriBtn).attr({ class: "btn btn-danger col-md-12" })
    } else if (tacheAjout.priorite == "moyenne") {
        $(prioriBtn).attr({ class: "btn btn-warning col-md-12" })
    } else {
        $(prioriBtn).attr({ class: "btn btn-info col-md-12" })
    }

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
        class: "btn btn-default fas fa-trash-alt boutonSup" + i,
        type: "button",
        id: i,
        onClick: "supprimer(this.id)"
    })
    var checkBtn = document.createElement("button");
    $(checkBtn).attr({
        class: "btn btn-default fas fa-check boutonCheck" + i,
        type: "button",
        id: i,
        onClick: "check(this.id)"
    })
    var editBtn = document.createElement("button");
    $(editBtn).attr({
        class: "btn btn-default fas fa-pencil-alt boutonEdit" + i,
        type: "button",
        id: i
    })


    $(editBtn).css("margin", "1px");
    $(checkBtn).css("margin", "1px");
    $(supBtn).css("margin", "1px");
    boutonsDiv.append(supBtn);
    boutonsDiv.append(checkBtn);
    boutonsDiv.append(editBtn);
    newTache.append(boutonsDiv);

    $(newTache).css({
        "padding": "1%",
        "border": "1px solid",
        "margin": "1%"
    })
    $("div.container").append(newTache);

    Bilan.incTotal();
    Bilan.incEnCours();


    Bilan.upDateAffichage();
    chrono(i);
    i++;

}

function creerElementsTache() {
    for (i = 0; i < allTaches.length; i++) {

        var tacheAjout = allTaches[i];

        var newTache = document.createElement("div");
        $(newTache).attr({
            class: "row",
            id: i
        });

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
            id: "btnPriorite" + i,
            type: "button",
            disabled: ""
        })
        if (tacheAjout.priorite == "haute") {
            $(prioriBtn).attr({ class: "btn btn-danger col-md-12" })
        } else if (tacheAjout.priorite == "moyenne") {
            $(prioriBtn).attr({ class: "btn btn-warning col-md-12" })
        } else {
            $(prioriBtn).attr({ class: "btn btn-info col-md-12" })
        }

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
            class: "btn btn-default fas fa-trash-alt boutonSup" + i,
            type: "button",
            id: i,
            onClick: "supprimer(this.id)"
        })
        var checkBtn = document.createElement("button");
        $(checkBtn).attr({
            class: "btn btn-default fas fa-check boutonCheck" + i,
            type: "button",
            id: i,
            onClick: "check(this.id)"
        })
        var editBtn = document.createElement("button");
        $(editBtn).attr({
            class: "btn btn-default fas fa-pencil-alt boutonEdit" + i,
            type: "button",
            id: i
        })

        $(editBtn).css("margin", "1px");
        $(checkBtn).css("margin", "1px");
        $(supBtn).css("margin", "1px");
        boutonsDiv.append(supBtn);
        boutonsDiv.append(checkBtn);
        boutonsDiv.append(editBtn);
        newTache.append(boutonsDiv);

        $(newTache).css({
            "padding": "1%",
            "border": "1px solid",
            "margin": "1%"
        })
        $("div.container").append(newTache);
        Bilan.incTotal();
        Bilan.incEnCours();
        chrono(i);
    }

    Bilan.upDateAffichage();

}

function supprimer(id) {
    //si tache est en retard il faut décrimenter tache en retard
    Bilan.deincEnCours();
    Bilan.deincTotal();
    Bilan.upDateAffichage();
    $("div #" + id).hide();
}

function check(id) {
    $("div #" + id).css("text-decoration", "line-through");
    var textPriorite = $("#btnPriorite" + id).text();
    $("#btnPriorite" + id).html("<strike>" + textPriorite + "</strike>");
    $("#btnPriorite" + id).attr({ class: "btn btn-light col-md-12" })
    document.getElementsByClassName("boutonEdit" + id)[0].disabled = true;
    document.getElementsByClassName("boutonCheck" + id)[0].disabled = true;
    document.getElementsByClassName("boutonSup" + id)[0].disabled = true;

    //si la tache est en retard 
    //incrémenter terminé en retard du bilan
    Bilan.deincEnCours();
    Bilan.incAchevees();
    Bilan.upDateAffichage();

}


function handleTitleTache() {
    var data = $("#mainTitleTache")[0].value;
    console.log(data);
    $("#titleTacheModal")[0].value = data;
}

function reinitialicer() {
    $("#titleTacheModal")[0].value = '';
    $("#mainTitleTache")[0].value = '';
    $('#selectPriorite').prop('selectedIndex', 0);
    $("#heure")[0].value = '';
    $("#minutes")[0].value = '';
    $("#secondes")[0].value = '';
    onInputChange();
}

function validateAjouterTache() {
    $('#btnAjouter').attr('disabled', 'disabled');
    $('#mainTitleTache').change(function() {
        if ($(this).val != '') {
            $('#btnAjouter').removeAttr('disabled');
        }
        if ($(this).val === '') {
            $('#btnAjouter').attr('disabled', 'disabled');
        }
    });
}

function validateTime() {
    if (condition) {
        return true
    } else {
        return false
    }
}

function ValiderModal() {


}

function AjouterTache() {
    var titleTache = $("#titleTacheModal")[0].value;
    var prioriteTache = $("#selectPriorite")[0].value;
    var heureTache = $("#heure")[0].value;
    var minuteTache = $("#minutes")[0].value;
    var secTache = $("#secondes")[0].value;
    var tchx = new tache(titleTache, prioriteTache, heureTache, minuteTache, secTache);
    creerUneTache(tchx);
    allTaches.push(tchx);
    $("#mainTitleTache")[0].value = '';
    console.log('data: ', titleTache, prioriteTache, heureTache, minuteTache, secTache);
    reinitialicer();
    $('#modalCreer').modal('toggle');
}

$(document).ready(function() {
    $('#btnAjouter').attr('disabled', 'disabled');
    creerElementsTache();


});

const allTaches = [];
var Bilan = new bilanClass();