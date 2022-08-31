//import fetch from "node-fetch";

//let number = 1;
//let URI_pokeAPI = `https://pokeapi.co/api/v2/pokemon/`;

let respuestaAPI;
let respuestaApiJson;



let counter = 20;

let iterator = 1;

async function getJson(URI)
{
    respuestaAPI = await fetch(URI);
    respuestaApiJson = await respuestaAPI.json();
}


async function getpokemon(iter,count)
{
    let newURI;
    let container = document.getElementById('container_cards');
    container.innerHTML = "";

    for(let i = iter ; i <= count; i++)
    {
        newURI = `https://pokeapi.co/api/v2/pokemon/${i}`;
        await getJson(newURI);

        container.innerHTML += `
        <div class = "card m-1 pt-3" style="width: 18rem;"> 
            <h3 id="number_of_pokemon">${idPokemon()}</h3>
            <img src=${respuestaApiJson.sprites.other["official-artwork"].front_default} class="card-img-top" alt="${respuestaApiJson.name}.png">
            
            <div class="card-body">
                <h3 class="card-title">${transformName()}</h3>
                <p class="card-text"><b>Type:</b> ${transformType()}</p>
                
             </div>
        </div>
        `;//col-sm-12 col-md-6 col-lg-4
    }
        
}

const transformName = () =>
{
    let splitByName = respuestaApiJson.name.split(''); //Se usa para separar el string
    let upperCase = splitByName[0].toUpperCase();//Creamos la primera letra en mayuscula
    splitByName.shift();//Quitamos la primera letra
    splitByName.unshift(upperCase);//Agregamos al inicio la letra que convertimos en mayuscula
    splitByName = splitByName.join('');//Unimos todo el array para volverlo en un string
    return splitByName;
}

const transformType = () =>
{
    let getType = (respuestaApiJson.types.map((objeto)=>objeto.type.name));
    let shiftType = getType.shift();
    let splitType = shiftType.split('');
    let upperCaseType =  splitType[0].toUpperCase();

    splitType.shift();
    splitType.unshift(upperCaseType);
    splitType = splitType.join('');
    getType.unshift(splitType);
    getType = getType.join(', ');
    
    return getType;
}

let btn_next = () =>
{
    iterator = counter +1;
    //console.log("🚀 ~ iterator", iterator)
    counter += 20;
    //console.log("🚀 ~ counter", counter);
    getpokemon(iterator,counter);
}


let idPokemon = () =>
{
    let getIdPokemon = respuestaApiJson.id;
    //console.log(getIdPokemon)
    if (getIdPokemon <= 9)
    {
        getIdPokemon = "00"+getIdPokemon;
        console.log(getIdPokemon)
    }
    else if ( getIdPokemon >= 10  || getIdPokemon < 99 )
    {
        getIdPokemon = "0"+getIdPokemon;
        console.log(getIdPokemon)
    }
    return getIdPokemon;
}

getpokemon(iterator,counter);

