import {catchEmAll, url} from "./fetch.js";

//■■■■■■■■■■■■ Accordion function ■■■■■■■■■■■■■■//

    function toggleAccordion(id) {
        const element = document.getElementById(id);

        if (element.classList.contains("hidden")) {
            element.classList.remove("hidden");
        } else {
            element.classList.add("hidden");
        }
    }

//■■■■■■■■■■■■■■■■■■■■ Loading Screen Animation ■■■■■■■■■■■■■■■■■■■//

export const loadingScreen = (isLoading,container,extraButtons='') => {
        //Loading Animation
        if(isLoading){
            container.innerHTML=`
            ${extraButtons}                    
            <div class="absolute top-2/3 left-1/2 traslate-y-1/2 traslate-x-1/2">
                <div class="pokeball" title='This pokemon is resisting! When captured its data will be shown!'>
                    <div class="pokeball__button"></div>
                </div>
            </div>`;
        }
    }

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
        dialog.focus();
    }

    const closeDialog = (dialog) =>{
        dialog.close();
    }

//■■■■■■■■■■■■■■■■■■■■ Dialog style and open Dialog window on click over pokemon ■■■■■■■■■■■■■■■■■■■//

    let dialogLoading=true;

    //function to assign an event click for items in a iterable that open a dialog with a body assign through a callback function
    const dialogForItems = (containerOfList, dialogBody) => {
    
        containerOfList.addEventListener('click', (event) => {

            let dialogLoading=true;

            if (event.target.parentNode.classList.contains('pokemonCard') || event.target.classList.contains('pokemonCard')) {

                event.target.addEventListener('click', async (event) => {

                    //openDialog fx
                    openDialog(dialogWindow);
                    dialogOpened=true;
    
                    //assign id of card into callback fx for string template body for dialog to fetch all data                
                    dialogWindow.innerHTML= await dialogBody(url, (event.target.parentNode).dataset.id);
    
                    dialogLoading=false;
    
                    const dialogOpenedEvent = new Event('dialogOpenedEvent');
                    document.dispatchEvent(dialogOpenedEvent);
    
                    //■■■■ close button function for dialog body ■■■■//
                    const closeButton = document.getElementById('closeModalForItems');
                    closeButton.addEventListener('click', () => {
                        closeDialog(dialogWindow);
                        dialogOpened=false;
                    });

                    //■■■■ close function when 'Esc' is pressed for dialog ■■■■//
                    dialogWindow.addEventListener('keydown', (event) => {
                        if (event.key === 'Escape') {
                            closeDialog(dialogWindow);
                            dialogOpened=false;
                        }
                    });

                    //■■■■ Accordion functionality for dialog sections ■■■■/

                        //abilities section
                        const abilitiesTitle=document.getElementById('abilitiesTitle');
                        abilitiesTitle.addEventListener('click', () => {

                            if(abilitiesContent.classList.contains('hidden')){
                                abilitiesTitle.innerHTML=`<h2 id='abilitiesTitle' class="text-[2rem] m-2 mx-4 cursor-pointer ease-in"> &#x21E9 Abilities: </h2>`; 
                                toggleAccordion('abilitiesContent');
                            }else{
                                abilitiesTitle.innerHTML=`<h2 id='abilitiesTitle' class="text-[2rem] m-2 mx-4 cursor-pointer ease-in"> &#x21E8 Abilities: </h2>`; 
                                toggleAccordion('abilitiesContent');
                            }

                        });

                        //moves section
                        const movesTitleLevel=document.getElementById('movesTitleLevel');
                        movesTitleLevel.addEventListener('click', () => {
                            
                            if(movesContentLevel.classList.contains('hidden')){
                                movesTitleLevel.innerHTML=`<h2 id='movesTitlelevel' class="text-[2rem] m-2 mx-4 cursor-pointer"> &#x21E9 Moves (by Level): </h2>`; 
                                toggleAccordion('movesContentLevel');
                            }else{
                                movesTitleLevel.innerHTML=`<h2 id='movesTitleLevel' class="text-[2rem] m-2 mx-4 cursor-pointer"> &#x21E8 Moves (by Level): </h2>`; 
                                toggleAccordion('movesContentLevel');
                            }
                        });
                        //moves section
                        const movesTitleMachine=document.getElementById('movesTitleMachine');
                        movesTitleMachine.addEventListener('click', () => {

                            if(movesContentMachine.classList.contains('hidden')){
                                movesTitleMachine.innerHTML=`<h2 id='movesTitleMachine' class="text-[2rem] m-2 mx-4 cursor-pointer"> &#x21E9 Moves (by MT/MO): </h2>`; 
                                toggleAccordion('movesContentMachine');
                            }else{
                                movesTitleMachine.innerHTML=`<h2 id='movesTitleMachine' class="text-[2rem] m-2 mx-4 cursor-pointer"> &#x21E8 Moves (by MT/MO): </h2>`; 
                                toggleAccordion('movesContentMachine');
                            }

                        });

                        //moves section
                        const movesTitleEgg=document.getElementById('movesTitleEgg');
                        movesTitleEgg.addEventListener('click', () => {
                            
                            if(movesContentEgg.classList.contains('hidden')){
                                movesTitleEgg.innerHTML=`<h2 id='movesTitleEgg' class="text-[2rem] m-2 mx-4 cursor-pointer"> &#x21E9 Moves (by Egg): </h2>`; 
                                toggleAccordion('movesContentEgg');
                            }else{
                                movesTitleEgg.innerHTML=`<h2 id='movesTitleEgg' class="text-[2rem] m-2 mx-4 cursor-pointer"> &#x21E8 Moves (by Egg): </h2>`; 
                                toggleAccordion('movesContentEgg');
                            }

                        });

                        //moves section
                        const movesTitleTutor=document.getElementById('movesTitleTutor');
                        movesTitleTutor.addEventListener('click', () => {
                            
                            if(movesContentTutor.classList.contains('hidden')){
                                movesTitleTutor.innerHTML=`<h2 id='movesTitleTutor' class="text-[2rem] m-2 mx-4 cursor-pointer"> &#x21E9 Moves (by Tutor): </h2>`; 
                                toggleAccordion('movesContentTutor');
                            }else{
                                movesTitleTutor.innerHTML=`<h2 id='movesTitleTutor>' class="text-[2rem] m-2 mx-4 cursor-pointer"> &#x21E8 Moves (by Tutor): </h2>`; 
                                toggleAccordion('movesContentTutor');
                            }

                        });

                });
            }
            
        });
    }
    
    //function that returns string template for dialog body, parameters: base url and id for fetch into that url, given: "url/id" is endpoint for data
    async function dialogBody(url, idForFetch){

        let urlUnique = url+idForFetch;
        let item= await catchEmAll(urlUnique);

        loadingScreen(dialogLoading, dialogWindow, 
        `<button id='closeModalForItems' class="fixed top-0 left-0 z-10"> <img src="public/img/closeBtn.png" class="hover:animate-pulse transition-all hover:saturate-200 hover:scale-[1.1] max-w-[2.5rem] m-[-1rem] h-auto"></img> </button>
        `);

            //close button function for dialog body
            const closeButton = document.getElementById('closeModalForItems');
            closeButton.addEventListener('click', () => {
                closeDialog(dialogWindow);
                dialogOpened=false;
            });
              
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


            //■■■■■■■■■■■■ check and fetch for "abilities" ■■■■■■■■■■■■■■//

                async function abilitiesSection(abilitiesAll){

                    //check if ability is repeated
                    let abilities=[];
                    abilitiesAll.forEach((ability,i) => {
                        if (abilities.length===0) {
                            abilities.push(ability);
                        }else{
                            if (!(abilities[i-1].ability.name===ability.ability.name)) {
                                abilities.push(ability);
                            }
                        }
                    });

                    let abilitiesSection = '';

                    for (const ability of abilities){

                        //fetch all data of each ability
                        let abilityData=await catchEmAll(ability.ability.url);

                        //display name
                        abilitiesSection+= `
                            <div class="flex min-w-full flex-col justify-center items-center m-1 rounded border-black border-solid border-2" title="${abilityData['flavor_text_entries'].length>0 ? abilityData['flavor_text_entries'][0]['flavor_text'] : ''}">
                                <h3 class=" w-full text-gray text-lg text-center bg-[var(--second-bg)] px-4 py-1 font-bold border-black border-solid border-b-2">${abilityData.name}</h3>
                                ${abilityData['effect_entries'].length>='2' ? 
                                `<p class=" w-full text-gray bg-gray-200 px-4 py-1"><strong>Effect:</strong> ${abilityData['effect_entries'][1].effect}</p>` : 
                                abilityData['effect_entries'].length=='1' ? 
                                `<p class=" w-full text-gray bg-gray-200 px-4 py-1"><strong>Effect:</strong> ${abilityData['effect_entries'][0].effect}</p>` : 
                                `<p class=" w-full text-center text-gray bg-gray-200 px-4 py-1">No data available about effect!</p>`}
                            </div>
                        `; 

                    };
                    return abilitiesSection;
                }
                

            //■■■■■■■■■■■■ check and fetch for "moves" ■■■■■■■■■■■■■■//

                const movesSection = async (movesAll) => {

                    let movesSection = '';
                    let movesSectionMachine = '';
                    let movesSectionEgg = '';
                    let movesSectionTutor = '';

                    for (const move of movesAll){

                        //fetch all data of each move
                        let moveData=await catchEmAll(move.move.url);
                        
                        //check if move is learned by lvl up
                        if (move['version_group_details'][0]['move_learn_method'].name==="level-up") {

                            //display move if so
                            movesSection+= `
                                <div class="flex flex-col justify-center items-center py-3 m-1 bg-[var(--${moveData.type.name})] rounded border-black border-solid border-2" title='Power: ${moveData.power ? moveData.power : 'non-dmg'} | PP: ${moveData.pp} | Accuracy: ${moveData.accuracy ? moveData.accuracy : 'none'}'>
                                    <h3 class=" min-w-[11.5rem] text-gray text-lg text-center px-4 py-1 font-bold border-black border-solid border-b-2">${moveData.name}</h3>
                                    <p class=" min-w-[11.5rem] text-gray text-center px-4 py-1"><strong>Learned at level:</strong> </br><strong>${move['version_group_details'][0]['level_learned_at']}</strong> (${move['version_group_details'][0]['version_group'].name}) </p>
                                </div>
                            `; 
                        } else if (move['version_group_details'][0]['move_learn_method'].name==="machine") {
                            //display move in MO moves if not
                            movesSectionMachine+= `
                                <div class="flex flex-col justify-center items-center py-3 m-1 bg-[var(--${moveData.type.name})] rounded border-black border-solid border-2" title='Power: ${moveData.power ? moveData.power : 'non-dmg'} | PP: ${moveData.pp} | Accuracy: ${moveData.accuracy ? moveData.accuracy : 'none'}'>
                                    <h3 class=" min-w-[11.5rem] text-gray text-lg text-center px-4 py-1 font-bold border-black border-solid border-b-2">${moveData.name}</h3>
                                    <p class=" min-w-[11.5rem] text-gray text-center px-4 py-1"><strong>Learned at level:</strong> </br><strong>${move['version_group_details'][0]['level_learned_at']}</strong> (${move['version_group_details'][0]['version_group'].name}) </p>
                                </div>
                            `; 
                        }else if  (move['version_group_details'][0]['move_learn_method'].name==="egg"){
                            //display move in egg moves if not
                            movesSectionEgg+= `
                                <div class="flex flex-col justify-center items-center py-3 m-1 bg-[var(--${moveData.type.name})] rounded border-black border-solid border-2" title='Power: ${moveData.power ? moveData.power : 'non-dmg'} | PP: ${moveData.pp} | Accuracy: ${moveData.accuracy ? moveData.accuracy : 'none'}'>
                                    <h3 class=" min-w-[11.5rem] text-gray text-lg text-center px-4 py-1 font-bold border-black border-solid border-b-2">${moveData.name}</h3>
                                    <p class=" min-w-[11.5rem] text-gray text-center px-4 py-1"><strong>Learned at level:</strong> </br><strong>${move['version_group_details'][0]['level_learned_at']}</strong> (${move['version_group_details'][0]['version_group'].name}) </p>
                                </div>
                            `; 
                        }else if  (move['version_group_details'][0]['move_learn_method'].name==="tutor"){
                            //display move in tutor moves if not
                            movesSectionTutor+= `
                                <div class="flex flex-col justify-center items-center py-3 m-1 bg-[var(--${moveData.type.name})] rounded border-black border-solid border-2" title='Power: ${moveData.power ? moveData.power : 'non-dmg'} | PP: ${moveData.pp} | Accuracy: ${moveData.accuracy ? moveData.accuracy : 'none'}'>
                                    <h3 class=" min-w-[11.5rem] text-gray text-lg text-center px-4 py-1 font-bold border-black border-solid border-b-2">${moveData.name}</h3>
                                    <p class=" min-w-[11.5rem] text-gray text-center px-4 py-1"><strong>Learned at level:</strong> </br><strong>${move['version_group_details'][0]['level_learned_at']}</strong> (${move['version_group_details'][0]['version_group'].name}) </p>
                                </div>
                            `; 
                        }
                    };

                    let allMovesSection=[movesSection,movesSectionMachine,movesSectionEgg,movesSectionTutor];
                    return allMovesSection;
                }


        //■■■■■■ DIALOG BODY string template ■■■■■■// 
        let dialogBody= `    
                    <div class="grid grid-cols-1 justify-start items-center md:grid-cols-3 md:justify-between md:items-baseline md:gap-4 w-full h-full overflow-y-auto">

                        <!--■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ COL NAME, CARROUSEL, TYPE AND STATS ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■-->

                            <div class="flex flex-col justify-start">

                                <button id='closeModalForItems' class="fixed top-0 left-0 z-10"> <img src="public/img/closeBtn.png" class="hover:animate-pulse transition-all hover:saturate-200 hover:scale-[1.1] max-w-[2.5rem] m-[-1rem] h-auto"></img> </button>

                                <div class="flex flex-row justify-center items-center relative">
                                    <h2 class="text-[5rem] font-bold text-[var(--${types[0].type.name})] ${types.length>1 ? `hover:text-[var(--${types[1].type.name})]` : ''}">${name.split('-').length>1?(name.split('-'))[0] +' '+ (name.split('-'))[1]:name}</h2>
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

                                <div class="flex flex-col justify-evenly items-center py-3 overflow-none">

                                    <div class="flex flex-row justify-center items-center py-3">

                                        <div class="flex flex-col justify-center items-center rounded-l text-center max-w-[200px] gap-2">
                                            <p class=" min-w-[150px] font-bold text-[var(--main-bg)] bg-[var(--second-bg)] px-4 py-1 border-[var(--second-bg)] border-solid border-y-2">${item.stats[0].stat.name}</p>
                                            <p class=" min-w-[150px] font-bold text-[var(--main-bg)] bg-[var(--second-bg)] px-4 py-1 border-[var(--second-bg)] border-solid border-y-2">${item.stats[1].stat.name}</p>
                                            <p class=" min-w-[150px] font-bold text-[var(--main-bg)] bg-[var(--second-bg)] px-4 py-1 border-[var(--second-bg)] border-solid border-y-2">${item.stats[2].stat.name}</p>
                                            <p class=" min-w-[150px] font-bold text-[var(--main-bg)] bg-[var(--second-bg)] px-4 py-1 border-[var(--second-bg)] border-solid border-y-2">${item.stats[3].stat.name}</p>
                                            <p class=" min-w-[150px] font-bold text-[var(--main-bg)] bg-[var(--second-bg)] px-4 py-1 border-[var(--second-bg)] border-solid border-y-2">${item.stats[4].stat.name}</p>
                                            <p class=" min-w-[150px] font-bold text-[var(--main-bg)] bg-[var(--second-bg)] px-4 py-1 border-[var(--second-bg)] border-solid border-y-2">${item.stats[5].stat.name}</p>
                                        </div>

                                        <div class="flex flex-col justify-center items-center rounded-r overflow-hidden max-w-[200px] gap-2">

                                            <div class="min-w-[150px] w-full rounded-r border-solid border-y-2 border-r-2 border-green-900 bg-blue-100" title='Effort: ${item.stats[0].effort}'>
                                                <span class="b inline-block bg-gradient-to-r from-green-700 via-34% via-green-500 via-33% to-green-400 via-33% w-[${(item.stats[0].base_stat)*1.5}px] text-gray-200 h-full px-4 py-1 font-bold" id="${item.stats[0].stat.name}"> 
                                                    ${item.stats[0].base_stat}
                                                </span>
                                            </div>
                                            
                                            <div class="min-w-[150px] w-full rounded-r border-solid border-y-2 border-r-2 border-green-900 bg-blue-100" title='Effort: ${item.stats[1].effort}'>
                                                <span class=" inline-block bg-gradient-to-r from-green-700 via-34% via-green-500 via-33% to-green-400 via-33% w-[${(item.stats[1].base_stat)*1.5}px] text-gray-200 h-full px-4 py-1 font-bold" id="${item.stats[1].stat.name}"> 
                                                    ${item.stats[1].base_stat}
                                                </span>
                                            </div>

                                                                        
                                            <div class="min-w-[150px] w-full rounded-r border-solid border-y-2 border-r-2 border-green-900 bg-blue-100" title='Effort: ${item.stats[2].effort}'>
                                                <span class=" inline-block bg-gradient-to-r from-green-700 via-34% via-green-500 via-33% to-green-400 via-33% w-[${(item.stats[2].base_stat)*1.5}px] text-gray-200 h-full px-4 py-1 font-bold" id="${item.stats[2].stat.name}"> 
                                                    ${item.stats[2].base_stat}
                                                </span>
                                            </div>
                                        
                                                                        
                                            <div class="min-w-[150px] w-full rounded-r border-solid border-y-2 border-r-2 border-green-900 bg-blue-100" title='Effort: ${item.stats[3].effort}'>
                                                <span class=" inline-block bg-gradient-to-r from-green-700 via-34% via-green-500 via-33% to-green-400 via-33% w-[${(item.stats[3].base_stat)*1.5}px] text-gray-200 h-full px-4 py-1 font-bold" id="${item.stats[3].stat.name}"> 
                                                    ${item.stats[3].base_stat}
                                                </span>
                                            </div>
                                        
                                                                        
                                            <div class="min-w-[150px] w-full rounded-r border-solid border-y-2 border-r-2 border-green-900 bg-blue-100" title='Effort: ${item.stats[4].effort}'>
                                                <span class=" inline-block bg-gradient-to-r from-green-700 via-34% via-green-500 via-33% to-green-400 via-33% w-[${(item.stats[4].base_stat)*1.5}px] text-gray-200 h-full px-4 py-1 font-bold" id="${item.stats[4].stat.name}"> 
                                                    ${item.stats[4].base_stat}
                                                </span>
                                            </div>
                                        
                                                                        
                                            <div class="min-w-[150px] w-full rounded-r border-solid border-y-2 border-r-2 border-green-900 bg-blue-100" title='Effort: ${item.stats[5].effort}'>
                                                <span class=" inline-block bg-gradient-to-r from-green-700 via-34% via-green-500 via-33% to-green-400 via-33% w-[${(item.stats[5].base_stat)*1.5}px] text-gray-200 h-full px-4 py-1 font-bold" id="${item.stats[5].stat.name}"> 
                                                    ${item.stats[5].base_stat}
                                                </span>
                                            </div>
                                    
                                        </div>

                                    </div>
                                </div>

                            </div>

                        <!--■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ COL ABILITIES ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■-->

                            <div class="flex flex-col justify-evenly items-center p-3">

                                <div class="flex flex-col justify-center items-baseline p-3 w-full">

                                    <h2 id='abilitiesTitle' class="text-[2rem] m-2 mx-4 cursor-pointer ease-in"> &#x21E8 Abilities: </h2>
                                    <div id='abilitiesContent' class="flex flex-col justify-center items-center ease-in hidden">
                                        ${await abilitiesSection(item.abilities)}
                                    </div>

                                </div>
                            
                            </div>

                        <!--■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ COL MOVES ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■-->
                           
                            <div class="flex flex-col justify-evenly items-center p-3 w-full">

                                <div class="flex flex-col justify-center items-baseline p-3 w-full">

                                    <h2 id='movesTitleLevel' class="text-[2rem] m-2 mx-4 cursor-pointer"> &#x21E8 Moves (by Level): </h2>
                                    <div id='movesContentLevel' class="flex flex-col justify-center items-center w-full ease-in hidden">
                                        <div class="grid grid-cols-2 md:grid-cols-3 md: gap-1 justify-center items-center w-full ease-in ">
                                            ${(await movesSection(item.moves))[0]}
                                        </div>
                                    </div>

                                    ${(await movesSection(item.moves))[1].length>0 ? 
                                    `<h2 id='movesTitleMachine' class="text-[2rem] m-2 mx-4 cursor-pointer"> &#x21E8 Moves (by MT/MO): </h2>
                                    <div id='movesContentMachine' class="flex flex-col justify-center items-center w-full ease-in hidden">
                                        <div class="grid grid-cols-2 md:grid-cols-3 md: gap-1 justify-center items-center w-full ease-in ">
                                            ${(await movesSection(item.moves))[1]}
                                        </div>
                                    </div>` : `<div id='movesTitleMachine' class='hidden'></div>`}

                                    ${(await movesSection(item.moves))[2].length>0 ? 
                                    `<h2 id='movesTitleEgg' class="text-[2rem] m-2 mx-4 cursor-pointer"> &#x21E8 Moves (by Egg): </h2>
                                    <div id='movesContentEgg' class="flex flex-col justify-center items-center w-full ease-in hidden">
                                        <div class="grid grid-cols-2 md:grid-cols-3 md: gap-1 justify-center items-center w-full ease-in ">
                                            ${(await movesSection(item.moves))[2]}
                                        </div>
                                    </div>` :`<div id='movesTitleEgg' class='hidden'></div>`}

                                    ${(await movesSection(item.moves))[3].length>0 ? 
                                    `<h2 id='movesTitleTutor' class="text-[2rem] m-2 mx-4 cursor-pointer"> &#x21E8 Moves (by Tutor): </h2>
                                    <div id='movesContentTutor' class="flex flex-col justify-center items-center w-full ease-in hidden">
                                        <div class="grid grid-cols-2 md:grid-cols-3 md: gap-1 justify-center items-center w-full ease-in ">
                                            ${(await movesSection(item.moves))[3]}
                                        </div>
                                    </div>` : `<div id='movesTitleTutor' class='hidden'></div>`}

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
        const parentForListofPokemon=document.getElementById('display-list');
        dialogForItems(parentForListofPokemon, dialogBody);
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
            legendDialogImg[i].innerHTML += `<br> (Not available for this Pokemon!)`;
        
            // Remove the error event listener using the named function
            imgNotLoading.removeEventListener('error', handleImageError);
        }
        
        pokemonImgs.forEach((img) => {
            img.addEventListener('error', handleImageError);
        });
});

