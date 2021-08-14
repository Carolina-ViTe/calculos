
var select = document.getElementById("figura");
var operacion = document.getElementById("operacion").value;
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
    if(cuadrado.hasChildNodes()){
        var cuadro = document.querySelector(".cuadro");
        cuadrado.removeChild(cuadro);
        crearInputs();
    }else if (rectangulo.hasChildNodes()){
        var rect = document.querySelector(".rect");
        var rect2 = document.querySelector(".rect2");
        rectangulo.removeChild(rect);
        rectangulo.removeChild(rect2);
        crearInputs();
    }else if (triangulo.hasChildNodes()){
        var tria = document.querySelector(".tria");
        var tria2 = document.querySelector(".tria2");
        var tria3 = document.querySelector(".tria3");
        triangulo.removeChild(tria);
        triangulo.removeChild(tria2);
        triangulo.removeChild(tria3);
        crearInputs();
    }else if (circulo.hasChildNodes()){
        var cir = document.querySelector(".cir")
        circulo.removeChild(cir);
        crearInputs();
    }else{
        crearInputs();
    }
});

function crearInputs(){
    if(event.target.value == "cuadrado"){
        // var div = document.getElementById("cuadrado");
        var input = document.createElement("INPUT");
        input.type = "number";
        input.classList.add("cuadro");
        cuadrado.appendChild(input);
    } else if(event.target.value == "rectangulo"){
        var input = document.createElement("INPUT");
        var input2 = document.createElement("INPUT");
        input.type = "number";
        input2.type = "number";
        input.classList.add("rect");
        input2.classList.add("rect2");
        rectangulo.appendChild(input);
        rectangulo.appendChild(input2);
    }else if(event.target.value == "triangulo"){
        var input = document.createElement("INPUT");
        var input2 = document.createElement("INPUT");
        var input3 = document.createElement("INPUT");
        input.type = "number";
        input2.type = "number";
        input3.type = "number";
        input.classList.add("tria");
        input2.classList.add("tria2");
        input3.classList.add("tria3");
        triangulo.appendChild(input);
        triangulo.appendChild(input2);
        triangulo.appendChild(input3);
    }else if(event.target.value == "circulo"){
        var input = document.createElement("INPUT");
        input.type = "number";
        input.classList.add("cir");
        circulo.appendChild(input);
    }
}


// evento que me permite mostrar el resultado de los calculos obtenidos de 
boton_calcular.addEventListener("click",(e)=>{
    
});

