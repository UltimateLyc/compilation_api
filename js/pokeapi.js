//import fetch from "node-fetch";

/* Global Variable  */
let counter = 20;
let iterator = 1;
let getRespuestaJson;

/* Container DOM  */
let containerCardSearch = document.getElementById('container_card_search');
let container = document.getElementById('container_cards');

/* Function get JSON of the API  */
async function getJson(URI)
{
    let respuestaAPI = await fetch(URI);
    let respuestaApiJson = await respuestaAPI.json();
    return respuestaApiJson;
}

/* Function print principal Dashboard  */
async function getpokemon(iter,count)
{
    let URI;
    
    
    container.innerHTML = "";

    invisiblePreview();//Se ejecuta la funcion para validar el estado de los contadores e iteradores

    for(let i = iter ; i <= count; i++)
    {
        URI = `https://pokeapi.co/api/v2/pokemon/${i}`;
        printSeacrhCard(container, await getJson(URI))
    }
        
}

/* Function that transform first letter of name  */
const transformName = (setName) =>
{ 
    let splitByName = setName.name.split(''); //Se usa para separar el string
    let upperCase = splitByName[0].toUpperCase();//Creamos la primera letra en mayuscula
    splitByName.shift();//Quitamos la primera letra
    splitByName.unshift(upperCase);//Agregamos al inicio la letra que convertimos en mayuscula
    splitByName = splitByName.join('');//Unimos todo el array para volverlo en un string
    return splitByName;
}

/* Function that transform first letter of type  */
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

/* Function that adds zeros to the ID  */
let idPokemon = (setId) =>
{
    let getIdPokemon = setId.id;
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

/* Buttom function next */
let btn_next = () =>
{
    containerCardSearch.innerHTML = "";

    iterator = counter +1;
    counter += 20;
    getpokemon(iterator,counter);

    if (iterator > 2 )
    {
        visiblePreview();
    }
}

/* Function that change the class of the preview button for visible */
const visiblePreview = () =>
{
    let visible = document.getElementById('btn_footer_preview');
    visible.classList.remove('invisible');
    visible.classList.add('visible');
}

/* Buttom function preview */
let btn_preview = () => 
{
    containerCardSearch.innerHTML = "";

    if (iterator > 1)
    {
        iterator -= 20;
        counter -= 20;
        getpokemon(iterator,counter);
    }
}

/* Function that change the class of the preview button for invisible */
const invisiblePreview = () =>
{
    let invisible = document.getElementById('btn_footer_preview');

    if (iterator === 1)
    {
        invisible.classList.remove('visible');
        invisible.classList.add('invisible');
    }
    
}

/* Buttom function Search a pokemon */
async function gotcha()
{
    
    containerCardSearch.innerHTML = "";

    let search = document.getElementById('search-pokemon').value;
    let numberSearch = Number(search);

    if(isNaN(numberSearch)) //Validamos si el valor ingresado no es un numero :. quiere decir que es un string
    {
        search = search.toLowerCase();
        URI_byName = `https://pokeapi.co/api/v2/pokemon/${search}`;

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

/* Function that print cards of the pokemons */
const printSeacrhCard = (setcontainerCard ,setUriCard) =>
{
    setcontainerCard.innerHTML += `
            <div id = "card-pokemon" class = "card pt-3 " style="width: 18rem;"> 

                <a onclick="cardTest(${setUriCard.id})" id = "pokemon-${setUriCard.id}" href="#">

                    <h3 id="number_of_pokemon">${idPokemon(setUriCard)}</h3>
                    
                    <img src=${setUriCard.sprites.other["official-artwork"].front_default} class="card-img-top" alt="${setUriCard.name}.png">
                    
                    <div class="card-body">

                        <h3 class="card-title">${transformName(setUriCard)}</h3>
                        <p class="card-text"><b>Type:</b> ${transformType(setUriCard)}</p>
                        
                    </div>
                </a>
            </div>`;
}

function cardTest(idCard)
{
    console.log("🚀 ~ idCard", idCard)
}

getpokemon(iterator,counter);