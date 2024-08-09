const massesDefault = [0.124, 0.059 + 0.011, 0.130 + 0.059, 0.500];
const innerRadiusDefault = [0.012, 0.012, 0.16, 0.012];
const outterRadiusDefault = [0.054, 0.054, 0.16, 0.160];

var p = 0.012;
// 
function finalFrecFun (I, If, frecIni){
    I = parseFloat(I);
    If = parseFloat(If);
    frecIni = parseFloat(frecIni);
    return (I)/(I+If) * frecIni;
}

function frecAtCollitionFun (I, If, frecFinal) {
    I = parseFloat(I);
    If = parseFloat(If);
    frecFinal = parseFloat(frecFinal);
    return (I+If)/(I) * frecFinal;
}

function momentOfInertiaHollowCylinder (m, r1, r2){
    return 0.5*m*(r1**2+r2**2);
}

function linearVelocity (frec, step){
    return frec*step;
}
function frecuency(vel, step){
    return vel/step;
}
function collisionLinearVelocity(initialVel, k, distance, mass){
    return Math.sqrt(initialVel**2 - (k*distance**2)/(mass));
}

function springRateCritc (initialVel, finalVel, distance, mass){
    return mass*((initialVel**2-finalVel**2)/distance**2);
}


function momentOfInertiaRatio (Itotal, IFlywheel){
    return ((Itotal)/(Itotal + IFlywheel));
}

function springRateCritcAfterCollision (inertiaRatio, initialVel,distance1, distance2, mass){
   return (mass*inertiaRatio**2*initialVel**2)/((inertiaRatio**2-1)*distance1**2+distance2**2);
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
    element.addEventListener("input", showFinialFrec);
});

innerRadius.forEach(element => {
    element.addEventListener("input", showFinialFrec);
});

outterRadius.forEach(element => {
    element.addEventListener("input", showFinialFrec);
});


function showFinialFrec(){
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
        momentsOfInertia.slice(-1), pinionInitialFrec.valueAsNumber );
}

showFinialFrec();

pinionInitialFrec.addEventListener("input", showFinialFrec);

function updateOutput() {
    var omi = document.getElementById("pinion-initial-frec").value;
    if (omi === "") {
        document.getElementById("flywheel-frec").innerHTML = "";
    } else {
        document.getElementById("flywheel-frec").innerHTML = parseFloat(omi) *100;
    }
}

//Plotly.newPlot('myDiv', data);

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

var totalMass =  0;
massesArray.slice(0, -1).forEach(element => {
    totalMass += parseFloat(element.value);
});


initialPinionCritic = frecAtCollitionFun (totalMomentInertia,
    momentsOfInertia.slice(-1), 300);


const initialFrecArray = math.range(400, initialPinionCritic, 0.1, true).toArray();
const finalFrecArray = initialFrecArray.map(frec => finalFrecFun(totalMomentInertia,
     momentsOfInertia.slice(-1), frec));

 // Define the plot data
 var trace1InitialVsFinialFrec = 
    {
        x: initialFrecArray ,
        y: finalFrecArray ,
        type: 'scatter',
        mode: 'lines',
        line: { color: 'red' }
    }
;

const initialFrecArray2 = math.range(initialPinionCritic, 800, 0.1, true).toArray();
const finalFrecArray2 = initialFrecArray2.map(frec => finalFrecFun(totalMomentInertia,
     momentsOfInertia.slice(-1), frec));

var trace2InitialVsFinialFrec = 
    {
        x: initialFrecArray2 ,
        y: finalFrecArray2 ,
        type: 'scatter',
        mode: 'lines',
        line: { color: 'blue' }
    }
;

// Define the plot layout
var layoutInitialVsFinialFrec = {
    title: '',
    xaxis: {
        title: 'Pinion Frecuency at collision [RPM]',
    },
    yaxis: {
        title: 'Final Flywheel Frequency [RPM]',
    }
};

const dataInitialVsFinialFrec = [trace1InitialVsFinialFrec, trace2InitialVsFinialFrec];

Plotly.newPlot('final-frecuency-plot', dataInitialVsFinialFrec, layoutInitialVsFinialFrec);
//// si el ploty no me deja puedes hacer una función

var springRateArray = math.range(10, 200, 0.1, true).toArray();
var frecuencyAtCollision = springRateArray.map(k => frecuency(collisionLinearVelocity(linearVelocity(5000*0.02, p),
 k, 0.05, totalMass)/0.02, p)  );

var traceSpringRateVsFrec =  {
    x: springRateArray ,
    y: frecuencyAtCollision ,
    type: 'scatter',
    mode: 'lines',
    line: { color: 'blue' }
};

var layoutSpringRateVsFrec = {
    title: '',
    xaxis: {
        title: 'Spring Rate [N/m]',
    },
    yaxis: {
        title: 'Pinion Frecuency at collision [RPM]',
    }
};

Plotly.newPlot('pinion-frecuency-spring-plot', [traceSpringRateVsFrec], layoutSpringRateVsFrec);

var inertiaRatio = momentOfInertiaRatio (totalMomentInertia, momentsOfInertia.slice(-1)[0] );

var velocityKcritic1 =  linearVelocity(5000*0.02, p) ;

var kcritic1= springRateCritcAfterCollision (inertiaRatio,
     initialVel = velocityKcritic1,
     distance1=0.05, distance2=0.05+0.004, mass=totalMass);

criticInitialVelocity = linearVelocity( frecAtCollitionFun(totalMomentInertia,
     momentsOfInertia.slice(-1)[0], 300*0.02), p);

var kcritic2 = springRateCritc(linearVelocity(5000*0.02, p), criticInitialVelocity,
 0.05, totalMass);

 var kcritic3 = springRateCritc(linearVelocity(5000*0.02, p), 0,
 0.05, totalMass);


function plotTraces(limits = [], function0){
    funArray = [];
    for (let index = 0; index < limits.length; index++) {
        funArray[index] = function0(limits[index]);
    }
    return funArray;
}

function sqr(x){
    return x**2;
}
