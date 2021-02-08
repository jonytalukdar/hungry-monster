// variable
const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// event listeners
searchBtn.addEventListener('click', getMealList);
recipeCloseBtn.addEventListener('click', () => {
  mealDetailsContent.parentElement.classList.remove('showRecipe');
});

// get meal list that matches with the ingredients
function getMealList() {
  const searchInput = document.getElementById('search-input').value[0];
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`)
    .then((response) => response.json())
    .then((data) => displayMealItem(data))
    .catch((error) =>
      window.alert(searchInput + ' : Meals Name Should Not Be A Number')
    );
}

const displayMealItem = (foods) => {
  const input = document.getElementById('search-input').value;
  let html = '';

  foods.meals.forEach((meal) => {
    if (input.length === 1) {
      html += `
        <div class = "meal-item" data-id = "${meal.idMeal}">
            <div class = "meal-img">
                <img src = "${meal.strMealThumb}" alt = "food">
            </div>
            <div class = "meal-name">
                <h3>${meal.strMeal}</h3>
            </div>
        </div>
    `;
      mealList.classList.remove('notFound');
    } else {
      html = "Sorry, we didn't find any meal! Please insert only one letter";
      mealList.classList.add('notFound');
    }
    mealList.innerHTML = html;
  });
};

const showMealDetails = document.getElementById('meal');
showMealDetails.addEventListener('click', function (event) {
  let mealItem = event.target.parentElement.parentElement;
  fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
  )
    .then((response) => response.json())
    .then((data) => mealRecipeModal(data.meals));
});

// create a modal
function mealRecipeModal(meal) {
  meal = meal[0];
  let html = `
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <h3 class="ingredients">Ingredients</h3>
        <ul class="ingredient">
        <li>${meal.strIngredient1}</li> 
        <li>${meal.strIngredient2}</li> 
        <li>${meal.strIngredient3}</li> 
        <li>${meal.strIngredient4}</li> 
        <li>${meal.strIngredient5}</li> 
        <li>${meal.strIngredient6}</li> 
        </ul>      
    `;
  mealDetailsContent.innerHTML = html;
  mealDetailsContent.parentElement.classList.add('showRecipe');
}
