
async function cargarCSV(line,años){
    try {
        const respuesta = await fetch("./Graficas/energyConsumcion.csv");//cargar el archivo CSV
        const texto = await respuesta.text();//leer el contenido como texto 
        
        const lineas = texto.split('\n');//dividir el contenido por filas
        const encabezados = lineas[0].split(',');//obtener los encabezados (primera linea)
        const cuerpo = lineas.slice(1);//obtener filas de datos 
        const tbody= document.getElementById('tablaUsuarios');
        tbody.innerHTML = [];//limpiar la tabla para volver a rellenarla

        cuerpo.forEach((linea) => {
            const columnas = linea.split(',');//dividir columnas por coma
            //verificar la linea tenga el numero correcto de columnas
            if(columnas.length === encabezados.length) {
                const fila = document.createElement('tr');
                //crear celdas para cada columna
                //verifca cual de las opciones se escogio en los paises
                if(line === "todos"|| line === "") {
                    //esto es por si se escoge un pais y un año al mismo tiempo
                    if(años === "todos"|| años === ""){
                    columnas.forEach((dato) => {
                        const celda = document.createElement('td');
                        celda.innerHTML = dato.trim();
                        fila.appendChild(celda);
                    });
                }else if(columnas[2] === años){
                    columnas.forEach((dato) => {
                        const celda = document.createElement('td');
                        celda.innerHTML = dato.trim();
                        fila.appendChild(celda);
                    });
                }
                }else{
                    if(columnas[0] === line){
                        if(años === "todos"|| años === ""){
                            columnas.forEach((dato) => {
                                const celda = document.createElement('td');
                                celda.innerHTML = dato.trim();
                                fila.appendChild(celda);
                            });
                        }else if(columnas[2] === años){
                            columnas.forEach((dato) => {
                                const celda = document.createElement('td');
                                celda.innerHTML = dato.trim();
                                fila.appendChild(celda);
                            });
                        }
                    }
                }
                tbody.appendChild(fila);//añadir fila al cuerpo de la tabla 
            }
        });
    }
    catch(error) {
        console.error('Error al cargar el CSV:', error);
    }
    document.addEventListener('DOMContentLoaded', ajustarAnchoDeTabla);

}
function main(){
    let line = seleccion();
    let año = year();
    cargarCSV(line, año);
}
    //llamar a la funcion para que cargar el CSV
function seleccion(){
    if (document.getElementById("todos").selected == true) {
        return("todos");
    }
    if (document.getElementById("colombia").selected == true) {
        return("Colombia");
    }
    if (document.getElementById("china").selected == true) {
        return("China");
    }
    return "";
}

function year(){
    if (document.getElementById("todosAños").selected == true) {
        return("todos");
    }
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

// Añade esta función al final de tu archivo listas.js
// Añade esta función al final de tu archivo listas.js
function ajustarAnchoDeTabla() {
    const tbody = document.getElementById('tablaUsuarios');
    const thead = document.getElementById('encabezados');
  
    // Establece el ancho del thead para que coincida con el ancho del tbody
    thead.style.width = tbody.offsetWidth + 'px';
}
  
  // Llama a la función ajustarAnchoDeTabla después de que se haya cargado el DOM