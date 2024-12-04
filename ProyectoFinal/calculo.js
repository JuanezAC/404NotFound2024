let s;
let line = "";
let año = "";
let energia = -1;
let m = "mensaje";
document.addEventListener('DOMContentLoaded',() => {
    const buttom = document.getElementById('enviar');
    buttom.addEventListener('click', () => {
        const consumoM = document.getElementById('consUsuaMensual').value;
        const resultado = document.getElementById('resultado');
        let max = ((s/12)*1000);
        main();
        if (consumoM === ""){
            resultado.innerHTML = "Por favor, ingrese su consumo mensual.";
            resultado.style.color = "red";
            
        }else if(line === ""){
            resultado.innerHTML = "Por favor, seleccione un pais.";
            resultado.style.color = "red";

        }else if(energia === -1){
            resultado.innerHTML = "Por favor, seleccione un tipo de enegia.";
            resultado.style.color = "red";

        }else if(año === ""){
            resultado.innerHTML = "Por favor, seleccione un año.";
            resultado.style.color = "red";

        }else if(parseFloat(consumoM) > max){
            resultado.innerHTML = "Por favor, no sobrepase el limite de "+ max;
            resultado.style.color = "red";

        }else{
        let consuTA = (parseFloat(consumoM) /1000)*12;
        let consumoT = (consuTA*100) / s;
        resultado.innerHTML = consumoT;
        resultado.style.color = 'black';
        }
    });

});

async function cargarCSV(line,años,energia){
    try {
        const respuesta = await fetch("./Graficas/energyConsumcion.csv");//cargar el archivo CSV
        const texto = await respuesta.text();//leer el contenido como texto 

        const lineas = texto.split('\n');//dividir el contenido por filas
        const cuerpo = lineas.slice(1);//obtener filas de datos 
        cuerpo.forEach((linea) => {
            const columnas = linea.split(',');//dividir columnas por coma
            //verificar la linea tenga el numero correcto de columnas        
            if(columnas[0] === line){
                if(columnas[2] === años){
                    s = parseFloat(columnas[energia]);
                }
            }
        });
    }
    catch(error) {
        console.error('Error al cargar el CSV:', error);
    }
}
async function main(){
    line = seleccion();
    año = year();
    energia = energy();
    cargarCSV(line, año, energia);
}
//llamar a la funcion para que cargar el CSV
function seleccion(){
    if (document.getElementById("colombia").selected == true) {
        return("Colombia");
    }
    if (document.getElementById("china").selected == true) {
        return("China");
    }
    return "";
}

function year(){
    if(document.getElementById("2021").selected == true) {
        return("2021");
    }
    if(document.getElementById("2020").selected == true) {
        return("2020");
    }
    if(document.getElementById("2019").selected == true) {
        return("2019");
    }
    return "";
}
function energy(){
    if(document.getElementById("GB").selected == true) {
        return(3);
    }
    if(document.getElementById("SG").selected == true) {
        return(4);
    }
    if(document.getElementById("WG").selected == true) {
        return(5);
    }
    if(document.getElementById("HG").selected == true) {
        return(6);
    }
    return "";
}