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

export function plotPosition(impactPosition, initialVelocity, impactVelocity, k, mass){
    var springFrequency = springFrequencyFun(k, mass);
    var impactTime = impactTimeFun(impactPosition, initialVelocity, springFrequency);

    var lim1 = [0, impactTime];
    function positionT1(t){
        return position(0, initialVelocity, springFrequency, t);
    };
    var traces1 = getTraces(lim1, ["blue"], impactTime/100, positionT1);

    
    var lim2 = [impactTime, 
        returnTime(impactPosition, impactVelocity, springFrequency)];
    function positionT2(t){
        return position(impactPosition, impactVelocity, springFrequency, t-impactTime);
    };
    var traces2 = getTraces(lim2, ["green"], 0.001, positionT2);


    var layout = {
        title: '',
        xaxis: {
            title: 'Pinion Frecuency at collision [RPM]',
        },
        yaxis: {
            title: 'Final Flywheel Frequency [RPM]',
        }
    };

    var data = [traces1[0], traces2[0]];

    Plotly.newPlot('position-plot',
         data, layout);

}