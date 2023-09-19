//■■■■■■■■■■■■■■■■■■■■■■■■■■■ imported fx/var ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■//

import {catchEmAll, displayCards, url, allFetchLoaded} from "./fetch.js";
import { loadingScreen } from "./effects.js";

//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■Target Element of Observer■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■//

function handleIntersection(entries) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // The target element is now visible in the viewport
            // Call your function here
            doSomethingOnElementVisibility();
        }
    });
}
//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ Observer Instantiation ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■//
const options = {
    root: null, // Use the viewport as the root
    rootMargin: "0px", // No margin
    threshold: 0.5, // Trigger when 50% of the element is visible
};

export const observer = new IntersectionObserver(handleIntersection, options);

//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ Function on display of Element ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■//

function doSomethingOnElementVisibility() {
    // Your function to be executed when the target element becomes visible
    if(entries.lenght<end && entries.lenght===18){
        displayCards(url, 19, 37);
        //Loading Animation
        const containerList=document.getElementById('display-list');
        loadingScreen(isLoading,containerList);
    }else if(entries.lenght<end && entries.lenght===36){
        displayCards(url, 38, 56);
    }else if(entries.lenght<end && entries.lenght===54){
        displayCards(url, 57, 75);
    }else if(entries.lenght<end && entries.lenght===72){
        displayCards(url, 76, 94);
    }
}
