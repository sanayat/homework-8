//PHONE BLOCK

const phoneInput = document.querySelector ('#phone_input')
const phoneButton = document.querySelector ('#phone_button')
const phoneSpan = document.querySelector ('#phone_result')

const regExp = /\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}/ 

phoneButton.onclick = () => {
    if (regExp.test(phoneInput.value)){
        phoneSpan.innerHTML = "OK"
        phoneSpan.style.color = "green"
    }else {
        phoneSpan.innerHTML = "NOT OK"
        phoneSpan.style.color = "red"
    }

}

//TAB SLIDER
const tabContentBlocks = document.querySelectorAll('.tab_content_block');
const tabContentItems = document.querySelectorAll('.tab_content_item');
const tabContentItemsParent = document.querySelector('.tab_content_items');

const hideTabContent = () => {
    tabContentBlocks.forEach((item) => {
        item.style.display = 'none';
    });
    tabContentItems.forEach((item) => {
        item.classList.remove('tab_content_item_active');
    });
};
let currentIndex = 0;
const showTabContent = (id = 0) => {
    tabContentBlocks[id].style.display = 'block';
    tabContentItems[id].classList.add('tab_content_item_active');
};
const autoSwitchTabs = () => {
    hideTabContent();
    currentIndex = (currentIndex + 1) % tabContentBlocks.length;
    showTabContent(currentIndex);
};

hideTabContent();
showTabContent();

tabContentItemsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) { // Fixed typo here
        tabContentItems.forEach((item, index) => {
            if (event.target === item) {
                hideTabContent();
                showTabContent(index);
                currentIndex = index;
            }
        });
    }
};
const interval = 3000;
setInterval(autoSwitchTabs, interval);


//CONVERTER
const somInput = document.querySelector('#som');
const usdInput = document.querySelector('#usd');
const eurInput = document.querySelector('#eur');

const converter = (element, targetElement) => {
    element.oninput = () => {
        const request = new XMLHttpRequest();
        request.open('GET', '../data/converter.json');
        request.setRequestHeader('Content-type', 'application/json');
        request.send();

        request.onload = () => {
            if (request.status === 200) {
                const data = JSON.parse(request.response);

                if (element.id === 'som') {
                    usdInput.value = (element.value / data.usd).toFixed(2)
                    eurInput.value = (element.value / data.eur).toFixed(2)
                } else if (element.id === 'usd') {
                    somInput.value = (element.value * data.som).toFixed(2)
                    eurInput.value = (element.value * (data.eur)).toFixed(2)
                } else if (element.id === 'eur') {
                    somInput.value = (element.value * data.som).toFixed(2)
                    usdInput.value = (element.value * (data.usd)).toFixed(2)
                }
            }
        }
    }
}
converter(usdInput, somInput);
converter(somInput, usdInput);
converter(eurInput, somInput);

//CARD SWITCHER
const card = document.querySelector('.card');
const btnPrev = document.querySelector('#btn-prev');
const btnNext = document.querySelector('#btn-next');

let cardId = 1;
const maxCardId = 200;

const updateCard = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            card.innerHTML = `
                <p>${data.title}</p>
                <p style="color: ${data.completed ? 'green' : 'red'};">${data.completed}</p>
                <span>${data.id}</span>
            `;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            card.innerHTML = '<p>Ошибка загрузки данных.</p>';
        });
};

const getData = async ()  =>  {
    const response = await fetch(url)
    const data = await response.json();
    console.log(data)
}

const changeCardId = (direction) => {
    if (direction === 'next') {
        cardId = (cardId % maxCardId) + 1;
    } else if (direction === 'prev') {
        cardId = (cardId - 2 + maxCardId) % maxCardId + 1;
    }
    updateCard(cardId);
};

btnNext.onclick = () => changeCardId('next');
btnPrev.onclick = () => changeCardId('prev');
updateCard(cardId);

getData();

//WEATHER

const citySearchInput = document.querySelector('.cityName')
const searchButton = document.querySelector('#search')
const cityName = document.querySelector('.city')
const cityTemp = document.querySelector('.temp')

const API_KEY = 'e417df62e04d3b1b111abeab19cea714'
const API_URL = 'http://api.openweathermap.org/data/2.5/weather'

const icons = {
    cloudy:'<i class="fa-solid fa-cloud"></i>',
    sunny:'<i class="fa-solid fa-sun"></i>',
    windy:'<i class="fa-solid fa-wind"></i>',
    thunder:'<i class="fa-solid fa-bolt"></i>'
}

citySearchInput.oninput = (event) =>{

    fetch(`${API_URL}?q=${event.target.value}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data =>{
            const c = data.main?.temp - 273
            if(c >= 20){
                cityName.innerHTML = `${data.name} `
                cityTemp.innerHTML = data.main?.temp ? (c).toFixed(0) + '&deg;' + 'C': ',loh'
                cityName.innerHTML += icons.sunny
            }else if(c <= 20 && c >= 15){
                cityName.innerHTML = `${data.name} `
                cityTemp.innerHTML = data.main?.temp ? (c).toFixed(0) + '&deg;' + 'C': ',loh'
                cityName.innerHTML = icons.cloudy
            }else if(c <= 15 && c >= 10){
                cityName.innerHTML = `${data.name} `
                cityTemp.innerHTML = data.main?.temp ? (c).toFixed(0) + '&deg;' + 'C': ',loh'
                cityName.innerHTML = icons.windy
            }else if(c < 10){
                cityName.innerHTML = `${data.name} `
                cityTemp.innerHTML = data.main?.temp ? (c).toFixed(0) + '&deg;' + 'C': ',loh'
                cityName.innerHTML = icons.thunder
            }else{
                cityName.innerHTML = `Город ${event.target.value} не найден`
            }
            if(event.target.value === ''){
                cityName.innerHTML = ''
                cityTemp.innerHTML = ''
            }
        })
}






























