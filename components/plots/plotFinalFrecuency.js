import { getTraces } from "./getTraces.js";

import {finalFrecFun,
    frecAtCollitionFun,
    momentOfInertiaHollowCylinder,
} from  "../collisionFunctions.js"

import * as springFunctions from "../springFucntions.js"

export function plotFinalFrecuency(If, It, k, distace, mass, p, finalFlywheelFrec){
    
    var collisionPinionCriticFrec = frecAtCollitionFun (It,
        If, finalFlywheelFrec);
        
    var collisionPinionCriticVel =  springFunctions.linearVelocity(collisionPinionCriticFrec*0.02, p)

    var initialVelCritic = springFunctions.initialLinearVelocity(collisionPinionCriticVel, k, distace, mass);
    
    var initialCriticFrec = springFunctions.frequency(initialVelCritic, p) /0.02; 

    function finalFrecFunFrec(frec){
        frec = springFunctions.frequency(springFunctions.collisionLinearVelocity( springFunctions.linearVelocity(frec*0.02, p),
             k, distace, mass ), p)/0.02;

        return finalFrecFun(It,
            If, frec);
    };

    var limits, colors;

    if(initialCriticFrec < 3600 ){
        limits = [3600, 6400];
        colors = ["blue"];
    } else if(initialCriticFrec > 6400){
        limits = [3600, 6400];
        colors = ["red"];
    }else{
        var limits = [3600, initialCriticFrec, 6400];

        var colors = ["red", "blue"];
    }

    var traces = getTraces(limits, colors, 0.1, finalFrecFunFrec);

    var layout = {
        title: '',
        xaxis: {
            title: 'Initial Pinion Frecuency [RPM]',
        },
        yaxis: {
            title: 'Final Flywheel Frequency [RPM]',
        }
    };

    Plotly.newPlot('final-frecuency-plot',
         traces, layout);

}
