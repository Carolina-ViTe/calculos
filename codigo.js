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
let screen = document.getElementById("screen");     //Esta es la pantalla de la calculadora
let val1 = '';
let regex = /\+|\-|\*|\//;
let index = '';

function select_num(value){                         // Con esta función se muetsran los numeros en pantalla
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


function operacion(op){                                         // Con esta función se muetsran los simbolos de operacion en pantalla
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
        num_screen = num_screen_op_especiales;
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
let igual = document.getElementById("igual");                               // Con este evento se realiza la operación y se muestra el resultado en pantalla
igual.addEventListener("click", (e)=>{
    e.preventDefault();
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


    boton_calcular.addEventListener("click",(e)=>{
        e.preventDefault();
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

// Función para borrar inputs 
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

//--------------------------INICIA NÚMEROS ROMANOS----------------------------------------------
const convertirARomano = document.querySelector('#convertir_a_romano');
const convertirANatural = document.querySelector('#convertir_a_natural');

const romanos = ['I', 'IV', 'V', 'IX', 'X', 'XL', 'L', 'XC', 'C', 'CD', 'D', 'CM', 'M', '´V'];
const arabigos = [1,4,5,9,10,40,50,90,100,400,500,900,1000, 5000];

const convertToRoman = (a)=> {              //Esta función me da los números romanos básicos del 0 - 3999
    let numRomano = '';

    for(let f=0; f<arabigos.length; f++){
        if(arabigos[f] > a){
            numRomano = numRomano.concat(romanos[f-1]);
            a = a - arabigos[f-1];
            f=0;
            if(a === 0) break;
        }
    }

    return numRomano;
};

const extraRomano = (num) => {          //Esta función me da los numeros romanos del 0 - 3 999 000 ademas me detecta errores como números negativos o con punto
    let newNum = 0;
    let newNumExtra = 0;
    let mensajeRomano = '';

    if (num === '' || num.includes('.') || num < 0){
        mensajeRomano = `<h3 class="reRomano-error">Debes ingresar números naturales enteros positivos</h3>`;
    } else {
        if(num > 3999 && num < 4000000){
            if(num % 1000 > 0){
                newNum = parseInt(num/1000);
                newNumExtra = num%1000;
                mensajeRomano = `<label class="res_romano_4000">${convertToRoman(newNum)}</label>
                                 <label class="res_romano">${convertToRoman(newNumExtra)}</label>`
            } else {
                newNum = num / 1000;
                mensajeRomano = `<h3 class="res_romano_4000">${convertToRoman(newNum)}</h3>`;
            }
        } else if (num < 4000) {
            newNum = num;
            mensajeRomano = `<h3 class="res_romano">${convertToRoman(newNum)}</h3>`;
        } else {
            mensajeRomano = `<h3 class="reRomano-error">Por el momento solo se admiten números menores a 4,000,000</h3>`;
        }      
    }
    document.querySelector("#resultado_romano").classList.add("activo");
    return mensajeRomano;
};


function convertToArabic(a){                        // Esta función me da la converción de números romanos a numeros naturales
 
    let sum=0;
    let indexs = [];
    let arrRomano = [];

    for (let g=0; g<a.length; g++){
        for (let h=0; h<romanos.length; h++){
            if(a.toUpperCase()[g] === romanos[h]) indexs.push(h);
        }
    }  
    
    for(let c=0; c<indexs.length; c++){
        if (arabigos[indexs[c]] >= arabigos[indexs[c+1]] || isNaN(arabigos[indexs[c+1]])){
            sum += arabigos[indexs[c]];
            arrRomano.push(romanos[indexs[c]]);
        } else {
            sum += arabigos[indexs[c+1]-1];
            arrRomano.push(romanos[indexs[c]]+romanos[indexs[c+1]]);
            c++;
        }
    }

    return [sum, arrRomano];
};

const sinErrorConvertToArabic = (num) => {                      // Esta función me ayuda a detectar los errores del número romano ingresado
    let mensajeArabigo = '';
    let arrayRomanos = Array.from(convertToArabic(num)[1]);
    let regExp = /[IVXLCDM]/ig;
    let cumple = [];
    let indexR = [];
    let i,v,x,l,c,d,m;

    arrayRomanos.join('').match(/I/g) != null ? i = arrayRomanos.join('').match(/I/g).length : i = 0;
    arrayRomanos.join('').match(/V/g) != null ? v = arrayRomanos.join('').match(/V/g).length : v = 0;
    arrayRomanos.join('').match(/X/g) != null ? x = arrayRomanos.join('').match(/X/g).length : x = 0;
    arrayRomanos.join('').match(/L/g) != null ? l = arrayRomanos.join('').match(/L/g).length : l = 0;
    arrayRomanos.join('').match(/C/g) != null ? c = arrayRomanos.join('').match(/C/g).length : c = 0;
    arrayRomanos.join('').match(/D/g) != null ? d = arrayRomanos.join('').match(/D/g).length : d = 0;
    arrayRomanos.join('').match(/M/g) != null ? m = arrayRomanos.join('').match(/M/g).length : m = 0;

    for(let k=0; k<arrayRomanos.length; k++){
        romanos.includes(arrayRomanos[k]) ? cumple.push("s") : cumple.push("n");
    }

    indexR = arrayRomanos.map(romano => romanos.indexOf(romano));

    if(arrayRomanos.join('').match(regExp) === null || arrayRomanos.join('').length !== num.length || num.includes('.') || cumple.includes("n")){
        mensajeArabigo = `<h3 class="reRomano-error">${num} No es un número romano válido</h3>`
    } else if(i>3 || v>1 || x>4 || l>1 || c>4 || d>1 || m>4){
        mensajeArabigo = `<h3 class="reRomano-error">${num} No es un número romano válido</h3>`
    } else if (((arrayRomanos.includes("IV") || arrayRomanos.includes("IX")) && i>1) || ((arrayRomanos.includes("XL") || arrayRomanos.includes("XC")) && x>2) || ((arrayRomanos.includes("CD") || arrayRomanos.includes("CM")) && c>2)) {
        mensajeArabigo = `<h3 class="reRomano-error">${num} No es un número romano válido</h3>`
    } else {
        for (let m=0; m<indexR.length; m++){
            if(indexR[m] >= indexR[m+1] || isNaN(indexR[m+1])){
                mensajeArabigo = `<h3 class="res_arabigo">${convertToArabic(num)[0]}</h3>`;
            } else {
                mensajeArabigo = `<h3 class="reRomano-error">${num} No es un número romano válido</h3>`
                break;
            }
        } 
    }

    document.querySelector("#resultado_arabigo").classList.add("activo");
    return mensajeArabigo; 
}



let htmlCode3='';
convertirARomano.addEventListener("click", (e)=>{
    e.preventDefault();
    const ingresarNatural = document.querySelector('#ingresar_natural').value;
    htmlCode3 = extraRomano(ingresarNatural);
    document.querySelector("#resultado_romano").innerHTML = htmlCode3;
});

let htmlCode4;
convertirANatural.addEventListener("click", (e)=>{
    e.preventDefault();
    const ingresarRomano = document.querySelector('#ingresar_romano').value;
    htmlCode4 = sinErrorConvertToArabic(ingresarRomano);
    document.querySelector("#resultado_arabigo").innerHTML = htmlCode4;
});




//--------------------------TERMINA NÚMEROS ROMANOS


//----------------VARIABLES Y FUNCIONES UTILIZADAS POR MODULO--------------------------------------

/* Para todos los modulos:
fors i, j, c, d, a, b, f, g, h, k
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


/* --Modulo Romanos
- const convertirARomano
- const convertirANatural
- const romanos
- const arabigos
- let numRomano
- let mensajeRomano
- let sum=0;
- let indexs = [];
- let mensajeArabigo = '';
- htmlCode3
- htmlCode4
--FUNCIONES:
- convertToRoman()
- convertToArabic()
*/