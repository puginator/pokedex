const pokeContainer = document.getElementById("poke-container");
const random_btn = document.getElementById("random-btn");
const sortBtn = document.getElementById("sort-btn");
const reverseSortBtn = document.getElementById("reverse-sort-btn")

const active = 'active';
const filterButtons = document.querySelectorAll('li');
const dataFilter = '[data-filter]';
const pokemonData = '[data-item]';
const pokemonName = '[data-name]';

const pokemonArray = []

let pokemonsNumber;
const colors = {
  all: '#FFBF86',
  fire: '#FDDFDF',
  grass: '#DEFDE0',
  electric: '#FFEF78',
  dark: '#986D8E',
  water: '#93B5C6',
  ground: '#C68B59',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#98d7a5',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#f5f5f5',
  fighting: '#e6e0d4',
  normal: '#FCDEC0',
  ice: '#DEF3FD',
  ghost: '#BFA2DB',
  steel: '#9D9D9D',
  favorite: '#ff6767'
};

const typeCount = {
  all: 0,
  fire: 0,
  grass: 0,
  electric: 0,
  dark: 0,
  water: 0,
  ground: 0,
  rock: 0,
  fairy: 0,
  poison: 0,
  bug: 0,
  dragon: 0,
  psychic: 0,
  flying: 0,
  fighting: 0,
  normal: 0,
  ice: 0,
  ghost: 0,
  steel: 0,
  favorite: 0
};


// const main_types = Object.keys(colors);
// // console.log(main_types)

const fetchPokemons = async () => {
  await getPokemon(pokemonsNumber)
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  createPokemonCard(pokemon);
};


for (const link of filterButtons) {
  const background = colors[link.dataset.filter]
  link.style.backgroundColor = background;

}



function createPokemonCard(pokemon) {


  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("pokemon");

  const pokeTypes = pokemon.types.map(el => el.type.name);
  const type = pokeTypes.find(type => pokeTypes.indexOf(type) > -1)
  const ability = pokemon.abilities[0].ability.name
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const color = colors[type];

  pokemonEl.style.backgroundColor = color;

  const pokeInnerHTML = `
  <div id="heart-btn"  class="heart-container"> <i onclick="myFunction(this)" class="far fa-heart" ></i></div>
  <div class="img-container">
    <img src="https://img.pokemondb.net/sprites/ruby-sapphire/normal/${pokemon.name}.png" />
  </div>
  <div class="info">
    <span class="number">#${pokemon.id.toString().padStart(3, '0')}</span>
    <h3 class="name">${name}</h3>
    <small class="type">Type: <span>${type}</span></small>
    <br>
    <small class="type">Ability: <span>${ability}</span></small>
  </div>
  `;

  pokemonEl.classList.add(type)
  pokemonEl.setAttribute('data-name', name)
  pokemonEl.setAttribute('data-item', type)
  pokemonEl.setAttribute('data-favorite', null)
  pokemonEl.innerHTML = pokeInnerHTML;
  pokeContainer.prepend(pokemonEl);
  typeCount[`${type}`] += 1;
  typeCount['all'] += 1;


  pokemonArray.push(name)
}





function randomPokemon(event) {
  pokemonsNumber = Math.floor(Math.random() * 386) + 1
  console.log(pokemonsNumber)
  fetchPokemons();
}

random_btn.addEventListener('click', randomPokemon);

//Filtering Features


const setActive = (elm) => {
  if (document.querySelector(`.${active}`) !== null) {
    document.querySelector(`.${active}`).classList.remove(active)
  }
  elm.classList.add(active)

}



const filterLink = document.querySelectorAll(dataFilter);
// const pokemonItems = document.querySelectorAll(pokemonData);




for (const link of filterLink) {
  const filter = link.dataset.filter;

  link.addEventListener('click', function () {
    const number = typeCount[link.dataset.filter]
    console.log(number)
    link.innerHTML = `
    ${filter}
    <br>
    ${number}`
    setActive(link);
    const pokemonType = document.querySelectorAll('.pokemon')
    pokemonType.forEach((card) => {
      if (filter === 'all') {
        card.style.display = 'block';
      } else if (card.dataset.item === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    })
  })
}




//Alphabetical sorting

sortBtn.addEventListener('click', resortByName)

function resortByName() {
  const pokemonList = [...document.querySelectorAll('.pokemon')]


  let alphabeticallyOrderedDivs = pokemonList.sort(function (a, b) {
    return a.dataset.name === b.dataset.name ? 0 : (a.dataset.name > b.dataset.name ? 1 : -1);
  });
  console.log(alphabeticallyOrderedDivs)
  let container = document.querySelector('.poke-container');

  container.childNodes.forEach(pokemon => pokemon.remove())
  alphabeticallyOrderedDivs.forEach(pokemon => container.appendChild(pokemon))

}

//Reverse Alphabetical Sorting
reverseSortBtn.addEventListener('click', reverseSortByName)

function reverseSortByName() {
  const pokemonList = [...document.querySelectorAll('.pokemon')]

  let alphabeticallyOrderedDivs = pokemonList.sort(function (a, b) {
    return a.dataset.name === b.dataset.name ? 0 : (a.dataset.name < b.dataset.name ? 1 : -1);
  });
  console.log(alphabeticallyOrderedDivs)
  let container = document.querySelector('.poke-container');

  container.childNodes.forEach(pokemon => pokemon.remove())
  alphabeticallyOrderedDivs.forEach(pokemon => container.appendChild(pokemon))
}

function myFunction(x) {
  x.classList.toggle("fas")
  let parent = x.parentElement.parentElement

  if (parent.dataset.favorite === "null") {
    parent.dataset.favorite = "favorite"
    typeCount.favorite++

  } else if (parent.dataset.favorite === "favorite") {
    parent.dataset.favorite = "null"
    typeCount.favorite--
  }
}

const favoriteBtn = document.querySelector('.favs')

favoriteBtn.addEventListener('click', findFavorites)

function findFavorites() {
  const pokemonType = document.querySelectorAll('.pokemon')
  const filter = 'favorite'

  pokemonType.forEach((card) => {
    if (card.dataset.favorite === filter) {
      card.style.display = 'block';

    } else {
      card.style.display = 'none';
    }
  })
}

for (let i = 0; i < 32; i++) {
  pokemonsNumber = Math.floor(Math.random() * 386) + 1
  fetchPokemons()
}