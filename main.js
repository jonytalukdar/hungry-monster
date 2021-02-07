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
  let searchInput = document.getElementById('search-input').value;
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`)
    .then((response) => response.json())
    .then((data) => {
      let html = '';
      if (data.meals) {
        data.meals.forEach((meal) => {
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
        });
        mealList.classList.remove('notFound');
      } else {
        html = "Sorry, we didn't find any meal!";
        mealList.classList.add('notFound');
      }

      mealList.innerHTML = html;
    });
}

const showMealDetails = document.getElementById('meal');
showMealDetails.addEventListener('click', function (e) {
  let mealItem = e.target.parentElement.parentElement;
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
