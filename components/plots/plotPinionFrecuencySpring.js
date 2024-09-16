
import { getTraces } from "./getTraces.js";
import {momentOfInertiaRatio, 
    linearVelocity,
    frequency,
    springRateCritcAfterCollision,
    springRateCritc,
    collisionLinearVelocity} from "../springFucntions.js";

import {finalFrecFun, frecAtCollitionFun
} from "../collisionFunctions.js";


export function springCritics(It, If,
    totalMass, p, distance, initialFrec){
        var inertiaRatio = momentOfInertiaRatio (It, If);
    
        var velocityKcritic1 =  linearVelocity(initialFrec*0.02, p);
    
        var kcritic1= springRateCritcAfterCollision(inertiaRatio, velocityKcritic1,
            distance, distance + 0.0003, totalMass);
    
        var criticInitialVelocity = linearVelocity( frecAtCollitionFun(It,
            If, 300*0.02), p);
        
        var kcritic2 = springRateCritc(linearVelocity(initialFrec*0.02, p), criticInitialVelocity,
        distance, totalMass);
        
        var kcritic3 = springRateCritc(linearVelocity(initialFrec*0.02, p), 0,
        distance, totalMass);

        return [kcritic1, kcritic2, kcritic3];
}


export function plotPinionFrecuencySpring(It, If,
     totalMass, p, distance, initialFrec, k){

    var critics = springCritics(It, If,
        totalMass, p, distance, initialFrec);

    var limitsK = [1].concat(critics);
    var colorsK = ["red", "blue", "red"];

    function frecuencyAtCollisionK(k){
        return finalFrecFun(It, If, frequency(collisionLinearVelocity(linearVelocity(initialFrec*0.02, p),
        k, distance, totalMass), p) /0.02);
    }

    var tracesK = getTraces(limitsK, colorsK, 0.1, frecuencyAtCollisionK);

    var layout = {
        title: '',
        xaxis: {
            title: 'Spring rate [N/m]',
        },
        yaxis: {
            title: 'Final Flywheel Frecuency [RPM]',
        }
    };
    var point = {
        x: [k],
        y: [frecuencyAtCollisionK(k)],
        name: '',
        showlegend: false,
        type: "scatter",
        mode: "marker",
        marker :{color: "black",
            symbol: "star",
            size: 12
        }
    }
    tracesK = tracesK.concat(point);

    if(k>critics[2]){
        function zero(k){
            return 0;
        }
        let limExtreme = [critics[2], k];
        let colorExtreme = ["red"];
    
        var traceExtreme = getTraces(limExtreme, colorExtreme, 0.1, zero);
        tracesK = tracesK.concat(traceExtreme);

        var point = {
            x: [k],
            y: [0],
            name: '',
            showlegend: false,
            type: "scatter",
            mode: "markers",
            marker :{color: "black",
                symbol: "star",
                size: 12
            }
        };
        tracesK = tracesK.concat(point);

        Plotly.newPlot('pinion-frecuency-spring-plot', tracesK, layout);
        return
    }

    Plotly.newPlot('pinion-frecuency-spring-plot', tracesK, layout);

}