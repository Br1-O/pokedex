//■■■■■■■■■■■■■■■■■■■■■■■■■■■ imported fx/var from fetch.js ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■//

import {catchEmAll, displayCards, url} from "./fetch.js";

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
            <article class="pokemonCard relative flex flex-col p-4 m-2 rounded bg-[var(--main-bg)] overflow-hidden items-center shadow-md shadow-black whitespace-nowrap z-1">
                <p class="pokemon-card-id-back text-[14rem] sm:text-[8rem] md:text-[8rem] lg:text-[10rem]">#${id}</p>
                <img class="min-w-[150px] min-h-[150px] w-2/3 h-1/3 shrink-0" src=${item.sprites.other['official-artwork'].front_default} alt="pokemon">
                <div class="flex flex-row justify-center items-center overflow-hidden">
                    <h5 class="text-gray text-[0.9rem] bg-gray-200 rounded-l px-1 py-2 mr-2">#${id}</h5>
                    <h2 class="text-[2rem]">${name.split('-').length>1?(name.split('-'))[0] +' '+ (name.split('-'))[1]:name}</h2>
                </div>
                <div class="flex flex-row">
                    ${typeNames}
                </div>
                <div class="flex flex-row justify-evenly align-center py-3 overflow-none">
                    <p class="inline text-gray mx-4 bg-gray-200 rounded px-4 py-1">${(height*0.1).toFixed(2)} m</p>
                    <p class="inline text-gray mx-4 bg-gray-200 rounded px-4 py-1">${weight/10} kg</p>
                </div>
            </article>
        `
    });

    //append of whole body containing cards into the container
    const containerList=document.getElementById('display-list');
    containerList.innerHTML=body;
}

//creating of EventListener for each Type Button

const allBtnType=document.querySelectorAll('.type');

allBtnType.forEach( (btn) => {

    if(btn.dataset.type!=="all"){
        btn.addEventListener('click', async () => {
            let type=btn.dataset.type;
            let q= await filterByCategory(catchEmAll, url, "types", type, 1, 1011);
            displayPokemonQueryIntoCards(q);

        });
    }else{
        btn.addEventListener('click', async () => {
            displayCards(url, 1, 1011);
        });
    }   
});


//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ filter function for generation filter ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■//

const allRadioGen=document.querySelectorAll('.gen-filter');

const genChecked= () => {

    if(allRadioGen[0].checked){
            displayCards(url, 1, 1011);
        }else if(allRadioGen[1].checked){
            displayCards(url, 1, 152);
        }else if(allRadioGen[2].checked){
            displayCards(url, 152, 252);
        }else if(allRadioGen[3].checked){
            displayCards(url, 252, 387);
        }else if(allRadioGen[4].checked){
            displayCards(url, 387, 494);
        }else if(allRadioGen[5].checked){
            displayCards(url, 494, 650);
        }else if(allRadioGen[6].checked){
            displayCards(url, 650, 722);
        }else if(allRadioGen[7].checked){
            displayCards(url, 722, 810);
        }else if(allRadioGen[8].checked){
            displayCards(url, 810, 906);
        }else{
            displayCards(url, 906, 1011);
        }
};

allRadioGen.forEach( (btn) => {
    btn.addEventListener('click', () => {
        genChecked();
    });
});