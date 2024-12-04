let datos = [0,0,0,0];
let paises = ["Geo Biomass","Solar Generation","Wind Generation","Hydro Generation"];
let graph= document.querySelector("#graph");
let data;
document.addEventListener('DOMContentLoaded',() => {
    const buttom = document.getElementById('enviar');
    buttom.addEventListener('click', () => {
        const labels = [paises[0], paises[1], paises[2], paises[3]];
        const colors = ['rgb(69,177,223)', 'rgb(99,201,122)', 'rgb(203,82,82)', 'rgb(229,224,88)'];
        barras();
        data = {
            labels: labels,
            datasets: [{
                label:"Todos los datos de Colombia",
                data: [datos[0], datos[1], datos[2], datos[3]],
                backgroundColor: colors
            }]
        };
        const config = {
            type: 'bar',
            data: data,
        };
        
        new Chart(graph, config);
    });

});
async function cargarCSV(años){
    try {
        const respuesta = await fetch("./energyConsumcion.csv");//cargar el archivo CSV
        const texto = await respuesta.text();//leer el contenido como texto 

        const lineas = texto.split('\n');//dividir el contenido por filas
        const cuerpo = lineas.slice(1);//obtener filas de datos 
        let n  = 0;
        cuerpo.forEach((linea) => {
            const columnas = linea.split(',');//dividir columnas por coma
            //verificar la linea tenga el numero correcto de columnas        
            if(columnas[0] === "Colombia"){
                if(columnas[2] === años){
                    datos[0]= parseFloat(columnas[3]);
                    datos[1]= parseFloat(columnas[4]);
                    datos[2]= parseFloat(columnas[5]);
                    datos[3]= parseFloat(columnas[6]);
                }
            }
        });
    }
    catch(error) {
        console.error('Error al cargar el CSV:', error);
    }
}
async function barras(){
    let año = year();
    cargarCSV(año);
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