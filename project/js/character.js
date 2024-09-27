async function fetchCharacters() {
    try {
        const response = await fetch('../data/character.json');
        const characters = await response.json();
        const charactersDiv = document.getElementById('characters');
        const limitedCharacters = characters.slice(0, 4);

        limitedCharacters.forEach(character => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${character.photo}" alt="${character.name}">
                <h3>${character.name}</h3>
                <p>Возраст: ${character.age}</p>
                <p>В группе: ${character.profession}</p>
            `;
            charactersDiv.appendChild(card);
        });
    } catch (error) {
        console.error('Ошибка:', error);
    }
}
fetchCharacters();
