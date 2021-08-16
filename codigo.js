// Esto sson los div donde apareceran los inputs dependiendo de la figura seleccionada
const div_cuadrado = document.getElementById("cuadrado");               //Este es el div para crear inputs para cuadrado
const div_rectangulo = document.getElementById("rectangulo");           //Este es el div para crear inputs para rectangulo
const div_triangulo = document.getElementById("triangulo");             //Este es el div para crear inputs para triangulo
const div_circulo = document.getElementById("circulo");                 //Este es el div para crear inputs para circulo

const boton_calcular = document.getElementById("calcular");

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
    var select = document.getElementById("figura").value;               // Me da la opción de la etiqueta select con el div figura que se haya seleccionada 
    var operacion = document.getElementById("operacion").value;         // Me da la opción de la etiqueta select con el div operacion que se haya seleccionada
    var unidad_de_medida = document.getElementById("um").value;

    let index = null;
    for (let i = 0; i < FIGURAS.length; i++){
        if(FIGURAS[i].figura === select){
            index = i;
            break;
        }
    }
    console.log(select, operacion);
    let htmlCode="";
    let htmlCode2="";

    if(operacion === "area"){
        // Aqui se invoca la función para borrar inputs que hayan sido creados por otra opción
        delete_inputs();
        // Aqui se crean los inputs en caso de que se quiera calcular el area
        for (let j=0; j<FIGURAS[index].area; j++){
            htmlCode += `<input type="number" class=${select+j} placeholder=${FIGURAS[index].areaNombre[j]}>`; 
        }
        document.getElementById(select).innerHTML = htmlCode;
    }else if(operacion === "perimetro"){
        // Aqui se invoca la función para borrar inputs que hayan sido creados por otra opción
        delete_inputs();
        // Aqui se crean los inputs en caso de que se quiera calcular el perimetro
        for (let j=0; j<FIGURAS[index].perimetro; j++){
            htmlCode += `<input type="number" class=${select+j} placeholder=${FIGURAS[index].perimetroNombre[j]}>`; 
        }
        document.getElementById(select).innerHTML = htmlCode;
    }

    boton_calcular.addEventListener("click",()=>{
        let area = 1;
        let perimetro = 0;

        if(operacion === "area"){
            for (let c=0; c<FIGURAS.length; c++){
                if(document.getElementById(FIGURAS[c].figura).hasChildNodes()){
                    children = document.getElementById(FIGURAS[c].figura).childNodes;
                    for (let d=0; d<children.length; d++){
                        let identificador = "." + FIGURAS[c].figura + d
                        let valor_d = document.querySelector(identificador);
                        area = area * parseFloat(valor_d.value);
                    }
                }
            } 
            htmlCode2 = `
            <h3 id="resultado_total">Área = ${area} ${unidad_de_medida}2</h3>`   
        } else if (operacion === "perimetro"){
            for (let c=0; c<FIGURAS.length; c++){
                if(document.getElementById(FIGURAS[c].figura).hasChildNodes()){
                    children = document.getElementById(FIGURAS[c].figura).childNodes;
                    for (let d=0; d<children.length; d++){
                        let identificador = "." + FIGURAS[c].figura + d
                        let valor_d = document.querySelector(identificador);
                        perimetro += parseFloat(valor_d.value);
                    }
                }
            } 
            htmlCode2 = `
            <h3 id="resultado_total">Perímetro= ${perimetro} ${unidad_de_medida}</h3>` 
        }
        document.getElementById("resulta").innerHTML = htmlCode2;
    })
}

// Función para borrar inputs en caso de que se requiera
function delete_inputs(){
    for (let a=0; a<FIGURAS.length; a++){
        if(document.getElementById(FIGURAS[a].figura).hasChildNodes()){
            while(document.getElementById(FIGURAS[a].figura).firstChild){
                document.getElementById(FIGURAS[a].figura).removeChild(document.getElementById(FIGURAS[a].figura).firstChild)
            }
        }
    }

    
}
        
        
// i, j, k, a, b, c, d
        