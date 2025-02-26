import { recipes } from "./data/recipes.js";
import { listTemplates, cardTemplates, updateList } from "./scripts/templates/templates.js";
import { listSearch } from "./scripts/utils/list.js";


export let currentRecipes = [...recipes];
export let tags = new Set();
export let count = currentRecipes ? currentRecipes.length : 0;


const mainSearch = () => {
	const search = document.getElementById('main-search');
	let searchValue = "";
	let searchValueLower = "";

	//sort recipes by search value
	search.addEventListener('input', (e) => {
		searchValue = e.target.value;
		if(searchValue.length > 2){
			searchValueLower = searchValue.toLowerCase();
			currentRecipes = recipes.filter(recipe => {
				const recipeName = recipe.name.toLowerCase();
				const recipeDescription = recipe.description.toLowerCase();
				const ingredientMatch = recipe.ingredients.some(ingredient => {
					return ingredient.ingredient.toLowerCase().includes(searchValueLower);
				})
				return recipeName.includes(searchValueLower) || recipeDescription.includes(searchValueLower) || ingredientMatch;
			})
		}else{
			currentRecipes = [...recipes];
		}
		updateWithTags();
	})
}

export const updateWithTags = () => {
	const searchValue = document.getElementById('main-search').value;

	if(searchValue.length === 0)
		currentRecipes = [...recipes];

	if (tags.size > 0) {
		currentRecipes = currentRecipes.filter(recipe => {
			return Array.from(tags).every(tag => {
				const tagLower = tag.toLowerCase();
				return recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase() === tagLower) 
				|| recipe.appliance.toLowerCase() === tagLower 
				|| recipe.ustensils.some(ustensil => ustensil.toLowerCase() === tagLower);
			});
		});
	}
	displayRecipes();
	updateListDisplay();
    listSearchSort();
};


//display recipes cards
const displayRecipes = () => {
	const wrapperCard = document.getElementById('wrapper-card');
    wrapperCard.innerHTML = "";
    
    currentRecipes.forEach(recipe => {
		const card = cardTemplates(recipe);
			wrapperCard.appendChild(card);
    });
}

const  updateListDisplay = () => {
	updateList(currentRecipes, 'ingredient');
	updateList(currentRecipes, 'devices');
	updateList(currentRecipes, 'ustensils');
}

const listSearchSort = () => {
	listSearch('ingredient');
	listSearch('devices');
	listSearch('ustensils');
}

const init = async () => {
	mainSearch();
	let listIngredient = document.getElementById('ingredient');
	let listDevices = document.getElementById('devices');
	let listUstensils = document.getElementById('ustensils');
	listIngredient.appendChild(listTemplates(recipes, 'ingredient'));
	listDevices.appendChild(listTemplates(recipes, 'devices'));
	listUstensils.appendChild(listTemplates(recipes, 'ustensils'));
	listSearchSort();
	displayRecipes();
}

init();