import { recipes } from "./data/recipes.js";
import { listTemplates, cardTemplates } from "./scripts/templates/templates.js";

const toggleIngredient = () => {
	const list = document.querySelector('.ingredient-list');
	const toggleDevice = document.querySelector('.toggle-ingredient');
	const btnListe = document.querySelector('.btn-ingredient-list');

	list.classList.toggle('hidden');
	toggleDevice.classList.toggle('hidden');

	btnListe.addEventListener('click', () => {
		list.classList.add('hidden');
		toggleDevice.classList.remove('hidden');
	})
}
window.toggleIngredient = toggleIngredient;

const toggleDevices = () => {
	const list = document.querySelector('.devices-list');
	const toggleDevice = document.querySelector('.toggle-devices');
	const btnListe = document.querySelector('.btn-devices-list');

	list.classList.toggle('hidden');
	toggleDevice.classList.toggle('hidden');

	btnListe.addEventListener('click', () => {
		list.classList.add('hidden');
		toggleDevice.classList.remove('hidden');
	})
	
}
window.toggleDevices = toggleDevices;


const toggleUstensils = () => {
	const list = document.querySelector('.ustensils-list');
	const toggleDevice = document.querySelector('.toggle-ustensils');
	const btnListe = document.querySelector('.btn-ustensils-list');

	list.classList.toggle('hidden');
	toggleDevice.classList.toggle('hidden');

	btnListe.addEventListener('click', () => {
		list.classList.add('hidden');
		toggleDevice.classList.remove('hidden');
	})
	
}
window.toggleUstensils = toggleUstensils;

const mainSearch = () => {
	const search = document.getElementById('main_search');
	let listIngredient = document.getElementById('ingredient');
	let listDevices = document.getElementById('devices');
	let listUstensils = document.getElementById('ustensils');


	let searchValue = "";
	let filteredRecipes = [];
	let searchValueLower = "";
	let ingredient = [];
	search.addEventListener('input', (e) => {
		// clearLists();
		searchValue = e.target.value;
		if(searchValue.length > 2){
			searchValueLower = searchValue.toLowerCase();
			filteredRecipes = recipes.filter(recipe => {
				let recipeName = recipe.name.toLowerCase();
				let recipeDescription = recipe.description.toLowerCase();

				ingredient = recipe.ingredients.filter(ingredient => {
					return ingredient.ingredient.toLowerCase().includes(searchValueLower);
				})

				if(ingredient.length > 0){
					return ingredient;
				}
				return recipeDescription.includes(searchValueLower) || recipeName.includes(searchValueLower);
			})
		}else{
			filteredRecipes = [];
		}
		if(filteredRecipes.length > 0)
			displayRecipes(filteredRecipes);
		// listIngredient.appendChild(listTemplates(filteredRecipes, "ingredient"));
		// listDevices.appendChild(listTemplates(filteredRecipes, "devices"));
		// listUstensils.appendChild(listTemplates(filteredRecipes, "ustensils"));
		//console.log(e.target.value);
	})
}

const displayRecipes = (recipes) => {
	//ici afficher les recettes

console.log(recipes);
	const wrapperCard = document.getElementById('wrapper-card');
    wrapperCard.innerHTML = "";
    
    recipes.forEach(recipe => {
		const card = cardTemplates(recipe);
			wrapperCard.appendChild(card);
    });

}

// const clearLists = () => {
//     //ici clear la list
// }

const init = async () => {
	mainSearch();

	// let listIngredient = document.getElementById('ingredient');
	// let listDevices = document.getElementById('devices');
	// let listUstensils = document.getElementById('ustensils');
	// listIngredient.appendChild(listTemplates(recipes[0].ingredients, 'ingredient'));
	// listDevices.appendChild(listTemplates(recipes[0], 'devices'));
	// listUstensils.appendChild(listTemplates(recipes[0].ustensils, 'ustensils'));


}



init();