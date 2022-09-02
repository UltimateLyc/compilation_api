//indexOf
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
    invisibleNext();
    getpokemon(iterator,counter);

    if (iterator > 2 )
    {
        visiblePreview();
    }


}
/* Function that change the class of the next button for invisible or visible*/
const invisibleNext = () =>
{
    let containerNext = document.getElementById('btn_footer_next')
    if(counter > 905)
    {
        containerNext.classList.remove('visible');
        containerNext.classList.add('invisible');
    }
    else if ( counter < 905)
    {
        containerNext.classList.remove('invisible');
        containerNext.classList.add('visible');
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

        if(iterator < 1)
        {
            iterator = 1
            counter = 20
            getpokemon(iterator,counter);
        }
        else
        {
            getpokemon(iterator,counter);
        }
        
    }
    invisibleNext()
    
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

    let getJsonByName;

    let search = document.getElementById('search-pokemon').value;
    let numberSearch = Number(search);

    if(isNaN(numberSearch)) //Validamos si el valor ingresado no es un numero :. quiere decir que es un string
    {
        search = search.toLowerCase();
        let URI_byName = `https://pokeapi.co/api/v2/pokemon/${search}`;

        getJsonByName = await getJson(URI_byName);
        
        /* if (getJsonByName.id == undefined)
        {
            alert("ingreso mal todo ¡tas tonto o que!");
        }
        else
        { */
            printSeacrhCard(containerCardSearch, await getJson(URI_byName));
            nextsCards(getJsonByName.id);
            
        //}
    }
    else{
    
        let URI_byId = `https://pokeapi.co/api/v2/pokemon/${numberSearch}`;

        if (numberSearch > 905)
        {
            alert("Ese pokemon ni existe mamon!");
        }
        else
        {
            getJsonByName = await getJson(URI_byId)
            printSeacrhCard(containerCardSearch, await getJson(URI_byId));
            nextsCards(getJsonByName.id);
        }
        
    }
    
}

//Function that print next cards of your search
let nextsCards = (idSearch) =>
{
    iterator = idSearch + 1;
    counter = iterator +19;
    if (iterator > 2 )
    {
    visiblePreview();
    }
    invisibleNext();
    getpokemon(iterator,counter)
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

getpokemon(iterator,counter);


async function cardTest(idCard)
{
    console.log("🚀 ~ idCard", idCard)
    let URI_ID = `https://pokeapi.co/api/v2/pokemon/${idCard}`
    let cardJson = await getJson(URI_ID)
    console.log("🚀 ~ cardJson", cardJson)

    /* Part of weakness  */ 
    console.log("🚀 ~ get URI for weakness", cardJson.types.map((objeto)=>objeto.type.url))
    let weaknessURI = cardJson.types.map((objeto)=>objeto.type.url)
    let weakness = await getJson(weaknessURI[0])
    console.log("🚀 ~ weakness obj", weakness)

    /* Other parts */ 

    //console.log("🚀 ~ get stats", cardJson.stats)//Conseguimos sus los stats "length = 6 || base_stat =  valor de un stat || stats[length].stat.name = muestra el nombre del stat " !important
    //console.log("🚀 ~ get moves", cardJson.moves.map((objeto)=>objeto.move.name))//Conseguimos sus movimientos !important
    //console.log("🚀 ~ get heigth", cardJson.height)//Conseguimos sus Altura !important
    //console.log("🚀 ~ get weigth", cardJson.weight)//Conseguimos sus Peso !important
    //console.log("🚀 ~ get abilities", cardJson.abilities.map((objeto)=>objeto.ability.name))//Conseguimos sus habilidades !important
    
}