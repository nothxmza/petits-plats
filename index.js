import { recipes } from "./data/recipes.js";
import { listTemplates, cardTemplates, updateList } from "./scripts/templates/templates.js";


let currentRecipes = [...recipes];
let tags = new Set();

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
	const search = document.getElementById('main-search');

	let searchValue = "";
	let searchValueLower = "";

	search.addEventListener('input', (e) => {
		searchValue = e.target.value;

		if(searchValue.length > 2){
			searchValueLower = searchValue.toLowerCase();
			currentRecipes = recipes.filter(recipe => {
				const recipeName = recipe.name.toLowerCase();
				const recipeDescription = recipe.description.toLowerCase();
				const ingredientMatch = recipe.ingredients.filter(ingredient => {
					return ingredient.ingredient.toLowerCase().includes(searchValueLower);
				})
				return recipeDescription.includes(searchValueLower) || recipeName.includes(searchValueLower) || ingredientMatch;
			})
		}else{
			currentRecipes = [...recipes];
		}
		updateWithTags();
	})
}

const updateWithTags = () => {
	const searchValue = document.getElementById('main-search').value;
	currentRecipes = [...recipes];

	if (searchValue.length > 2) {
		currentRecipes = currentRecipes.filter(recipe => {
			const recipeName = recipe.name.toLowerCase();
			const recipeDescription = recipe.description.toLowerCase();
			const ingredientMatch = recipe.ingredients.some(ingredient => 
				ingredient.ingredient.toLowerCase().includes(searchValue)
			);
			return recipeName.includes(searchValue) || recipeDescription.includes(searchValue) || ingredientMatch;
		});
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
	console.log("currentRecipes: ", currentRecipes, "tags: ", tags);
	displayRecipes();
	updateListDisplay();
    listSearchDis();
};

    const createTag = (text) => {
	const tagContainer = document.getElementById('tag-container');

		if(tags.has(text)) return;
        const tag = document.createElement('span');
        tag.className = 'bg-yellow-400 py-1 px-3 rounded-xl text-sm flex items-center gap-2 m-1';
        tag.innerHTML = `
            ${text}
            <i class="fa-solid fa-x cursor-pointer delete-tag"></i>`;
        
		const deleteTag = tag.querySelector('.delete-tag');
		deleteTag.addEventListener('click', () => {
			tag.remove();
            tags.delete(text);
			updateWithTags();
		})
        tagContainer.appendChild(tag);
        tags.add(text);
		updateWithTags();
    };



const listSearch = (type) => {
	console.log("LALALLALSLSLSLSLSLL")
	const search = document.getElementById(`${type}-search`);
	const list = document.getElementById(`${type}-ul`);
	const items = list.getElementsByTagName('li');
	let searchValue = "";
	let searchValueLower = "";
	let filteredItems = [];

	Array.from(items).forEach(item => {
        item.addEventListener('click', () => {
			console.log("CIICICICI")
            createTag(item.textContent);
            
            const list = document.querySelector(`.${type}-list`);
            const toggle = document.querySelector(`.toggle-${type}`);
            if (list && toggle) {
                list.classList.add('hidden');
                toggle.classList.remove('hidden');
            }
        });
    });

	search.addEventListener('input', (e) => {
		searchValue = e.target.value;

		if(searchValue.length > 2){
			searchValueLower = searchValue.toLowerCase();
			filteredItems = Array.from(items).filter(item => {
				return item.textContent.toLowerCase().includes(searchValueLower);
			})
		}else{
			filteredItems = Array.from(items);
		}

		Array.from(items).forEach(item => {
			item.classList.add('hidden');
		})

		filteredItems.forEach(item => {
			item.classList.remove('hidden');
		})
	})
}

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

const listSearchDis = () => {
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
	listSearchDis();
	displayRecipes();
}

console.log("current: ", currentRecipes)


init();