import {btn} from "./animation.js";
import {changeName} from "./changeName.js";

btn();


document.querySelector('.input').addEventListener('keypress', e => {
    if (event.keyCode === 13){
        e.preventDefault();
        controlSearch();
    }
    

});

document.querySelector('.close-btn').addEventListener('click', e => {
    e.preventDefault();
    controlSearch();

});

//Control mode 

const controlSearch = async () =>{
    const search = document.querySelector('.input').value;

        if(search){
        clearInput();
        clearResults();

        await getTheCovid('3Po6TV7wTht4vIEid', search);
        }

      
    }

async function getTheCovid(id, search){
    try{
    const result = await fetch(`https://api.apify.com/v2/key-value-stores/${id}/records/LATEST?disableRedirect=true`);
        const data = await result.json();
        //console.log(data);
        let date = data.lastUpdatedAtApify;
        const parts = date.replace("T", ", o godzinie: ");
        const editingDate = parts.replace('.000Z', " ");

        for(let i = 0; i < data.infectedByRegion.length; i++){
            let name = changeName(i);
            if(name){
                if(name.indexOf(search) !== -1){
                    lastestUpdate(editingDate);
                    addListItem(data.infectedByRegion[i], i);
                }
            }
            
        }

    }catch(err){
        console.log(err);
    } 
}


function doesNotExist(){
    let html = `<div class = "data">
    Podane Województwo nie jestnieje! Sprubuj jeszcze raz
</div>`;

    document.querySelector('.box-covid-inf').insertAdjacentHTML('afterbegin', html);
}

function lastestUpdate(obj){
    let html = `<div class = "data">
    Ostatnia aktualizacja: %change%
</div>`;

    let newHTML = html.replace('%change%', obj)
    document.querySelector('.box-covid-inf').insertAdjacentHTML('afterbegin', newHTML);
}

let now = new Date();

function addListItem(obj, i){
    let html, newHtml, element, region;
    region = changeName(i);
    element = '.box-covid-inf';

    html = `<div class ="box">
        <div class = "box-name">%name%</div>
        <div class = "box-inf">
            <div class = "infectedCount">Chorzy: %infected%</div>
            <div class = "deceasedCount">Zmarli: %deceased%</div>
        </div>
    </div>`;

    newHtml = html.replace('%name%', region[0]);
    newHtml = newHtml.replace('%infected%', obj.infectedCount);
    newHtml = newHtml.replace('%deceased%',obj.deceasedCount);

    document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

}

//Search box

const clearInput = () => {
    document.querySelector('.input').value = '';
};

const clearResults = () => {
    document.querySelector('.box-covid-inf').innerHTML = '';
}