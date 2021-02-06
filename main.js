const baseApi = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';

async function getCountyName(food) {
  const responce = await fetch(`${baseApi}${food}`);
  const data = await responce.json();
  console.log(data);
}

// added button handler

document.getElementById('search-button').addEventListener('click', function () {
  const foodName = document.getElementById('input').value;
  getCountyName(foodName);
});
