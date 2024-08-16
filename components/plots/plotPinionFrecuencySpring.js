
import { getTraces } from "./getTraces.js";
import {momentOfInertiaRatio, 
    linearVelocity,
    frequency,
    springRateCritcAfterCollision,
    springRateCritc,
    collisionLinearVelocity} from "../springFucntions.js";

import {frecAtCollitionFun
} from "../collisionFunctions.js";


export function springCritics(totalMomentInertia, momentsOfInertia,
    totalMass, p){
        var inertiaRatio = momentOfInertiaRatio (totalMomentInertia,
            momentsOfInertia.slice(-1)[0] );
    
        var velocityKcritic1 =  linearVelocity(5000*0.02, p) ;
    
        var kcritic1= springRateCritcAfterCollision(inertiaRatio, velocityKcritic1,
            0.05, 0.05+0.004, totalMass);
    
        var criticInitialVelocity = linearVelocity( frecAtCollitionFun(totalMomentInertia,
            momentsOfInertia.slice(-1)[0], 300*0.02), p);
        
        var kcritic2 = springRateCritc(linearVelocity(5000*0.02, p), criticInitialVelocity,
        0.05, totalMass);
        
        var kcritic3 = springRateCritc(linearVelocity(5000*0.02, p), 0,
        0.05, totalMass);

        return [kcritic1, kcritic2, kcritic3];
}

export function plotPinionFrecuencySpring(totalMomentInertia, momentsOfInertia,
     totalMass, p){

    var inertiaRatio = momentOfInertiaRatio (totalMomentInertia,
        momentsOfInertia.slice(-1)[0] );

    var velocityKcritic1 =  linearVelocity(5000*0.02, p) ;

    var kcritic1= springRateCritcAfterCollision(inertiaRatio, velocityKcritic1,
        0.05, 0.05+0.004, totalMass);

    var criticInitialVelocity = linearVelocity( frecAtCollitionFun(totalMomentInertia,
        momentsOfInertia.slice(-1)[0], 300*0.02), p);
    
    var kcritic2 = springRateCritc(linearVelocity(5000*0.02, p), criticInitialVelocity,
    0.05, totalMass);
    
    var kcritic3 = springRateCritc(linearVelocity(5000*0.02, p), 0,
    0.05, totalMass);

    function frecuencyAtCollisionK(k){
        return frequency(collisionLinearVelocity(linearVelocity(5000*0.02, p),
        k, 0.05, totalMass), p) /0.02
    }
    
    var limitsK = [1, kcritic1, kcritic2, kcritic3]
    var colorsK = ["red", "blue", "red"]

    var tracesK = getTraces(limitsK, colorsK, 0.1, frecuencyAtCollisionK);

    var layout = {
        title: '',
        xaxis: {
            title: 'Spring rate [N/m]',
        },
        yaxis: {
            title: 'Pinion Frecuency at Collision [RPM]',
        }
    };

    Plotly.newPlot('pinion-frecuency-spring-plot', tracesK, layout);

}