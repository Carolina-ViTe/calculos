"use strict"

//---------------------------INICIA CALCULADORA--------------------------------------
let num_screen_op_especiales = '';
let num_screen = '';
let operacion_en_curso = '';
let valCalc2 = ''
let resultado = '';
let punto_en_pantalla = "no"
let resultado_en_pantalla = "no";
let op_esp_en_curso = "no";
let screen = document.getElementById("screen");
let val1 = '';
let regex = /\+|\-|\*|\//;
let index = '';

function select_num(value){
    if(resultado_en_pantalla === "no"){
        if(value === "."){
            if(punto_en_pantalla === "no"){
                screen.value += value;
                num_screen += value;
                punto_en_pantalla = "si"
            }else if(punto_en_pantalla = "si"){
                value = '';
            }
        }else{
            screen.value += value;
            num_screen += value;
        }
    }else if(resultado_en_pantalla === "si"){
        screen.value = value;
        num_screen = value;
        resultado_en_pantalla="no";
    }
}


function operacion(op){
    if(op === "raiz" && operacion_en_curso === "basicas"){
        index = num_screen.split('').reverse().join('').search(regex);
        val1 = num_screen.split('').slice(0, num_screen.split('').length-index).join('');
        console.log(index);
        screen.value = val1 + document.querySelector("#raiz").value + num_screen.split('').slice(num_screen.split('').length-index, num_screen.split('').length).join('');
        operacion_en_curso = "raiz";
        num_screen_op_especiales = eval(num_screen.split('').slice(num_screen.split('').length-index, num_screen.split('').length).join(''));
        num_screen='';
    }else if(op === 'raiz'){
        console.log(op)
        screen.value = val1 + document.querySelector("#raiz").value + num_screen;
        operacion_en_curso = "raiz";
        num_screen_op_especiales = eval(num_screen);
        num_screen='';
    }else if(op === "%" && operacion_en_curso === "basicas"){
        index = num_screen.split('').reverse().join('').search(regex);
        val1 = num_screen.split('').slice(0, num_screen.split('').length-index).join('');
        screen.value = val1 + (num_screen.split('').slice(num_screen.split('').length-index, num_screen.split('').length).join(''))/100;
    }else if(op === "%"){
        screen.value =  eval(num_screen)/100;
        num_screen_op_especiales = eval(num_screen)/100;
        num_screen = '';
    }else{
        if(operacion_en_curso === "raiz" || operacion_en_curso === "mezcla_raiz"){
            screen.value += op;
            num_screen += op;
            operacion_en_curso = "mezcla_raiz";                       
        } else if (operacion_en_curso === 'basicas' || operacion_en_curso === ''){
            screen.value += op;
            num_screen += op;
            operacion_en_curso = "basicas";
        }
    }
    resultado_en_pantalla = "no";
    punto_en_pantalla = "no";
}

let pre_resultado = 0;
let igual = document.getElementById("igual");
igual.addEventListener("click", ()=>{
    if(operacion_en_curso === "raiz"){
        resultado = eval(num_screen + val1 + Math.sqrt(num_screen_op_especiales));
        console.log(resultado)
        num_screen = resultado;
    } else if(operacion_en_curso === "%"){
        resultado = eval(num_screen_op_especiales + num_screen);
        num_screen = resultado;
    }else if (operacion_en_curso === "mezcla_raiz"){
        pre_resultado = Math.sqrt(num_screen_op_especiales);
        resultado = eval(val1 + pre_resultado + num_screen);
        console.log("num_screen", num_screen);
        num_screen = resultado;
    } else {
        valCalc2 = screen.value;
        resultado = eval(valCalc2);
        num_screen = resultado;
    }
    screen.value = resultado;
    resultado_en_pantalla = "si";
    console.log(resultado);
    operacion_en_curso = '';
    num_screen_op_especiales = '';
    resultado = '';
    punto_en_pantalla = "no";
    val1 = '';
});

let clear = document.getElementById("clear");

clear.addEventListener("click", ()=>{
    screen.value = '';
    punto_en_pantalla = "no";
    resultado_en_pantalla = "no";
    operacion_en_curso = '';
    op_esp_en_curso = "no"
    num_screen_op_especiales = '';
    num_screen = '';
    val1 = '';
    pre_resultado='';
    index=''
});



//---------------------------FIN CALCULADORA-----------------------------------------


//--------------------------INICIA ÁREA / PERÍMETRO----------------------------------

// Esto sson los div donde apareceran los inputs dependiendo de la figura seleccionada
const div_cuadrado = document.getElementById("cuadrado");               //Este es el div para crear inputs para cuadrado
const div_rectangulo = document.getElementById("rectangulo");           //Este es el div para crear inputs para rectangulo
const div_triangulo = document.getElementById("triangulo");             //Este es el div para crear inputs para triangulo
const div_circulo = document.getElementById("circulo");                 //Este es el div para crear inputs para circulo

const boton_calcular = document.getElementById("calcular");

const FIGURAS = [{
    figura: "cuadrado",
    areaNombre: ["Lado"],
    perimetroNombre: ["Lado"]
},{
    figura: "rectangulo",
    areaNombre: ["Base", "Altura"],
    perimetroNombre: ["Base", "Altura"]
},{
    figura: "triangulo",
    areaNombre: ["Base", "Altura"],
    perimetroNombre: ["Lado-A", "Lado-B", "Lado-C"]
},{
    figura: "circulo",
    areaNombre: ["Radio"],
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
        for (let j=0; j<FIGURAS[index].areaNombre.length; j++){
            htmlCode += `<input type="number" class=${select+j} placeholder=${FIGURAS[index].areaNombre[j]}>`; 
        }
        document.getElementById(select).innerHTML = htmlCode;
    }else if(operacion === "perimetro"){
        // Aqui se invoca la función para borrar inputs que hayan sido creados por otra opción
        delete_inputs();
        // Aqui se crean los inputs en caso de que se quiera calcular el perimetro
        for (let j=0; j<FIGURAS[index].perimetroNombre.length; j++){
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
            htmlCode2 = error(operacion, area, unidad_de_medida, parseFloat(valor0.value));
        } else if (select === "rectangulo" && operacion === "area"){
            let valor0 = document.querySelector(".rectangulo0");
            let valor1 = document.querySelector(".rectangulo1");
            area = parseFloat(valor0.value) * parseFloat(valor1.value);
            htmlCode2 = error(operacion, area, unidad_de_medida, parseFloat(valor0.value), parseFloat(valor1.value));
        } else if (select === "triangulo" && operacion === "area"){
            let valor0 = document.querySelector(".triangulo0");
            let valor1 = document.querySelector(".triangulo1");
            area = (parseFloat(valor0.value) * parseFloat(valor1.value)) / 2;
            htmlCode2 = error(operacion, area, unidad_de_medida, parseFloat(valor0.value), parseFloat(valor1.value));
        } else if (select === "circulo" && operacion === "area"){
            let valor0 = document.querySelector(".circulo0");
            area = (Math.PI * (parseFloat(valor0.value) * parseFloat(valor0.value))).toFixed(4);
            htmlCode2 = error(operacion, area, unidad_de_medida, parseFloat(valor0.value));
        }
        if (select === "cuadrado" && operacion === "perimetro"){
            let valor0 = document.querySelector(".cuadrado0");
            perimetro = parseFloat(valor0.value) * 4; 
            htmlCode2 = error(operacion, perimetro, unidad_de_medida, parseFloat(valor0.value));
        } else if (select === "rectangulo" && operacion === "perimetro"){
            let valor0 = document.querySelector(".rectangulo0");
            let valor1 = document.querySelector(".rectangulo1");
            perimetro = (parseFloat(valor0.value)*2) + (parseFloat(valor1.value)*2);
            htmlCode2 = error(operacion, perimetro, unidad_de_medida, parseFloat(valor0.value), parseFloat(valor1.value));
        } else if (select === "triangulo" && operacion === "perimetro"){
            let valor0 = document.querySelector(".triangulo0");
            let valor1 = document.querySelector(".triangulo1");
            let valor2 = document.querySelector(".triangulo2");
            perimetro = parseFloat(valor0.value) + parseFloat(valor1.value) + parseFloat(valor2.value);
            htmlCode2 = error(operacion, perimetro, unidad_de_medida, parseFloat(valor0.value), parseFloat(valor1.value), parseFloat(valor2.value));
        } else if (select === "circulo" && operacion === "perimetro"){
            let valor0 = document.querySelector(".circulo0");
            perimetro = (2 * Math.PI * parseFloat(valor0.value)).toFixed(4); 
            htmlCode2 = error(operacion, perimetro, unidad_de_medida, parseFloat(valor0.value));
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

const error = (operacion_a_realizar, resultado, um, a=0, b=0, c=0) => {
    let mensaje_res = "";
    if (isNaN(resultado) || a < 0 || b < 0 || c < 0){
        mensaje_res = `<h3 id="resultado_total_error">Debes ingresar números positivos</h3>`;
    } else {
        if (operacion_a_realizar === "area"){
            mensaje_res = `<h3 id="resultado_total">Área = ${resultado} ${um}2</h3>`         
        } else if (operacion_a_realizar === "perimetro"){
            mensaje_res = `<h3 id="resultado_total">Perímetro = ${resultado} ${um}</h3>`
            
        }
    } 
    return mensaje_res;
}

//--------------------------TERMINA ÁREA / PERÍMETRO----------------------------------




//----------------VARIABLES Y FUNCIONES UTILIZADAS POR MODULO--------------------------------------

/* Para todos los modulos:
fors i, j, c, d, a, b
*/

/*Modulo calculadora:
--***VARIABLES:
-num_screen_op_especiales
-num_screen
-operacion_en_curso
-op_esp_en_curso
-resultado
-resultado_en_pantalla
-pre_resultado
-screen
-igual
-clear
-val1
-valCalc2
-punto_en_pantalla
-regex
-index
--**FUNCIONES:
-select_num()
-operacion()

*/


/* ---Modulo área / perimetro
--***VARIABLES:
-div_cuadrado
-div_rectangulo
-div_triangulo
-div_circulo
-boton_calcular
-FIGURAS
-select
-operacion
-unidad_de_medida
-index
-htmlCode
-htmlCode2
-area
-perimetro
-valor0
-valor1
-valor2
-mensaje_res
--**FUNCIONES:
-fig_select()
-delete_inputs()
-error()
*/