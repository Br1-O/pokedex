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
            console.log(event.target);
            type.addEventListener('click', () =>{
                type.classList.add('non-active');
            });
        }else{
            type.classList.remove('non-active');
        }
    })
});