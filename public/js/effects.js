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

                const dialogOpenedEvent = new Event('dialogOpenedEvent');
                document.dispatchEvent(dialogOpenedEvent);

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

        let {name, id, height, weight, types} = item;

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

            //■■ check and fetch for "abilities" ■■
            let abilitiesAll = item.abilities;
            let abilitiesName = '';

            abilitiesAll.forEach(ability => {
                abilitiesName+= `<p class=" w-full text-gray ml-4 bg-gray-200 px-4 py-1">${ability.ability.name}</p>`
            });

            

        //■■■■■■ DIALOG BODY string template ■■■■■■// 
        let dialogBody= `
                <div class="flex flex-column overflow-y-auto">

                    <button id='closeModalForItems' class="fixed top-0 left-0"> [X] </button>
                    
                    <div class="flex flex-col md:flex-row items-center">

                        <div class="flex flex-col">
                          
                            <div class="flex flex-row justify-center items-center">
                                <h2 class="text-[5rem]">${name.split('-').length>1?(name.split('-'))[0] +' '+ (name.split('-'))[1]:name}</h2>
                            </div>

                            <div data-id="${item.id}" class="relative flex flex-col p-4 m-2 rounded bg-[var(--main-bg)] items-center whitespace-nowrap z-1">
                                                                
                                <div class="relative min-w-[350px] min-h-[350px] mx-auto my-1">

                                    <div class="slide relative p-4">
                                        <img data-id="0" class="w-full h-[300px] pokemon-img min-w-[200px] min-h-[200px] shrink-0 m-3" src=${item.sprites.other['official-artwork'].front_default} alt="${name} no posee esta version de ilustracion">
                                        <div class="legendDialogImg absolute bottom-0 w-full px-5 py-3 bg-black/40 text-center text-white"> Official art-work </div>
                                    </div>
                            
                                    <div class="slide relative p-4">
                                        <img data-id="1" class="w-full h-[300px] pokemon-img min-w-[200px] min-h-[200px] shrink-0 m-3" src=${item.sprites.other['official-artwork'].front_shiny} alt="${name} no posee esta version de ilustracion">
                                        <div class="legendDialogImg absolute bottom-0 w-full px-5 py-3 bg-black/40 text-center text-white"> Official art-work (shiny)</div>
                                    </div>
                            
                                    <div class="slide relative p-4">
                                        <img data-id="2" class="w-full h-[300px] pokemon-img min-w-[200px] min-h-[200px] shrink-0 m-3" src=${item.sprites.other['dream_world'].front_default} alt="${name} no posee esta version de ilustracion">
                                        <div class="legendDialogImg absolute bottom-0 w-full px-5 py-3 bg-black/40 text-center text-white">Dream-World </div>
                                    </div>

                                    <div class="slide relative p-4">
                                        <img data-id="3" class="w-full h-[300px] pokemon-img min-w-[200px] min-h-[200px] shrink-0 m-3" src=${item.sprites.other['home'].front_default} alt="${name} no posee esta version de ilustracion">
                                        <div class="legendDialogImg absolute bottom-0 w-full px-5 py-3 bg-black/40 text-center text-white">Home </div>
                                    </div>

                                    <div class="slide relative p-4">
                                        <img data-id="4" class="w-full h-[300px] pokemon-img min-w-[200px] min-h-[200px] shrink-0 m-3" src=${item.sprites.other['home'].front_shiny} alt="${name} no posee esta version de ilustracion">
                                        <div class="legendDialogImg absolute bottom-0 w-full px-5 py-3 bg-black/40 text-center text-white">Home (shiny)</div>
                                    </div>
                            
                                    <a id='carrousel-back' class="absolute left-0 top-1/2 p-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white hover:text-amber-500 cursor-pointer"
                                        >❮</a>
                            
                                    <a id='carrousel-forward' class="absolute right-0 top-1/2 p-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white hover:text-amber-500 cursor-pointer"
                                        >❯</a>
                            
                                </div>
                                <br>
                            
                                <div class="flex justify-center items-center space-x-5 m-2">
                                    <div class="dot w-4 h-4 rounded-full cursor-pointer"></div>
                                    <div class="dot w-4 h-4 rounded-full cursor-pointer"></div>
                                    <div class="dot w-4 h-4 rounded-full cursor-pointer"></div>
                                    <div class="dot w-4 h-4 rounded-full cursor-pointer"></div>
                                    <div class="dot w-4 h-4 rounded-full cursor-pointer"></div>
                                </div>
                                
                                
                                <div class="flex flex-row" data-id="${item.id}">
                                    ${typeNames}
                                </div>

                            </div>

                            <div class="flex flex-row justify-evenly items-center py-3 overflow-none">
                                <p class="inline text-gray mx-4 bg-gray-200 rounded px-4 py-1">Height: ${(height*0.1).toFixed(2)} m</p>
                                <p class="inline text-gray mx-4 bg-gray-200 rounded px-4 py-1">Weight: ${weight/10} kg</p>
                            </div>

                        </div>

                        <div class="flex flex-col justify-center items-center">

                            <div class="flex flex-col justify-evenly items-center py-3">

                                <h2 class="text-[2rem] m-2 mx-4"> Abilities: </h2>

                                <div class="flex flex-row justify-center items-center py-3">

                                    <div class="flex flex-col justify-center items-center py-3">
                                        ${abilitiesName}
                                    </div>

                                </div>


                                <h2 class="text-[2rem] m-2 mx-4"> Base Stats: </h2>

                                <div class="flex flex-row justify-center items-center py-3">

                                    <div class="flex flex-col justify-center items-center py-3">
                                        <p class=" min-w-[11rem] text-gray ml-4 bg-gray-200 px-4 py-1">${item.stats[0].stat.name}</p>
                                        <p class=" min-w-[11rem] text-gray ml-4 bg-gray-200 px-4 py-1">${item.stats[1].stat.name}</p>
                                        <p class=" min-w-[11rem] text-gray ml-4 bg-gray-200 px-4 py-1">${item.stats[2].stat.name}</p>
                                        <p class=" min-w-[11rem] text-gray ml-4 bg-gray-200 px-4 py-1">${item.stats[3].stat.name}</p>
                                        <p class=" min-w-[11rem] text-gray ml-4 bg-gray-200 px-4 py-1">${item.stats[4].stat.name}</p>
                                        <p class=" min-w-[11rem] text-gray ml-4 bg-gray-200 px-4 py-1">${item.stats[5].stat.name}</p>
                                    </div>

                                    <div class="flex flex-col justify-center items-center py-3">
                                        <p class=" min-w-[11rem] text-gray mr-4 bg-gray-200  px-5 py-1">${item.stats[0].base_stat} </p>
                                        <p class=" min-w-[11rem] text-gray mr-4 bg-gray-200  px-5 py-1">${item.stats[1].base_stat} </p>
                                        <p class=" min-w-[11rem] text-gray mr-4 bg-gray-200  px-5 py-1">${item.stats[2].base_stat} </p>
                                        <p class=" min-w-[11rem] text-gray mr-4 bg-gray-200  px-5 py-1">${item.stats[3].base_stat} </p>
                                        <p class=" min-w-[11rem] text-gray mr-4 bg-gray-200  px-5 py-1">${item.stats[4].base_stat} </p>
                                        <p class=" min-w-[11rem] text-gray mr-4 bg-gray-200  px-5 py-1">${item.stats[5].base_stat} </p>
                                    </div>

                                </div>
                            
                            </div>

                            <div class="flex flex-col justify-evenly items-center py-3">

                                <h2 class="text-[2rem] m-2 mx-4"> Moves: </h2>

                                <div class="flex flex-row justify-center items-center py-3">

                                    <div class="flex flex-col justify-center items-center py-3">
                                        <p class=" min-w-[11rem] text-gray ml-4 bg-gray-200 px-4 py-1">${item.moves[0].move.name}</p>
                                        <p class=" min-w-[11rem] text-gray ml-4 bg-gray-200 px-4 py-1">${item.moves[1].move.name}</p>
                                        <p class=" min-w-[11rem] text-gray ml-4 bg-gray-200 px-4 py-1">${item.moves[2].move.name}</p>
                                        <p class=" min-w-[11rem] text-gray ml-4 bg-gray-200 px-4 py-1">${item.moves[3].move.name}</p>
                                        <p class=" min-w-[11rem] text-gray ml-4 bg-gray-200 px-4 py-1">${item.moves[4].move.name}</p>
                                        <p class=" min-w-[11rem] text-gray ml-4 bg-gray-200 px-4 py-1">${item.moves[5].move.name}</p>
                                    </div>

                                    <div class="flex flex-col justify-center items-center py-3">
                                        <p class=" min-w-[11rem] text-gray mr-4 bg-gray-200  px-5 py-1">${item.stats[0].base_stat} </p>
                                        <p class=" min-w-[11rem] text-gray mr-4 bg-gray-200  px-5 py-1">${item.stats[1].base_stat} </p>
                                        <p class=" min-w-[11rem] text-gray mr-4 bg-gray-200  px-5 py-1">${item.stats[2].base_stat} </p>
                                        <p class=" min-w-[11rem] text-gray mr-4 bg-gray-200  px-5 py-1">${item.stats[3].base_stat} </p>
                                        <p class=" min-w-[11rem] text-gray mr-4 bg-gray-200  px-5 py-1">${item.stats[4].base_stat} </p>
                                        <p class=" min-w-[11rem] text-gray mr-4 bg-gray-200  px-5 py-1">${item.stats[5].base_stat} </p>
                                    </div>

                                </div>
                            </div>
                        
                        </div>

                        </div>



                    </div>

                </div>
        `;

        //box-shadow for dialog
        dialogWindow.classList.add("shadow-xl");
        dialogWindow.classList.add(`shadow-[var(--${item.types[0].type.name})]`);

        return dialogBody;
    }
                
    //assigning dialog event to cards after checking if fetching of data is complete via custom event
    document.addEventListener("allFetchLoaded", ()=> {
        const pokemon=document.querySelectorAll('.pokemonCard');
        console.log('dialogAssigned');
        dialogForItems(pokemon, dialogBody);
    });


//■■■■■■■■■■■■■■■■■■■■ Carrousel for sprites in dialog ■■■■■■■■■■■■■■■■■■■//

document.addEventListener("dialogOpenedEvent", ()=> {
    
    const dots = document.querySelectorAll('.dot');
    const pokemonImgs = document.querySelectorAll(".pokemon-img");
    
    let slideIndex = 1;

    showSlide(slideIndex);

    // change slide with the prev/next button
    function moveSlide(moveStep) {
        showSlide(slideIndex += moveStep);
    }

    // change slide with the dots
    function currentSlide(n) {
        showSlide(slideIndex = n);
    }

    function showSlide(n) {
        let i;
        const slides = document.querySelectorAll(".slide");
        
        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }

        // hide all slides
        for (i = 0; i < slides.length; i++) {
            slides[i].classList.add('hidden');
        }

        // remove active status from all dots
        for (i = 0; i < dots.length; i++) {
            dots[i].classList.remove('bg-[var(--fire)]');
            dots[i].classList.add('bg-blue-200');
        }

        // show the active slide
        slides[slideIndex - 1].classList.remove('hidden');

        // highlight the active dot
        dots[slideIndex - 1].classList.remove('bg-blue-200');
        dots[slideIndex - 1].classList.add('bg-[var(--fire)]');
    }

    const back=document.getElementById('carrousel-back');
    const forward=document.getElementById('carrousel-forward');

    back.addEventListener('click', () => {
        moveSlide(-1);
    });
    
    forward.addEventListener('click', () => {
        moveSlide(1);
    });

    dots.forEach( (dot, i) => {
        dot.addEventListener('click', () => {
            currentSlide(i+1);
        })
    });

    //■■■■■■■■■■■■■■■■■■■■ Function to replace img on error ■■■■■■■■■■■■■■■■■■■//

        function handleImageError(event) {
            let legendDialogImg = document.querySelectorAll(".legendDialogImg");
            let imgNotLoading = event.target;
            let i = parseInt(imgNotLoading.dataset.id);

            imgNotLoading.src = "public/img/pikasadface.png";
            legendDialogImg[i].innerHTML += `<br> (¡Este pokemon no posee esta ilustracion!)`;
        
            // Remove the error event listener using the named function
            imgNotLoading.removeEventListener('error', handleImageError);
        }
        
            pokemonImgs.forEach((img) => {
                img.addEventListener('error', handleImageError);
            });
});

