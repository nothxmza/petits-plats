import { recipes } from "./data/recipes.js";
import { listTemplates, cardTemplates, updateList } from "./scripts/templates/templates.js";
import { listSearch } from "./scripts/utils/list.js";
import { displayBtnDeleteSearch, hideBtnDeleteSearch } from "./scripts/utils/mainSearch.js";


export let currentRecipes = [...recipes];
export let tags = new Set();
export let count = currentRecipes ? currentRecipes.length : 0;


const mainSearch = () => {
	const search = document.getElementById('main-search');
	let searchValue = "";

	//Prevent characters other than letters
	search.addEventListener('keypress', (e) => {
		if (!/[a-zA-ZÀ-ÿ\s]/.test(e.key)) {
			e.preventDefault();
		}
	});

	// Prevent the paste
	search.addEventListener('paste', (e) => {
		e.preventDefault();
	});

	//sort recipes by search value
	search.addEventListener('input', (e) => {
		searchValue = e.target.value;
		if(searchValue.length > 2){
			displayBtnDeleteSearch();
		}else{
			hideBtnDeleteSearch();
		}
		filterRecipes();
	})
}

export const filterRecipes = () => {
	const searchValue = document.getElementById('main-search').value;

	if(searchValue.length === 0) {
		currentRecipes = [...recipes];
	} else if(searchValue.length > 2) {
		currentRecipes = recipes.filter(recipe => {
			const searchValueLower = searchValue.toLowerCase();
			const recipeName = recipe.name.toLowerCase();
			const recipeDescription = recipe.description.toLowerCase();
			const ingredientMatch = recipe.ingredients.some(ingredient => {
				return ingredient.ingredient.toLowerCase().includes(searchValueLower);
			})
			return recipeName.includes(searchValueLower) || recipeDescription.includes(searchValueLower) || ingredientMatch;
		})
	}

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
	displayCount();
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

const displayCount = () => {
	const countElement = document.getElementById('count');
	countElement.textContent = `${currentRecipes.length} recettes`;
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
	displayCount();
}

init();