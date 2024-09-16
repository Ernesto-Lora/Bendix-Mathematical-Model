import { getTraces } from "./getTraces.js";

function springFrequencyFun(k, mass){
    return Math.sqrt(k/mass);
}
 
function position(initialPosition, initialVelocity, springFrequency, t){
    return (initialPosition*Math.cos(springFrequency*t) +
     (initialVelocity/springFrequency)*Math.sin(springFrequency*t) );
}

function impactTimeFun(impactPosition, initialVelocity, springFrequency){
    return (1/springFrequency)*Math.asin(springFrequency*impactPosition/initialVelocity);
}

function returnTime(impactPosition, impactVelocity, springFrequency){
    return (1/springFrequency)*(Math.atan(-springFrequency*impactPosition/impactVelocity)+Math.PI)
}

export function plotPosition(impactPosition, initialVelocity, impactVelocity, k, mass, critics, vibrationVel){
    if(k> critics[2]){
        plotPosition2(impactPosition, initialVelocity, k, mass);
        return ;
    }

    var springFrequency = springFrequencyFun(k, mass);
    var impactTime = impactTimeFun(impactPosition, initialVelocity, springFrequency);

    var lim1 = [0, impactTime];

    function positionT1(t){
        return position(0, initialVelocity, springFrequency, t);
    };

    var lim2 = [impactTime, 
        returnTime(impactPosition, impactVelocity, springFrequency)+impactTime];

    function positionT2(t){
        return position(impactPosition, impactVelocity, springFrequency, t-impactTime);
    };

    var color2;
    if (k>critics[0] && k<critics[1]){
        color2 = "blue";
    }else{
        color2 = "red";
    }
    let t2 = returnTime(impactPosition, impactVelocity, springFrequency)+impactTime;

    var traces1 = getTraces(lim1, [color2], impactTime/100, positionT1);
    var traces2 = getTraces(lim2, [color2], t2/100, positionT2);

    // Vibrations plot
    var color3;
    var velVibrations = vibrationVel;

    var maxX = velVibrations/springFrequency;
    if (maxX > impactPosition){
        color3 = "orange";
    }else{
        color3 = "green";
    }

    function positionT3(t){
        return position(0, velVibrations, springFrequency, t);
    };
    let returnTime3 = Math.PI/springFrequency;

    var lim3 = [0, returnTime3];

    var traces3 = getTraces(lim3, [color3], returnTime3/100, positionT3);


    var layout = {
        title: '',
        xaxis: {
            title: 'Time [s]',
        },
        yaxis: {
            title: 'Pinion position [m]',
        }
    };


    var line1 = {
        x : [0, returnTime(impactPosition, impactVelocity, springFrequency)+impactTime],
        y : [impactPosition, impactPosition],
        name:"Flywheel\n Position",
        type: "line",
        line: {color: "black",
            dash: "dash"
        }
    }

    var line2 = {
        x : [0, returnTime(impactPosition, impactVelocity, springFrequency)+impactTime],
        y : [impactPosition+0.0003, impactPosition+0.0003], 
        name:"Spring Max. Compression",
        type: "line",
        line: {color: "red",
            dash: "dash"
        }
    }
    traces1[0].name = "Bendix Process";
    traces1[0].showlegend = true;

    traces3[0].name = "Strongest vibration";
    traces3[0].showlegend = true;

    var data = [traces1[0], traces2[0], traces3[0] , line2, line1];

    Plotly.newPlot('position-plot',
         data, layout);

}

function plotPosition2(impactPosition, initialVelocity, k, mass){

    var springFrequency = springFrequencyFun(k, mass);
    let returnTime = Math.PI/springFrequency;

    var lim1 = [0, returnTime ];

    function positionT1(t){
        return position(0, initialVelocity, springFrequency, t);
    };
    var traces1 = getTraces(lim1, ["red"], returnTime/100, positionT1);

    var layout = {
        title: '',
        xaxis: {
            title: 'Time [s]',
        },
        yaxis: {
            title: 'Pinion position [m]',
        }
    };

    var line1 = {
        x : [0, returnTime],
        y : [impactPosition, impactPosition],
        name:"Flywheel\n Position",
        type: "line",
        line: {color: "black",
            dash: "dash"
        }
    }

    var line2 = {
        x : [0, returnTime],
        y : [impactPosition+0.0003, impactPosition+0.0003],
        name:"Spring Max. \n Compression",  
        type: "line",
        line: {color: "red",
            dash: "dash"
        }
    }

    traces1[0].name = "Bendix Dynamic";
    traces1[0].showlegend = true;

    var data = [traces1[0], line2, line1];

    Plotly.newPlot('position-plot',
         data, layout);

}