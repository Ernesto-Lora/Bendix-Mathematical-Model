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
    constructor(bendix, flywheel, initialFrecuency, k, p, distance){
        this.bendix = bendix;
        this.flywheel = flywheel;
        this.initialFrecuency = initialFrecuency;
        this.k = k;
        this.p = p;
        this.distance = distance;
    }
    v0(){
        return this.initialFrecuency.value*0.02*this.p.value;
    }
    vc(){
        return Math.sqrt(this.v0()**2 - (this.k.value * this.distance.value**2)/(this.bendix.mass()));
    }
    frecC(){
        return this.vc()/this.p.value;
    }

    frecF(){
        return (this.bendix.inertia())/(this.bendix.inertia()+this.flywheel.inertia()) * this.frecC();
    }

    vF(){
        return this.frecF()*this.p.value;
    }


    plotFinalFrecuency1(){
        plotFinalFrecuency(this.flywheel.inertia(),
            this.bendix.inertia(),
            this.k.value,
            this.distance.value,
            this.bendix.mass(),
            this.p.value)
    }
    critics(){ 
        return springCritics(this.bendix.inertia(), 
            this.flywheel.inertia(),
            this.bendix.mass(),
            this.p.value,
            this.distance.valueAsNumber,
            this.initialFrecuency.value )
    }

    plotPinionFrecuencySpring1(){
        plotPinionFrecuencySpring(this.bendix.inertia(), 
        this.flywheel.inertia(),
        this.bendix.mass(),
        this.p.value,
        this.distance.valueAsNumber,
        this.initialFrecuency.valueAsNumber,
        this.k.value)
    }

    plotPosition1(){
        plotPosition(this.distance.valueAsNumber,
            this.v0(),
            this.vF(),
            this.k.valueAsNumber,
            this.bendix.mass(),
            this.critics()
         )
    }

}