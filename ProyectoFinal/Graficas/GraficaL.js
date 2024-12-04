let datosG = [0,0,0,0,0,0,0,0,0,0
            ,0,0,0,0,0,0,0,0,0,0
            ,0,0];
let datosS = [0,0,0,0,0,0,0,0,0,0
            ,0,0,0,0,0,0,0,0,0,0
            ,0,0];
let datosW = [0,0,0,0,0,0,0,0,0,0
            ,0,0,0,0,0,0,0,0,0,0
            ,0,0];
let datosH = [0,0,0,0,0,0,0,0,0,0
            ,0,0,0,0,0,0,0,0,0,0
            ,0,0];
let data;
document.addEventListener('DOMContentLoaded',() => {
    const buttom = document.getElementById('enviar');
    buttom.addEventListener('click', () => {
        const labels = ['2000', '2001', '2002','2003', '2004', '2005', '2006',
             '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015',
              '2016', '2017', '2018','2019', '2020', '2021']

        const dataset1 = {
            label: "Geo Biomass",
            data: [datosG[0], datosG[1], datosG[2], datosG[3], datosG[4], datosG[5], datosG[6], datosG[7],
                datosG[8], datosG[9], datosG[10], datosG[11], datosG[12], datosG[13], datosG[14],
                datosG[15], datosG[16], datosG[17], datosG[18], datosG[19], datosG[20], datosG[21]],
            borderColor: 'rgba(248, 37, 37, 0.8)',
            fill: false,
            tension: 0.1
        };

        const dataset2 = {
            label: "Solar Generation",
            data: [datosS[0], datosS[1], datosS[2], datosS[3], datosS[4], datosS[5], datosS[6], datosS[7],
            datosS[8], datosS[9], datosS[10], datosS[11], datosS[12], datosS[13], datosS[14],
            datosS[15], datosS[16], datosS[17], datosS[18], datosS[19], datosS[20], datosS[21]],
            borderColor: 'rgba(69, 248, 84, 0.8)',
            fill: false,
            tension: 0.1
        };

        const dataset3 = {
            label: "Wind Generation",
            data: [datosW[0], datosW[1], datosW[2], datosW[3], datosW[4], datosW[5], datosW[6], datosW[7],
                datosW[8], datosW[9], datosW[10], datosW[11], datosW[12], datosW[13], datosW[14],
                datosW[15], datosW[16], datosW[17], datosW[18], datosW[19], datosW[20], datosW[21]],
            borderColor: 'rgba(69, 140, 248, 0.8)',
            fill: false,
            tension: 0.1
        };

        const dataset4 = {
            label: "Hydro Generation",
            data: [datosH[0], datosH[1], datosH[2], datosH[3], datosH[4], datosH[5], datosH[6], datosH[7],
            datosH[8], datosH[9], datosH[10], datosH[11], datosH[12], datosH[13], datosH[14],
            datosH[15], datosH[16], datosH[17], datosH[18], datosH[19], datosH[20], datosH[21]],
            borderColor: 'rgba(245, 40, 145, 0.8)',
            fill: false,
            tension: 0.1
        };

        const graph = document.querySelector("#graph");

        const data = {
            labels: labels,
            datasets: [dataset1,dataset2,dataset3,dataset4]
        };

        const config = {
            type: 'line',
            data: data,
        };

        new Chart(graph, config);
    });

});
async function cargarCSV(line){
    try {
        const respuesta = await fetch("./energyConsumcion.csv");//cargar el archivo CSV
        const texto = await respuesta.text();//leer el contenido como texto 

        const lineas = texto.split('\n');//dividir el contenido por filas
        const cuerpo = lineas.slice(1);//obtener filas de datos 
        let n  = 0;
        cuerpo.forEach((linea) => {
            const columnas = linea.split(',');//dividir columnas por coma
            //verificar la linea tenga el numero correcto de columnas        
            if(columnas[0] === line){
                if(columnas[2] > 1999){
                    datosG[n]= parseFloat(columnas[3]);
                    datosS[n]= parseFloat(columnas[4]);
                    datosW[n]= parseFloat(columnas[5]);
                    datosH[n]= parseFloat(columnas[6]);
                    n++
                }
            }
        });
    }
    catch(error) {
        console.error('Error al cargar el CSV:', error);
    }
}
async function barras(){
    let line = seleccion();
    cargarCSV(line);
}

function seleccion(){
    if (document.getElementById("colombia").selected == true) {
        return("Colombia");
    }
    if (document.getElementById("china").selected == true) {
        return("China");
    }
    if (document.getElementById("africa").selected == true) {
        return("Africa");
    }
    return "";
}