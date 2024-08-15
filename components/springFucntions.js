export function linearVelocity (frec, step){
    return frec*step;
}
export function frequency(vel, step){
    return vel/step;
}
export function collisionLinearVelocity(initialVel, k, distance, mass){
    return Math.sqrt(initialVel**2 - (k*distance**2)/(mass));
}

export function springRateCritc (initialVel, finalVel, distance, mass){
    return mass*((initialVel**2-finalVel**2)/distance**2);
}


export function momentOfInertiaRatio (Itotal, IFlywheel){
    return ((Itotal)/(Itotal + IFlywheel));
}

export function springRateCritcAfterCollision (inertiaRatio, initialVel,distance1, distance2, mass){
   return (mass*inertiaRatio**2*initialVel**2)/((inertiaRatio**2-1)*distance1**2+distance2**2);
}
