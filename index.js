var masses = document.querySelectorAll(".masses");
var innerRadius = document.querySelectorAll(".inner-radius");
var outterRadius = document.querySelectorAll(".outter-radius");


var pinionInitialFrec = document.getElementById("pinion-initial-frec");

const massesDefault = [0.124, 0.059 + 0.011, 0.130 + 0.059, 5.500];
const innerRadiusDefault = [0.012, 0.012, 0.16, 0.012];
const outterRadiusDefault = [0.054, 0.054, 0.16, 0.160];

for (let index = 0; index < 4; index++) {
    masses[index].value = massesDefault[index];
    innerRadius[index].value = innerRadiusDefault[index];
    outterRadius[index].value = outterRadiusDefault[index];
}


pinionInitialFrec.value = 5000;


var masses1 = document.querySelectorAll(".masses.bendix");
var innerRadius1 = document.querySelectorAll(".inner-radius.bendix");
var outterRadius1 = document.querySelectorAll(".outter-radius.bendix");

var masses2 = document.querySelectorAll(".masses.flywheel");
var innerRadius2 = document.querySelectorAll(".inner-radius.flywheel");
var outterRadius2 = document.querySelectorAll(".outter-radius.flywheel");

var step = document.getElementById("step");
var distance = document.getElementById("distance");

step.value = 0.012;
distance.value = 0.005;


var slider = document.getElementById("myRange");
var demo = document.getElementById("demo");


import * as bendixSys from "./components/bendixSystem.js"

var ben = new bendixSys.Component(masses1, innerRadius1, outterRadius1);
var fly = new bendixSys.Component(masses2, innerRadius2, outterRadius2);


var sys = new bendixSys.BendixDynamics(ben, fly, pinionInitialFrec, slider, step, distance);

var critics = sys.critics();

slider.min = 0.3*critics[0];
slider.max = critics[2]*1.2;
slider.value = critics[0];

demo.innerHTML = "K = " + slider.value + " N/m"; // Display the default slider value

sys.plotFinalFrecuency1();
sys.plotPinionFrecuencySpring1();
sys.plotPosition1();



function updateSliderBackground() {
    let critics = sys.critics()
    const min = parseInt(slider.min);
    const max = parseInt(slider.max);

    // Define your limit values
    const limit1 = critics[0];
    const limit2 = critics[1];

    let one = parseFloat((limit1-min)/max.toFixed(2));
    let two = parseFloat((limit2-min)/max.toFixed(2));
    let color1 = "#ff5353";
    let color2 = "#6482AD";
    let background;

    background = `linear-gradient(to right, ${color1} 0%, ${color1} ${one * 100}%, ${color2} ${one * 100}%, ${color2} ${two * 100}%, ${color1} ${two * 100}% , ${color1} 100%)`;

    slider.style.background = background;
}

updateSliderBackground()


// Update the current slider value (each time you drag the slider handle)
var k;
slider.oninput = function() {
     demo.innerHTML =  "K = "+ this.value+ " N/m";
      k = this.value;

      sys.plotFinalFrecuency1();
      sys.plotPinionFrecuencySpring1();
      sys.plotPosition1();

}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        sys.plotFinalFrecuency1();
        sys.plotPinionFrecuencySpring1();
        sys.plotPosition1();
        updateSliderBackground()
    }
});
