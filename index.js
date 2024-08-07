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


initialPinionCritic = frecAtCollitionFun (totalMomentInertia,
    momentsOfInertia.slice(-1), 300);


const initialFrecArray = math.range(400, initialPinionCritic, 0.1, true).toArray();
const finalFrecArray = initialFrecArray.map(frec => finalFrecFun(totalMomentInertia,
     momentsOfInertia.slice(-1), frec));

// Create a list of colors based on the threshold
const colors2 = finalFrecArray.map(value => value > 300 ? 'red' : 'blue');

 // Define the plot data
 var trace1 = 
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

var trace2 = 
    {
        x: initialFrecArray2 ,
        y: finalFrecArray2 ,
        type: 'scatter',
        mode: 'lines',
        line: { color: 'blue' }
    }
;

// Define the plot layout
    var layout = {
        title: '',
        xaxis: {
            title: 'Pinion Frecuency at collision [RPM]',
        },
        yaxis: {
            title: 'Final Flywheel Frequency [RPM]',
        }
    };

    const data = [trace1, trace2];

    // Plot the sine function
    Plotly.newPlot('final-frecuency-plot', data, layout);


////////////////////////////////////////
    const x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const y = [1, 3, 2, 5, 4, 7, 6, 8, 10, 9];
    const threshold = 5;

    // Create a list of colors based on the threshold
    const colors = y.map(value => value > threshold ? 'red' : 'blue');

    // Create the trace for the scatter plot
    const trace = {
        x: x,
        y: y,
        mode: 'markers',
        marker: {
            color: colors,
            size: 10
        },
        type: 'scatter'
    };

    // Define the layout
    const layout2 = {
        title: 'Scatter plot with conditional coloring',
        xaxis: { title: 'X Axis' },
        yaxis: { title: 'Y Axis' }
    };

    // Plot the graph
    Plotly.newPlot('myPlot', [trace], layout2);

