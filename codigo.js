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
        select = document.getElementById("figura").value;
        operacion = document.getElementById("operacion").value;
        let area;
        let perimetro;

            if (select === "cuadrado" && operacion === "area"){
                let valor0 = document.querySelector(".cuadrado0");
                area = parseFloat(valor0.value) * parseFloat(valor0.value);
                if(parseFloat(valor0.value) < 0){
                    console.log(valor0.value)
                    area = NaN;
                }
            } else if (select === "rectangulo" && operacion === "area"){
                let valor0 = document.querySelector(".rectangulo0");
                let valor1 = document.querySelector(".rectangulo1");
                area = parseFloat(valor0.value) * parseFloat(valor1.value);
                if(parseFloat(valor0.value) < 0 || parseFloat(valor1.value) < 0){
                    area = NaN;
                }
            } else if (select === "triangulo" && operacion === "area"){
                let valor0 = document.querySelector(".triangulo0");
                let valor1 = document.querySelector(".triangulo1");
                area = (parseFloat(valor0.value) * parseFloat(valor1.value)) / 2;
                if(parseFloat(valor0.value) < 0 || parseFloat(valor1.value) < 0){
                    area = NaN;
                }
            } else if (select === "circulo" && operacion === "area"){
                let valor0 = document.querySelector(".circulo0");
                area = (Math.PI * (parseFloat(valor0.value) * parseFloat(valor0.value))).toFixed(4);
                if(parseFloat(valor0.value) < 0){
                    area = NaN;
                }
            }
            if (select === "cuadrado" && operacion === "perimetro"){
                let valor0 = document.querySelector(".cuadrado0");
                perimetro = parseFloat(valor0.value) * 4; 
                if(parseFloat(valor0.value) < 0){
                    perimetro = NaN;
                }
            } else if (select === "rectangulo" && operacion === "perimetro"){
                let valor0 = document.querySelector(".rectangulo0");
                let valor1 = document.querySelector(".rectangulo1");
                perimetro = (parseFloat(valor0.value)*2) + (parseFloat(valor1.value)*2);
                if(parseFloat(valor0.value) < 0 || parseFloat(valor1.value) < 0){
                    perimetro = NaN;
                }
            } else if (select === "triangulo" && operacion === "perimetro"){
                let valor0 = document.querySelector(".triangulo0");
                let valor1 = document.querySelector(".triangulo1");
                let valor2 = document.querySelector(".triangulo2");
                perimetro = parseFloat(valor0.value) + parseFloat(valor1.value) + parseFloat(valor2.value);
                if(parseFloat(valor0.value) < 0 || parseFloat(valor1.value) < 0 || parseFloat(valor2.value) < 0){
                    perimetro = NaN;
                }
            } else if (select === "circulo" && operacion === "perimetro"){
                let valor0 = document.querySelector(".circulo0");
                perimetro = (2 * Math.PI * parseFloat(valor0.value)).toFixed(4); 
                if(parseFloat(valor0.value) < 0){
                    perimetro = NaN;
                } 
            }
            if(operacion === "area"){
                if(isNaN(area)){
                    htmlCode2 = `
                    <h3 id="resultado_total_error">Debes ingresar números positivos</h3>`;
                }else{
                    htmlCode2 = `
                        <h3 id="resultado_total">Área = ${area} ${unidad_de_medida}2</h3>`
                }
            } else if (operacion === "perimetro"){
                if(isNaN(perimetro)){
                    htmlCode2 = `
                    <h3 id="resultado_total_error">Debes ingresar números positivos</h3>`;
                }else{
                htmlCode2 = `
                    <h3 id="resultado_total">Perímetro = ${perimetro} ${unidad_de_medida}</h3>`
                }
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

// fors i, j, c, d, a