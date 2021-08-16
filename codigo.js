// var select = document.getElementById("figura");                     //Este me da la seleccion de figura del usuario
// var operacion = document.getElementById("operacion");               //Este me da la selección de operación del usuario

const div_cuadrado = document.getElementById("cuadrado");               //Este es el div para crear inputs para cuadrado
const div_rectangulo = document.getElementById("rectangulo");           //Este es el div para crear inputs para rectangulo
const div_triangulo = document.getElementById("triangulo");             //Este es el div para crear inputs para triangulo
const div_circulo = document.getElementById("circulo");                 //Este es el div para crear inputs para circulo

const FIGURAS = [{
    figura: "cuadrado",
    area: 1,
    areaNombre: ["Lado"],
    perimetro: 1,
    perimetroNombre: ["Lado"]
},{
    figura: "rectangulo",
    area: 2,
    areaNombre: ["Base", "Altura"],
    perimetro: 2,
    perimetroNombre: ["Base", "Altura"]
},{
    figura: "triangulo",
    area: 2,
    areaNombre: ["Base", "Altura"],
    perimetro: 3,
    perimetroNombre: ["Lado 1", "Lado 2", "Lado 3"]
},{
    figura: "circulo",
    area: 1,
    areaNombre: ["Radio"],
    perimetro: 1,
    perimetroNombre: ["Radio"]
}];



function fig_select(){
    var select = document.getElementById("figura").value; 
    var operacion = document.getElementById("operacion").value;  
    let index = null;
    for (let i = 0; i < FIGURAS.length; i++){
        if(FIGURAS[i].figura === select){
            index = i;
            break;
        }
    }
    console.log(select, operacion);

    if(operacion === "area"){
        delete_inputs();
        for (let j=0; j<FIGURAS[index].area; j++){
            var input_j = document.createElement("INPUT");
            input_j.type = "number";
            input_j.placeholder = FIGURAS[index].areaNombre[j];
            input_j.classList.add(select+j);
            document.getElementById(select).appendChild(input_j);
        }
    }else if(operacion === "perimetro"){
        delete_inputs();
        for (let j=0; j<FIGURAS[index].perimetro; j++){
            var input_j = document.createElement("INPUT");
            input_j.type = "number";
            input_j.placeholder = FIGURAS[index].perimetroNombre[j];
            input_j.classList.add(select+j);
            document.getElementById(select).appendChild(input_j);
        }
    }
}

function delete_inputs(){
    if(div_cuadrado.hasChildNodes()){
        while(div_cuadrado.firstChild){
            div_cuadrado.removeChild(div_cuadrado.firstChild)
        }
    }else if (div_rectangulo.hasChildNodes()){
        while(div_rectangulo.firstChild){
            div_rectangulo.removeChild(div_rectangulo.firstChild)
        }
    }else if (div_triangulo.hasChildNodes()){
        while(div_triangulo.firstChild){
            div_triangulo.removeChild(div_triangulo.firstChild)
        }
    }else if (div_circulo.hasChildNodes()){
        while(div_circulo.firstChild){
            div_circulo.removeChild(div_circulo.firstChild)
        }
    }
}
 
        
        
// i, j, k
        
        
        
        