
var select = document.getElementById("figura");
var operacion = document.getElementById("operacion");
var um = document.getElementById("um").value;

const creacion = document.getElementById("creacion");

const boton_calcular = document.getElementById("calcular");

const cuadrado = document.getElementById("cuadrado");
const rectangulo = document.getElementById("rectangulo");
const triangulo = document.getElementById("triangulo");
const circulo = document.getElementById("circulo");


// Obtención de datos segun la figura y operación seleccionada


select.addEventListener("change", (event) => {
    event.preventDefault();
    let index = null;
    let target = event.target.value;
    for (let i = 0; i < figuras.length; i++){
        if(figuras[i].figura === target){
            index = i;
            break;
        }
    }
    operacion.addEventListener("change", (ev)=>{
        ev.preventDefault();
        if(cuadrado.hasChildNodes()){
            var cuadro = document.querySelector(".cuadrado0");
            cuadrado.removeChild(cuadro);
        }else if (rectangulo.hasChildNodes()){
            var rect = document.querySelector(".rectangulo0");
            var rect2 = document.querySelector(".rectangulo1");
            rectangulo.removeChild(rect);
            rectangulo.removeChild(rect2);
        }else if (triangulo.hasChildNodes()){
            var tria = document.querySelector(".triangulo0");
            var tria2 = document.querySelector(".triangulo1");
            triangulo.removeChild(tria);
            triangulo.removeChild(tria2);
            // if(triangulo.lastChild === document.querySelector(".triangulo2")){
            //     console.log(triangulo.lastChild);
            //     var tria3 = document.querySelector(".triangulo2");
            //     triangulo.removeChild(tria3);
            // }
        }else if (circulo.hasChildNodes()){
            var cir = document.querySelector(".circulo0");
            circulo.removeChild(cir);
        }
        if(operacion.value === "area"){
            for (let j=0; j<figuras[index].area; j++){
                var input_j = document.createElement("INPUT");
                input_j.type = "number";
                input_j.placeholder = figuras[index].areaNombre[j];
                input_j.classList.add(target+j);
                document.getElementById(target).appendChild(input_j);
            }
        }else if(operacion.value === "perimetro"){
            for (let j=0; j<figuras[index].perimetro; j++){
                var input_j = document.createElement("INPUT");
                input_j.type = "number";
                input_j.placeholder = figuras[index].perimetroNombre[j];
                input_j.classList.add(target+j);
                document.getElementById(target).appendChild(input_j);
            }
        }
    })

});

//Con todo esto intento hacerlo por POO pero lo haré en otra rama
let figuras = [{
    figura: "cuadrado",
    area: 1,
    areaNombre: ["Altura"],
    perimetro: 1,
    perimetroNombre: ["lado"]
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

// evento que me permite mostrar el resultado de los calculos obtenidos de 
boton_calcular.addEventListener("click",(e)=>{
    
});

