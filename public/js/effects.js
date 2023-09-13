import {catchEmAll, url} from "./fetch.js";

//■■■■■■■■■■■■■■■■■■■■ Toggle visibility for type buttons in nav-bar ■■■■■■■■■■■■■■■■■■■//

    const btnToggleTypes=document.getElementById('btn-toggle-types');
    let typeListVisible= false;

    btnToggleTypes.addEventListener('click', () => {

        const allTypeLists=document.querySelectorAll('.types');
        
        if (!typeListVisible) {
            allTypeLists.forEach( (typeList) => {
                typeList.classList.remove('hidden');
                typeList.classList.add('flex');
            });
            typeListVisible= true;
            btnToggleTypes.innerText='Hide types';
            btnToggleTypes.title='Click to hide all types!'
        } else {
            allTypeLists.forEach( (typeList) => {
                typeList.classList.remove('flex');
                typeList.classList.add('hidden');
            });
            typeListVisible=false;
            btnToggleTypes.innerText='Show types';
            btnToggleTypes.title='Click to show all types!'
        }
    })

//■■■■■■■■■■■■■■■■■■■■ Toggle colors on click for type buttons in nav-bar ■■■■■■■■■■■■■■■■■■■//

    const typeBtns=document.querySelectorAll('.type');
    const typeList=document.getElementById('types-list');

    typeList.addEventListener('click', (event) => {
        
        typeBtns.forEach( (type) => {
            if(type.contains(event.target)){
                type.addEventListener('click', () =>{
                    type.classList.add('non-active');
                });
            }else{
                type.classList.remove('non-active');
            }
        })
    });

//■■■■■■■■■■■■■■■■■■■■ Dialog style and open/close dialog functions ■■■■■■■■■■■■■■■■■■■//

    const dialogWindow= document.getElementById('dialogForItems');
    let dialogOpened=false;

    const openDialog = (dialog) =>{
        dialog.show();    
        console.log('dialog open');
    }

    const closeDialog = (dialog) =>{
        dialog.close();
        console.log('dialog close');
    }

//■■■■■■■■■■■■■■■■■■■■ Dialog style and open Dialog window on click over pokemon ■■■■■■■■■■■■■■■■■■■//

    //function to assign an event click for items in a iterable that open a dialog with a body assign through a callback function
    const dialogForItems = (iterableToAssignDialogEvent, dialogBody) => {

        iterableToAssignDialogEvent.forEach(item => {
            item.addEventListener('click', async (event) => {

                //openDialog fx
                openDialog(dialogWindow);
                dialogOpened=true;

                //assign id of card into callback fx for string template body for dialog to fetch all data                
                dialogWindow.innerHTML= await dialogBody(url, (event.target.parentNode).dataset.id);

                //close button function for dialog body
                const closeButton = document.getElementById('closeModalForItems');
                closeButton.addEventListener('click', () => {
                    closeDialog(dialogWindow);
                    dialogOpened=false;
                });

            });
        });
    }
    
    //function that returns string template for dialog body, parameters: base url and id for fetch into that url, given: "url/id" is endpoint for data
    async function dialogBody(url, idForFetch){

        console.log('dialog body dispatched');

        let urlUnique = url+idForFetch;
        let item= await catchEmAll(urlUnique);

        let {name, id, height, weight} = item;

        let dialogBody= `<div>
                            <button id='closeModalForItems'> [X] </button>
                            
                            <article data-id="${item.id}" class="pokemonCard relative flex flex-col p-4 m-2 rounded bg-[var(--main-bg)] overflow-hidden items-center hover:shadow-xl hover:shadow-[var(--${item.types[0].type.name})] whitespace-nowrap z-1" title="Click to show all stats!">
                                <p class="pokemon-card-id-back text-[14rem] sm:text-[8rem] md:text-[8rem] lg:text-[10rem]">#${id}</p>
                                <img class="pokemon-img min-w-[150px] min-h-[150px] w-2/3 h-1/3 shrink-0" src=${item.sprites.other['official-artwork'].front_default} alt="pokemon">
                                <div class="flex flex-row justify-center items-center overflow-hidden">
                                    <h5 class="text-gray text-[0.9rem] bg-gray-200 rounded-l px-1 py-2 mr-2">#${id}</h5>
                                    <h2 class="text-[2rem]">${name.split('-').length>1?(name.split('-'))[0] +' '+ (name.split('-'))[1]:name}</h2>
                                </div>
                                <div class="flex flex-row justify-evenly align-center py-3 overflow-none">
                                    <p class="inline text-gray mx-4 bg-gray-200 rounded px-4 py-1">${(height*0.1).toFixed(2)} m</p>
                                    <p class="inline text-gray mx-4 bg-gray-200 rounded px-4 py-1">${weight/10} kg</p>
                                </div>
                            </article>

                        </div>`;

        return dialogBody;
    }
                
    //assigning dialog event to cards after checking if fetching of data is complete via custom event
    document.addEventListener("allFetchLoaded", ()=> {
        const pokemon=document.querySelectorAll('.pokemonCard');
        console.log('dialogAssigned');
        dialogForItems(pokemon, dialogBody);
    });

