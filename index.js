import {finalFrecFun,
    frecAtCollitionFun,
    momentOfInertiaHollowCylinder,
} from  "./components/collisionFunctions.js"


import {linearVelocity,
    frequency,
    collisionLinearVelocity,
    springRateCritc,
    momentOfInertiaRatio,
    springRateCritcAfterCollision
} from  "./components/springFucntions.js"


var masses = document.querySelectorAll(".masses input");
var massesArray = Array.from(masses);
var innerRadius = document.querySelectorAll(".inner-radius input");
var outterRadius = document.querySelectorAll(".outter-radius input");

var pinionInitialFrec = document.getElementById("pinion-initial-frec");
var finalFrec = document.getElementById("flywheel-frec");

const massesDefault = [0.124, 0.059 + 0.011, 0.130 + 0.059, 5.500];
const innerRadiusDefault = [0.012, 0.012, 0.16, 0.012];
const outterRadiusDefault = [0.054, 0.054, 0.16, 0.160];

var p = 0.012;

for (let index = 0; index < 4; index++) {
    masses[index].value = massesDefault[index];
    innerRadius[index].value = innerRadiusDefault[index];
    outterRadius[index].value = outterRadiusDefault[index];
}

pinionInitialFrec.value = 5000;


function getMomentsOfInertia(){
    var momentsOfInertia = []
    for (let index = 0; index < masses.length; index++) {
        momentsOfInertia[index] = momentOfInertiaHollowCylinder(masses[index].value,
            innerRadius[index].value,
                outterRadius[index].value);
    }
    return momentsOfInertia;
};


function getTotalMomentInertia(){
    var totalMomentInertia = 0;

    getMomentsOfInertia().slice(0, -1).forEach(element => {
        totalMomentInertia += parseFloat(element);
    });
    return totalMomentInertia;
};

function getTotalMass(){
    var totalMass =  0;
    massesArray.slice(0, -1).forEach(element => {
        totalMass += parseFloat(element.value);
    });
    return totalMass;
}


function showFinialFrec(){
    var totalMass =  0;
    massesArray.slice(0, -1).forEach(element => {
        totalMass += parseFloat(element.value);
    });
    var momentsOfInertia = getMomentsOfInertia();
    var totalMomentInertia = getTotalMomentInertia();
    finalFrec.value = finalFrecFun (totalMomentInertia,
        momentsOfInertia.slice(-1), pinionInitialFrec.valueAsNumber );
}

showFinialFrec();

pinionInitialFrec.addEventListener("input", showFinialFrec);

masses.forEach(element => {
    element.addEventListener("input", 
        () => {
            showFinialFrec();
            plotFinalFrecuency();
            plotPinionFrecuencySpring();
         });
});

innerRadius.forEach(element => {
    element.addEventListener("input", 
        () => {
            showFinialFrec();
            plotFinalFrecuency();
            plotPinionFrecuencySpring();
         });
});

outterRadius.forEach(element => {
    element.addEventListener("input", 
        () => {
            showFinialFrec();
            plotFinalFrecuency();
            plotPinionFrecuencySpring();
         });
});


function updateOutput() {
    var omi = document.getElementById("pinion-initial-frec").value;
    if (omi === "") {
        document.getElementById("flywheel-frec").innerHTML = "";
    } else {
        document.getElementById("flywheel-frec").innerHTML = parseFloat(omi) *100;
    }
}

import {plotFinalFrecuency} from "./components/plots/plotFinalFrecuency.js"

plotFinalFrecuency(getMomentsOfInertia(),  getTotalMomentInertia(),
 frecAtCollitionFun, finalFrecFun);

 import {plotPinionFrecuencySpring} from "./components/plots/plotPinionFrecuencySpring.js";

 plotPinionFrecuencySpring(getTotalMomentInertia(), getMomentsOfInertia(),
 getTotalMass(), p)

