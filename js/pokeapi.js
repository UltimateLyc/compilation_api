//import fetch from "node-fetch";

let counter = 20;
let iterator = 1;
let getRespuestaJson;

async function getJson(URI)
{
    let respuestaAPI = await fetch(URI);
    let respuestaApiJson = await respuestaAPI.json();
    return respuestaApiJson;
}


async function getpokemon(iter,count)
{
    let URI;
    
    let container = document.getElementById('container_cards');
    container.innerHTML = "";

    invisiblePreview();//Se ejecuta la funcion para validar el estado de los contadores e iteradores

    for(let i = iter ; i <= count; i++)
    {
        URI = `https://pokeapi.co/api/v2/pokemon/${i}`;
        printSeacrhCard(container, await getJson(URI))
    }
        
}

const transformName = (setName) =>
{ 
    let splitByName = setName.name.split(''); //Se usa para separar el string
    let upperCase = splitByName[0].toUpperCase();//Creamos la primera letra en mayuscula
    splitByName.shift();//Quitamos la primera letra
    splitByName.unshift(upperCase);//Agregamos al inicio la letra que convertimos en mayuscula
    splitByName = splitByName.join('');//Unimos todo el array para volverlo en un string
    return splitByName;
}

const transformType = (setType) =>
{
    let getType = (setType.types.map((objeto)=>objeto.type.name));
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

let idPokemon = (setId) =>
{
    let getIdPokemon = setId.id;
    //console.log(getIdPokemon)
    if (getIdPokemon <= 9)
    {
        getIdPokemon = "00"+getIdPokemon;
    }
    else if ( getIdPokemon > 9  && getIdPokemon < 100 )
    {
        getIdPokemon = "0"+ getIdPokemon;
    }
   
    return getIdPokemon;
}

let btn_next = () =>
{
    iterator = counter +1;
    counter += 20;
    getpokemon(iterator,counter);

    if (iterator > 2 )
    {
        visiblePreview();
    }
}

const visiblePreview = () =>
{
    let visible = document.getElementById('btn_footer_preview');
    visible.classList.remove('invisible');
    visible.classList.add('visible');
}

let btn_preview = () => 
{
    if (iterator > 1)
    {
        iterator -= 20;
        counter -= 20;
        getpokemon(iterator,counter);
    }
}

const invisiblePreview = () =>
{
    let invisible = document.getElementById('btn_footer_preview');

    if (iterator === 1)
    {
        invisible.classList.remove('visible');
        invisible.classList.add('invisible');
    }
    
}

async function gotcha()
{
    //let idSearch;

    let containerCardSearch = document.getElementById('container_card_search');
    containerCardSearch.innerHTML = "";

    let search = document.getElementById('search-pokemon').value;
    let numberSearch = Number(search);

    if(isNaN(numberSearch)) //Validamos si el valor ingresado no es un numero :. quiere decir que es un string
    {
        search = search.toLowerCase();
        URI_byName = `https://pokeapi.co/api/v2/pokemon/${search}`;

        /* idSearch = await getJson(URI_byName)
        idSearch = idSearch.id
        iterator = idSearch + 1;
        console.log("🚀 ~ idSearch", iterator)
        counter = iterator + 20;
        console.log("🚀 ~ counter", counter)
        
        visiblePreview()
        getpokemon(iterator,counter)
         */
        printSeacrhCard(containerCardSearch, await getJson(URI_byName))

        if (getJsonByName.id == undefined)
        {
            alert("ingreso mal todo ¡tas tonto o que!");
        }

    }
    else{
    
        let URI_byId = `https://pokeapi.co/api/v2/pokemon/${numberSearch}`;

        if (numberSearch > 905)
        {
            alert("Ese pokemon ni existe mamon!");
        }
        else
        {
            printSeacrhCard(containerCardSearch, await getJson(URI_byId))
        }
        
    }
    
}

const printSeacrhCard = (setcontainerCard ,setUriCard) =>
{
    setcontainerCard.innerHTML += `
            <div id = "card-pokemon" class = "card pt-3 " style="width: 18rem;"> 

                <a id = "pokemon-${setUriCard.id}" href="#">

                    <h3 id="number_of_pokemon">${idPokemon(setUriCard)}</h3>
                    
                    <img src=${setUriCard.sprites.other["official-artwork"].front_default} class="card-img-top" alt="${setUriCard.name}.png">
                    
                    <div class="card-body">

                        <h3 class="card-title">${transformName(setUriCard)}</h3>
                        <p class="card-text"><b>Type:</b> ${transformType(setUriCard)}</p>
                        
                    </div>
                </a>
            </div>`;
}

getpokemon(iterator,counter);