import { getTraces } from "./getTraces.js";

export function plotFinalFrecuency(momentsOfInertia, totalMomentInertia,
    frecAtCollitionFun, finalFrecFun){
    var initialPinionCritic = frecAtCollitionFun (totalMomentInertia,
        momentsOfInertia.slice(-1), 300);

    var limits = [0.5*initialPinionCritic, initialPinionCritic, 1.5*initialPinionCritic];

    function finalFrecFunFrec(frec){
        return finalFrecFun(totalMomentInertia,
            momentsOfInertia.slice(-1), frec);
    };

    var colors = ["red", "blue"];

    var traces = getTraces(limits, colors, finalFrecFunFrec);

    var layout = {
        title: '',
        xaxis: {
            title: 'Pinion Frecuency at collision [RPM]',
        },
        yaxis: {
            title: 'Final Flywheel Frequency [RPM]',
        }
    };

    Plotly.newPlot('final-frecuency-plot',
         traces, layout);

}


export function plotPinionFrecuencySpring(){
    var totalMomentInertia = getTotalMomentInertia();
    var momentsOfInertia = getMomentsOfInertia();
    var totalMass = getTotalMass();

    var inertiaRatio = momentOfInertiaRatio (totalMomentInertia,
        momentsOfInertia.slice(-1)[0] );

    var velocityKcritic1 =  linearVelocity(5000*0.02, p) ;

    //var kcritic1= springRateCritcAfterCollision(inertiaRatio=inertiaRatio,
    //    initialVel = velocityKcritic1,
    //    distance1=0.05, distance2=0.05+0.004, mass=totalMass);

    var kcritic1= springRateCritcAfterCollision(inertiaRatio, velocityKcritic1,
        0.05, 0.05+0.004, totalMass);

    var criticInitialVelocity = linearVelocity( frecAtCollitionFun(totalMomentInertia,
        momentsOfInertia.slice(-1)[0], 300*0.02), p);
    
    var kcritic2 = springRateCritc(linearVelocity(5000*0.02, p), criticInitialVelocity,
    0.05, totalMass);
    
    var kcritic3 = springRateCritc(linearVelocity(5000*0.02, p), 0,
    0.05, totalMass);

    function frecuencyAtCollisionK(k){
        return frecuency(collisionLinearVelocity(linearVelocity(5000*0.02, p),
        k, 0.05, totalMass), p) /0.02
    }
    
    var limitsK = [10, kcritic1, kcritic2, kcritic3]
    var colorsK = ["red", "blue", "red"]

    var tracesK = getTraces(limitsK, colorsK, frecuencyAtCollisionK);

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