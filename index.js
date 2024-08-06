const massesDefault = [0.124, 0.059 + 0.011, 0.130 + 0.059, 0.500];
const innerRadiusDefault = [0.012, 0.012, 0.16, 0.012];
const outterRadiusDefault = [0.054, 0.054, 0.16, 0.160];

// 
function finalFrecFun (I, If, frecIni){
    I = parseFloat(I);
    If = parseFloat(If);
    frecIni = parseFloat(frecIni);
    return (I)/(I+If) * frecIni;
}
function frecAtCollitionFun (I, If, frecFinal) {
    return (I+If)/(I) * frecFinal;
}
function momentOfInertiaHollowCylinder (m, r1, r2){
    return 0.5*m*(r1**2+r2**2);
}


var masses = document.querySelectorAll(".masses input");
var massesArray = Array.from(masses);
var innerRadius = document.querySelectorAll(".inner-radius input");
var outterRadius = document.querySelectorAll(".outter-radius input");

var pinionInitialFrec = document.getElementById("pinion-initial-frec");
var finalFrec = document.getElementById("flywheel-frec");

for (let index = 0; index < 4; index++) {
    masses[index].value = massesDefault[index];
    innerRadius[index].value = innerRadiusDefault[index];
    outterRadius[index].value = outterRadiusDefault[index];
}

pinionInitialFrec.value = 5000;


masses.forEach(element => {
    element.addEventListener("input", hola);
});

innerRadius.forEach(element => {
    element.addEventListener("input", hola);
});

outterRadius.forEach(element => {
    element.addEventListener("input", hola);
});


function hola(){
    var totalMass =  0;
    massesArray.slice(0, -1).forEach(element => {
        totalMass += parseFloat(element.value);
    });

    var momentsOfInertia = []
    for (let index = 0; index < masses.length; index++) {
        momentsOfInertia[index] = momentOfInertiaHollowCylinder(masses[index].value,
            innerRadius[index].value,
             outterRadius[index].value);
    }
    
    var totalMomentInertia = 0;
    momentsOfInertia.slice(0, -1).forEach(element => {
        totalMomentInertia += parseFloat(element);
    });
    
    finalFrec.value = finalFrecFun (totalMomentInertia,
        momentsOfInertia.slice(-1), pinionInitialFrec.value );

    
}

hola();

pinionInitialFrec.addEventListener("input", hola);

// Initialize the output with the default input value
//updateOutput();

function updateOutput() {
    var omi = document.getElementById("pinion-initial-frec").value;
    if (omi === "") {
        document.getElementById("flywheel-frec").innerHTML = "";
    } else {
        document.getElementById("flywheel-frec").innerHTML = parseFloat(omi) *100;
    }
}
