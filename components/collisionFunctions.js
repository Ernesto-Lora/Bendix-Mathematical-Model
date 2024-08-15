export function finalFrecFun (I, If, frecIni){
    I = parseFloat(I);
    If = parseFloat(If);
    frecIni = parseFloat(frecIni);
    return (I)/(I+If) * frecIni;
}

export function frecAtCollitionFun (I, If, frecFinal) {
    I = parseFloat(I);
    If = parseFloat(If);
    frecFinal = parseFloat(frecFinal);
    return (I+If)/(I) * frecFinal;
}

export function momentOfInertiaHollowCylinder (m, r1, r2){
    return 0.5*m*(r1**2+r2**2);
}
