const recipelist = new Map();
recipelist.set('chickencurry', { ingredients: ['chicken', 'salt', 'chilli'], recipe: 'Chicken Curry Recipe' });
recipelist.set('veggiecurry', { ingredients: ['vegetables', 'salt', 'chilli'], recipe: 'Veggie Curry Recipe' });
recipelist.set('fishfry', { ingredients: ['fish', 'salt', 'lemon'], recipe: 'Fish Fry Recipe' });
recipelist.set('beefstew', { ingredients: ['beef', 'potatoes', 'carrots', 'onions'], recipe: 'Beef Stew Recipe' });
recipelist.set('pasta', { ingredients: ['pasta', 'tomato sauce', 'cheese', 'basil'], recipe: 'Pasta Recipe' });
recipelist.set('grilledcheese', { ingredients: ['bread', 'cheese', 'butter'], recipe: 'Grilled Cheese Recipe' });
recipelist.set('chickentacos', { ingredients: ['chicken', 'tortillas', 'cheese', 'lettuce'], recipe: 'Chicken Tacos Recipe' });
recipelist.set('veggieburger', { ingredients: ['veggie patty', 'bun', 'lettuce', 'tomato'], recipe: 'Veggie Burger Recipe' });



const searchForm = document.getElementById('search-form');
const recipeList = document.getElementById('recipe-list');
const favoritesList = document.getElementById('favorites-list');
const clearFavoritesButton = document.getElementById('clear-favorites');

searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const ingredients = document.getElementById('ingredients').value.trim().split(',');
    const results = [];
    for (const [recipe, ingredientsObj] of recipelist.entries()) {
        if (ingredients.every(function(ingredient) {
            return ingredientsObj.ingredients.includes(ingredient.trim());
        })) {
            results.push({ recipe: ingredientsObj.recipe, ingredients: ingredientsObj.ingredients });
        }
    }
    displayRecipes(results);
});

function displayRecipes(recipes) {
    recipeList.innerHTML = '';
    const ul = document.createElement('ul');
    recipes.forEach(function(recipe) {
        const li = document.createElement('li');
        li.textContent = recipe.recipe + ' - ' + recipe.ingredients.join(', ');
        const addFavoriteButton = document.createElement('button');
        addFavoriteButton.textContent = 'Add to Favorites';
        addFavoriteButton.addEventListener('click', function() {
            const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
            if (!favorites.includes(recipe.recipe)) {
                localStorage.setItem('favorites', JSON.stringify([...favorites, recipe.recipe]));
            }
            displayFavorites();
        });
        li.appendChild(addFavoriteButton);
        ul.appendChild(li);
    });
    recipeList.appendChild(ul);
}

clearFavoritesButton.addEventListener('click', function() {
    localStorage.removeItem('favorites');
    displayFavorites();
});

function displayFavorites() {
    favoritesList.innerHTML = '';
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const ul = document.createElement('ul');
    favorites.forEach(function(recipe) {
        const li = document.createElement('li');
        li.textContent = recipe;
        ul.appendChild(li);
    });
    favoritesList.appendChild(ul);
}

displayFavorites();