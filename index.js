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


var masses = document.querySelectorAll(".masses");
var massesArray = Array.from(masses);
var innerRadius = document.querySelectorAll(".inner-radius");
var outterRadius = document.querySelectorAll(".outter-radius");

var pinionInitialFrec = document.getElementById("pinion-initial-frec");

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

 import {plotPinionFrecuencySpring,
     springCritics} from "./components/plots/plotPinionFrecuencySpring.js";


 var critics = springCritics(getTotalMomentInertia(), getMomentsOfInertia(),
 getTotalMass(), p);

import {plotPosition} from "./components/plots/plotPosition.js";


var slider = document.getElementById("myRange");
var demo = document.getElementById("demo");

slider.min = 2;
slider.max = critics[2];
demo.innerHTML = slider.value; // Display the default slider value

function updateSliderBackground() {
    const min = parseInt(slider.min);
    const max = parseInt(slider.max);

    // Define your limit values
    const limit1 = critics[0];
    const limit2 = critics[1];

    let one = parseFloat((limit1-min)/max.toFixed(2));
    


    let background;

    background = `linear-gradient(to right, red ${one * 100}%, blue ${two * 100}%, red ${two * 100}%)`;

    slider.style.background = background;
}



plotPinionFrecuencySpring(getTotalMomentInertia(), getMomentsOfInertia(),
getTotalMass(), p, slider.value);


plotPosition(0.05, linearVelocity(5000*0.02, p),
 finalFrecFun(getTotalMomentInertia(), getMomentsOfInertia().slice(-1)[0],
 linearVelocity(5000*0.02, p) ) 
 , slider.value, getTotalMass())

// Update the current slider value (each time you drag the slider handle)
var k;
slider.oninput = function() {
  demo.innerHTML = this.value;
  k = this.value;
  plotPosition(0.05, linearVelocity(5000*0.02, p),
        finalFrecFun(getTotalMomentInertia(), getMomentsOfInertia().slice(-1)[0],
        linearVelocity(5000*0.02, p) ), 
        k, getTotalMass());

 plotPinionFrecuencySpring(getTotalMomentInertia(), getMomentsOfInertia(),
    getTotalMass(), p, slider.value);
}
