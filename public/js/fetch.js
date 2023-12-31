import { loadingScreen } from "./effects.js";

//■■■■■■■■■■■■■■■ Fetch and fetchEvent ■■■■■■■■■■■■■■■■■■■■//

    let isLoading=true;

    const catchEmAll = async (url) => {
        isLoading=true;
        try {
            let res = await fetch(url);
            let data = await res.json();
            isLoading=false;
            return data;
        } catch (error) {
            console.log('error: '+ error);
            return error;
        }
    };

    const allFetchLoaded = new Event('allFetchLoaded');

//■■■■■■■■■■■■■■■■ Display fetch into cards ■■■■■■■■■■■■■■■//

    const displayCards= async (url, start, end) => {
        let item='';
        let body= '';

        //amount limits how much pokemon will be fetched and displayed
        for (start; start < end; start++) {
            //concatenation of index to end of endpoint, so it fetchs info of each pokemon
            let urlEach=url+start;

            item= await catchEmAll(urlEach);

            //destructuring of main attr
            let {id, name, weight, height, types} = item;

            //parse of id so it shows with "000" format
            if ((id.toString()).length===1) {
                id="00"+id;
            } else if((id.toString()).length===2){
                id="0"+id;
            }

            //display of multiple types with appropiate background for each one
            let typeNames='';
            for (let i = 0; i < types.length; i++) {

                typeNames+=`<p class="inline m-2 bg-[var(--${types[i].type.name})] rounded p-2 text-[1.25rem] min-w-[5rem] text-center">${types[i].type.name}</p>`
            };

            //style of each card (the name.split and length check is because of some of the names delivered with extra words by the endpoint)
            body+=`
            <article data-id="${item.id}" class="pokemonCard relative flex flex-col p-4 m-2 rounded bg-[var(--main-bg)] overflow-hidden items-center hover:shadow-xl hover:shadow-[var(--${types[0].type.name})] whitespace-nowrap z-1" title="Click to show all stats!">
                <p class="pokemon-card-id-back text-[14rem] sm:text-[8rem] md:text-[8rem] lg:text-[10rem]">#${id}</p>
                <img id=${item.id} class="pokemon-img min-w-[150px] min-h-[150px] w-2/3 h-1/3 shrink-0" src=${item.sprites.other['official-artwork'].front_default}?tr=w-200,h-200 loading="lazy">
                <div class="flex flex-row justify-center items-center overflow-hidden" data-id="${item.id}">
                    <h5 class="text-gray text-[0.9rem] bg-gray-200 rounded-l px-1 py-2 mr-2">#${id}</h5>
                    <h2 class="text-[2rem]">${name.split('-').length>1?(name.split('-'))[0] +' '+ (name.split('-'))[1]:name}</h2>
                </div>
                <div class="flex flex-row" data-id="${item.id}">
                    ${typeNames}
                </div>
                <div class="flex flex-row justify-evenly align-center py-3 overflow-none" data-id="${item.id}">
                    <p class="inline text-gray mx-4 bg-gray-200 rounded px-4 py-1">${(height*0.1).toFixed(2)} m</p>
                    <p class="inline text-gray mx-4 bg-gray-200 rounded px-4 py-1">${weight/10} kg</p>
                </div>
            </article>`;
        }



        //append of whole body containing cards into the container
        const containerList=document.getElementById('display-list');
        containerList.innerHTML=body;
        document.dispatchEvent(allFetchLoaded);

    }

//Instantiation of Display fetch into cards

const url= "https://pokeapi.co/api/v2/pokemon/";

document.addEventListener("DOMContentLoaded", () => {
    displayCards(url, 1, 152);
    //Loading Animation
    const containerList=document.getElementById('display-list');
    loadingScreen(isLoading,containerList);
});

export {catchEmAll, displayCards, url, allFetchLoaded};
