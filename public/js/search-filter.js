//imported fx/var from fetch.js

import {displayCards, url} from "./fetch.js";

//filter function for nav-bar types buttons
const allBtnType=document.querySelectorAll('.type');

allBtnType.forEach( (btn) => {
    btn.addEventListener('click', () => {
        return 0;
    });
});

//filter function for generation filter

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