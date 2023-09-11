// Toggle visibility for type buttons in nav-bar

const btnToggleTypes=document.getElementById('btn-toggle-types');

btnToggleTypes.addEventListener('click', () => {

    const allTypeLists=document.querySelectorAll('.types');
    let typeListVisible= false;
    
    if (!typeListVisible) {
        allTypeLists.forEach( (typeList) => {
            typeList.classList.remove('hidden');
            typeList.classList.add('flex');
        });
        typeListVisible= true;
        btnToggleTypes.innerText='Hide types';
    } else {
        allTypeLists.forEach( (typeList) => {
            typeList.classList.remove('flex');
            typeList.classList.add('hidden');
        });
        typeListVisible=false;
        btnToggleTypes.innerText='Show types';
    }
})
