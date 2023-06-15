/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    // loop over each item in the data
    for (const game of games) {
        // create a new div element, which will become the game card
        const gameCard = document.createElement("div");
        
        // add the class game-card to the list
        gameCard.classList.add("game-card");

        // set the inner HTML using a template literal to display some info 
        // about each game
        gameCard.innerHTML = `
            <img class="game-img" src="${game.img}" alt="${game.name}" />
            <h2 class="game-name">${game.name}</h2>
            <p class="game-description">${game.description}</p>
            <p class="game-stats">Pledged: $${game.pledged.toLocaleString()} | Goal: $${game.goal.toLocaleString()} | Backers: ${game.backers.toLocaleString()}</p>
        `;
        
        // append the game card to the games-container
        gamesContainer.appendChild(gameCard);
    }
}

// call the function with the correct variable to add all games to the page
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((accumulator, game) => accumulator + game.backers, 0);

// set the inner HTML of contributionsCard using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString()}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((accumulator, game) => accumulator + game.pledged, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `${GAMES_JSON.length}`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}


// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter((game) => game.pledged >= game.goal);

    // use the function we previously created to add funded games to the DOM
    addGamesToPage(fundedGames);
}



// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 * 
*/
const unfundedCount = GAMES_JSON.reduce((count, game) => {
    if (game.pledged < game.goal) {
      return count + 1;
    }
    return count;
  }, 0);
  
  console.log(unfundedCount);
  
  const raisedAmount = GAMES_JSON.reduce((total, game) => total + game.pledged, 0);
  const fundedGamesCount = GAMES_JSON.filter(game => game.pledged >= game.goal).length;
  const unfundedGamesCount = GAMES_JSON.length - fundedGamesCount;
  
  const summaryString = `We have raised $${raisedAmount.toLocaleString()} across ${GAMES_JSON.length} games. ${
    unfundedGamesCount > 0
      ? `There ${unfundedGamesCount === 1 ? 'is' : 'are'} currently ${unfundedGamesCount} unfunded game${
          unfundedGamesCount === 1 ? '' : 's'
        }.`
      : 'All games have been funded!'
  }`;
  
  console.log(summaryString);
  
  // grab the description container
  const descriptionContainer = document.getElementById("description-container");
  
  // create a new DOM element containing the template string
  const summaryParagraph = document.createElement('p');
  summaryParagraph.textContent = summaryString;
  
  // append the paragraph to the description container
  descriptionContainer.appendChild(summaryParagraph);

// use filter or reduce to count the number of unfunded games


// create a string that explains the number of unfunded games using the ternary operator


// create a new DOM element containing the template string and append it to the description container

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */
const sortedGames = GAMES_JSON.sort((item1, item2) => {
    return item2.pledged - item1.pledged;
  });
  
  const [firstGame, secondGame, ...remainingGames] = sortedGames;
  
  const firstGameContainer = document.getElementById("first-game");
  const secondGameContainer = document.getElementById("second-game");
  
  const firstGameNameElement = document.createElement("h3");
  firstGameNameElement.textContent = firstGame.name;
  firstGameContainer.appendChild(firstGameNameElement);
  
  const secondGameNameElement = document.createElement("h3");
  secondGameNameElement.textContent = secondGame.name;
  secondGameContainer.appendChild(secondGameNameElement);

// use destructuring and the spread operator to grab the first and second games

// create a new element to hold the name of the top pledge game, then append it to the correct element

// do the same for the runner up item
