//■■■■■■■■■■■■■■■■■■■■■■■■■■■ imported fx/var ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■//

import {catchEmAll, displayCards, url, allFetchLoaded} from "./fetch.js";
import { loadingScreen } from "./effects.js";

//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ filter function for nav-bar types buttons ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■//

//function to filter by category, where Parameters: 
//Fetch expression returning json data, url for fetch request, name of the attr to check in objects of json, array or string to be searched, 
//start&end of registers (assumming endpoint being: url/start++ and id of object being object."id")

const filterByCategory = async (fetchFunction,url,category,inputValues,start,end) => {

    let findItems=[];

    for (start; start < end; start++){
        let urlEach = url+start;
        let item= await fetchFunction(urlEach);

        //checking all items category to see if it contains the query value
        item[category].forEach(value => {

            //checking if inputValues is an array or just 1 value, so it can be either of them
            if (Array.isArray(inputValues)) {
                inputValues.forEach(inputValue => {
                    //added .type.name because of the endpoint for the query types in particular
                    if ((value.type.name).includes(inputValue)) {
                        //parse of each object into json and pushing it into the array findItems
                        findItems.push(JSON.stringify(item));
                    }
    
                });
            } else {
                if ((value.type.name).includes(inputValues)) {
                    //parse of the object into json and pushing it into the array findItems
                    findItems.push(JSON.stringify(item));
                }
            }
        });
    }
    return findItems;
}

//■■■■■■■■■■■■■■■■■■■■■■■■■ function to displayIntoCards using a pre existing array of elements ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■//

let type ='all';
let isLoading=true;
const containerList=document.getElementById('display-list');

const displayPokemonQueryIntoCards = (array) => {

    let body= '';

    //iteration through the array of items that meet the query and display of them into screen
    array.forEach(item => {

        item=JSON.parse(item);

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
            <article title="Click to show all stats!" data-id="${item.id}" class="pokemonCard relative flex flex-col p-4 m-2 rounded bg-[var(--main-bg)] overflow-hidden items-center shadow-md shadow-black whitespace-nowrap z-1 hover:shadow-xl hover:shadow-[var(--${types[0].type.name})] ">
                <p class="pokemon-card-id-back text-[14rem] sm:text-[8rem] md:text-[8rem] lg:text-[10rem]">#${id}</p>
                <img class="pokemon-img min-w-[150px] min-h-[150px] w-2/3 h-1/3 shrink-0" src=${item.sprites.other['official-artwork'].front_default} alt="pokemon">
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
            </article>
        `
    });

    //append of whole body containing cards into the container
    containerList.innerHTML=body;
    isLoading=false;
    document.dispatchEvent(allFetchLoaded);
}

//creating of EventListener for each Type Button

const allBtnType=document.querySelectorAll('.type');

allBtnType.forEach( (btn) => {

    if(btn.dataset.type!=="all"){
        btn.addEventListener('click', async () => {
            isLoading=true;
            //setting global variable type so gen radio btns eventListener can filter based on the selected type value
            type=btn.dataset.type;
            //filtering by category also paying attention to the gen number checked
            let q= await filterByCategory(catchEmAll, url, "types", type, genCheckedValues()[0], genCheckedValues()[1]);

            //instantiation of displaying query into cards
            displayPokemonQueryIntoCards(q);

            //Loading Animation
            loadingScreen(isLoading,containerList);
        });
    }else{
        btn.addEventListener('click', async () => {
            isLoading=true;
            type='all';
            displayCards(url, genCheckedValues()[0], genCheckedValues()[1]);

            //Loading Animation
            loadingScreen(isLoading,containerList);

        });
    }   
});


//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ filter function for pokemon generation ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■//

const allRadioGen=document.querySelectorAll('.gen-filter');

//function to return min and max index of pokemon in the gen selected
function genCheckedValues() {

    if(allRadioGen[0].checked){
            return [1,1011];
        }else if(allRadioGen[1].checked){
            return [1,152];
        }else if(allRadioGen[2].checked){
            return [152,252];
        }else if(allRadioGen[3].checked){
            return [252,387];
        }else if(allRadioGen[4].checked){
            return [387,494];
        }else if(allRadioGen[5].checked){
            return [494,650];
        }else if(allRadioGen[6].checked){
            return [650,722];
        }else if(allRadioGen[7].checked){
            return [722,810];
        }else if(allRadioGen[8].checked){
            return [810,906];
        }else{
            return [906,1011];
        }
};
//eventListener for gen radio btn, also filtering based on type
allRadioGen.forEach( (btn) => {
        btn.addEventListener('click', async () => {
            if(type==="all"){
                displayCards(url, (genCheckedValues())[0],(genCheckedValues())[1]);
                //Loading Animation
                loadingScreen(isLoading,containerList);

            }else{
                let q= await filterByCategory(catchEmAll, url, "types", type, genCheckedValues()[0], genCheckedValues()[1]);
                displayPokemonQueryIntoCards(q);

                //Loading Animation
                loadingScreen(isLoading,containerList);

            }
        });
});

//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ Search by name function for search bar ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■//


const searchInput=document.getElementById('search-input');

const searchByName = async (url, inputValue, start, end) => {
    let findItems=[];

    for (start; start < end; start++){
        let urlEach = url+start;
        let item= await catchEmAll(urlEach);

        //checking if inputValue is in name of pokemon
        if ((item.name).includes(inputValue)) {
            //push into array if so
            findItems.push(JSON.stringify(item));
        } 
    };
    return findItems;
}

//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ Search function for search bar ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■//

searchInput.addEventListener('keyup', async () => {
    let inputValue= searchInput.value;
    //search by ID (check if input is not empty and if it contains digits)
    if((inputValue!=='') && /\d/.test(inputValue)){
        displayCards(url,parseInt(inputValue),parseInt(inputValue)+1);

        //Loading Animation
        loadingScreen(isLoading,containerList);

    //search by name (check if input is not empty and if it contains letters)
    }else if((inputValue!=='') && /.*/.test(inputValue)){
        let q= await searchByName(url,inputValue,1,1011);
        displayPokemonQueryIntoCards(q);

        //Loading Animation
        loadingScreen(isLoading,containerList);

    }else{
        //if search input is empty it returns previous query display
        if(type==="all"){
            displayCards(url, (genCheckedValues())[0],(genCheckedValues())[1]);

            //Loading Animation
            loadingScreen(isLoading,containerList);

        }else{
            let q= await filterByCategory(catchEmAll, url, "types", type, genCheckedValues()[0], genCheckedValues()[1]);
            displayPokemonQueryIntoCards(q);

            //Loading Animation
            loadingScreen(isLoading,containerList);

        } 
    }
});


