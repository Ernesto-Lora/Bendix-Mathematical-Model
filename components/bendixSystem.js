import * as collision from './collisionFunctions.js';
import * as spring from './springFucntions.js'

import {plotFinalFrecuency} from './plots/plotFinalFrecuency.js';
import {plotPinionFrecuencySpring,
    springCritics} from "./plots/plotPinionFrecuencySpring.js";

import {plotPosition} from "./plots/plotPosition.js"

export class Component {
    constructor(masses, innerRadius, outterRadius) {
        this.masses = masses;
        this.innerRadius = innerRadius;
        this.outterRadius = outterRadius;
    }
    mass(){
        var Mt =  0;
        let massesArray = Array.from(this.masses);
        massesArray.forEach(element => {
            Mt += parseFloat(element.value);
        });
        return Mt;
    }

    inertia(){
        let I = 0;
            for (let index = 0; index < this.masses.length; index++) {
                I += collision.momentOfInertiaHollowCylinder(this.masses[index].value,
                    this.innerRadius[index].value,
                        this.outterRadius[index].value);
            }
            return I;
    }
}

export class BendixDynamics {
    constructor(bendix, flywheel, initialFrecuency, finalFlywheelFrecuency,
         k, angle, distance, vibrationVel){
        this.bendix = bendix;
        this.flywheel = flywheel;
        this.initialFrecuency = initialFrecuency;
        this.finalFlywheelFrecuency = finalFlywheelFrecuency;
        this.k = k;
        this.angle = angle;
        this.distance = distance;
        this.vibrationVel = vibrationVel;
    }

    p(){
        return 0.012*Math.tan(0.0174533*this.angle.valueAsNumber)*3.1416;
    }
    v0(){
        return this.initialFrecuency.value*0.02*this.p();
    }
    vc(){
        return Math.sqrt(this.v0()**2 - (this.k.value * this.distance.value**2)/(this.bendix.mass()));
    }
    frecC(){
        return this.vc()/this.p();
    }

    frecF(){
        return (this.bendix.inertia())/(this.bendix.inertia()+this.flywheel.inertia()) * this.frecC();
    }

    vF(){
        return this.frecF()*this.p();
    }


    plotFinalFrecuency1(){
        plotFinalFrecuency(this.flywheel.inertia(),
            this.bendix.inertia(),
            this.k.value,
            this.distance.value,
            this.bendix.mass(),
            this.p(),
            this.finalFlywheelFrecuency.valueAsNumber
        )
    }
    critics(){ 
        return springCritics(this.bendix.inertia(), 
            this.flywheel.inertia(),
            this.bendix.mass(),
            this.p(),
            this.distance.valueAsNumber,
            this.initialFrecuency.value,
            this.finalFlywheelFrecuency.value
         )
    }

    plotPinionFrecuencySpring1(){
        plotPinionFrecuencySpring(this.bendix.inertia(), 
        this.flywheel.inertia(),
        this.bendix.mass(),
        this.p(),
        this.distance.valueAsNumber,
        this.initialFrecuency.valueAsNumber,
        this.k.value,
        this.finalFlywheelFrecuency.value
    )
    }

    plotPosition1(){
        plotPosition(this.distance.valueAsNumber,
            this.v0(),
            this.vF(),
            this.k.valueAsNumber,
            this.bendix.mass(),
            this.critics(),
            this.vibrationVel.value
         )
    }

}