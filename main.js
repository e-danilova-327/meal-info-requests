const mealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';
const apiKey = '1';
const mealDiv = document.getElementById('meal');
const mealBtn = document.getElementById('mealBtn');

//meal name - strMeal

// meal image - strMealThumb
// - strCategory
// - strArea
// - strTags
// - strIngredient1 + strMeasure1, strIngredient2 + strMeasure2, strIngredient3 + strMeasure3

// - strInstructions

// making a request to the API by clicking the button
mealBtn.addEventListener('click', () => {
    fetch(mealUrl)
        .then((response) => response.json())
        .then((response) => {
            generateMeal(response.meals[0]);
        })
        .catch((error) => console.warn(error));
});

const generateMeal = (meal) => {
    const ingredients = [];

    // getting all the ingredients from the object, max 20
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(
                `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
            );
        } else {
            //stop if there are no more ingredients - less than 20
            break;
        }
    }

    const createHTML = `
        <div class="row">
            <div class="col-5">
                <img src="${
                    meal.strMealThumb
                }" alt="Meal image" style="height: 500px; width:500px" class="d-block ms-0 mb-4">
                ${
                    meal.strCategory
                        ? `<p><strong>Category:</strong> ${meal.strCategory}</p>`
                        : ''
                }
                ${
                    meal.strArea
                        ? `<p><strong>Category:</strong> ${meal.strArea}</p>`
                        : ''
                }
                <h5>Ingredients:</h5>
                <ul>
                    ${ingredients
                        .map((ingredient) => `<li>${ingredient}</li>`)
                        .join('')}
                </ul>
            </div>
            <div class="col-7">
                <h4>${meal.strMeal}</h4>
                <p>${meal.strInstructions}</p>
            </div>
        </div>
`;

    mealDiv.innerHTML = createHTML;
};
