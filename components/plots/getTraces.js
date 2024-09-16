export function getTraces(limits = [], color = [],step, function0){
    var x = [];
    var y = [];
    for (let index = 0; index < limits.length-1; index++) {
        x[index] = math.range(limits[index], limits[index+1], step, true).toArray();
        y[index] = x[index].map(x => function0(x));
        }
    

    var traces = [];

    for (let index = 0; index < x.length; index++) {
        traces[index] = {
            x: x[index] ,
            y: y[index],
            name: '',
            showlegend: false,
            type: 'scatter',
            mode: 'lines',
            line: { color: color[index] }
        };
    }

    return traces;
}
