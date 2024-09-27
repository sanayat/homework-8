// RANDOM COLOR GENERATOR

const buttonsColor = document.querySelectorAll('.btn-color')
const javaScript = document.querySelector('#js-color')

const generateRandomColor = () => {
    const hexCodes = '0123456789ABCDEF'
    let color = ''
    for (let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }
    return '#' + color
}

const setRandomColors = () => {
    buttonsColor.forEach((buttonColor) => {
        buttonColor.innerHTML = generateRandomColor()
        buttonColor.onclick = (event) => {
            javaScript.style.color = event.target.innerHTML
        }
    })
}

window.onload = () => setRandomColors()
window.onkeydown = (event) => {
    if (event.code.toLowerCase() === 'space') {
        event.preventDefault()
        setRandomColors()
    }
}

// SLIDER BLOCK

const slides = document.querySelectorAll('.slide')
const next = document.querySelector('#next')
const prev = document.querySelector('#prev')
let index = 0

const hideSlide = () => {
    slides.forEach((slide) => {
        slide.style.opacity = 0
        slide.classList.remove('active_slide')
    })
}
const showSlide = (i = 0) => {
    slides[i].style.opacity = 1
    slides[i].classList.add('active_slide')
}

hideSlide()
showSlide(index)


const autoSlider = (i = 0) => {
    setInterval(() => {
        i++
        if (i > slides.length - 1) {
            i = 0
        }
        hideSlide()
        showSlide(i)
    }, 10000)
}

next.onclick = () => {
    index < slides.length - 1 ? index++ : index = 0
    hideSlide()
    showSlide(index)
}

prev.onclick = () => {
    index > 0 ? index-- : index = slides.length - 1
    hideSlide()
    showSlide(index)
}

autoSlider(index)

document.addEventListener('DOMContentLoaded',()=>{
    const charactersBlock=document.querySelector('.characters_block');
    const request=new XMLHttpRequest()
    request.open('GET', '../data/characters.json');
    request.setRequestHeader('Content-type','application.json');
    request.send();

    request.onload=()=>{
        if (request.status>=200 && request.status<400) {
            console.log('Response text:', request.responseText);
            const characters=JSON.parse(request.responseText);

            characters.forEach((character)=>{
                const characterContainer=document.createElement('div');
                characterContainer.classList.add('character_container');

                characterContainer.innerHTML =`
                <div class="character_photo">
                    <img src="${character.photo} 
                    alt="${character.name}"/>
                
                </div>
                <h2>${character.name}</h2>
                <p id="age_part" Age:${character.age}</p>
                <p id="bio_part" Bio:${character.bio}</p>
    
                
                `;
                const h2Element=characterContainer.querySelector('h2');
                const pElements=characterContainer.querySelectorAll('p');

                if (h2Element){
                    h2Element.style.color='white';
                }
                pElements.forEach(p=>{
                    p.style.color='white';
                });
                charactersBlock.append(characterContainer);
            }) ;
        } else {
            console.error('Request failed', request.status);
        }
    }
})
