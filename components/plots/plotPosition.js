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

export function plotPosition(impactPosition, initialVelocity, impactVelocity, k, mass, critics){
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
    var traces1 = getTraces(lim1, ["blue"], impactTime/100, positionT1);

    var lim2 = [impactTime, 
        returnTime(impactPosition, impactVelocity, springFrequency)+impactTime];

    function positionT2(t){
        return position(impactPosition, impactVelocity, springFrequency, t-impactTime);
    };

    var color2;
    if (k>critics[0] && k<critics[1]){
        color2 = "green";
    }else{
        color2 = "red";
    }
    let t2 = returnTime(impactPosition, impactVelocity, springFrequency)+impactTime;

    var traces2 = getTraces(lim2, [color2], t2/100, positionT2);


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
        type: "line",
        line: {color: "black",
            dash: "dash"
        }
    }

    var line2 = {
        x : [0, returnTime(impactPosition, impactVelocity, springFrequency)+impactTime],
        y : [impactPosition+0.0003, impactPosition+0.0003],  
        type: "line",
        line: {color: "red",
            dash: "dash"
        }
    }
    var data = [traces1[0], traces2[0], line1, line2];

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
        type: "line",
        line: {color: "black",
            dash: "dash"
        }
    }

    var line2 = {
        x : [0, returnTime],
        y : [impactPosition+0.0003, impactPosition+0.0003],  
        type: "line",
        line: {color: "red",
            dash: "dash"
        }
    }
    var data = [traces1[0], line1, line2];

    Plotly.newPlot('position-plot',
         data, layout);

}