import { tags } from "../../index.js";
import { filterRecipes } from "../../index.js";


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


export const listSearch = (type) => {
	let search = document.getElementById(`${type}-search`);
	const list = document.getElementById(`${type}-ul`);
	const items = list.getElementsByTagName('li');
	let deleteButton = document.getElementById(`btn-delete-search-tag-${type}`);
	let searchValue = "";
	let searchValueLower = "";
	let filteredItems = [];

	// attach click events to items
	const attachClickEvents = (items) => {
		Array.from(items).forEach(item => {
			item.addEventListener('click', () => {
				createTag(item.textContent);
				search.value = '';
				deleteButton.classList.add('hidden');
				const list = document.querySelector(`.${type}-list`);
				const toggle = document.querySelector(`.toggle-${type}`);
				if (list && toggle) {
					list.classList.add('hidden');
					toggle.classList.remove('hidden');
				}
			});
		});
	};

	// handle delete button search tag
	if (deleteButton) {
		deleteButton.addEventListener('click', () => {
			search.value = '';
			deleteButton.classList.add('hidden');
			// Show all items
			Array.from(items).forEach(item => {
				item.classList.remove('hidden');
			});
			// attach click events to items
			attachClickEvents(items);
			const noResultMessage = list.querySelector('.no-result-message');
			if (noResultMessage) {
				noResultMessage.remove();
			}
		});
	}
	attachClickEvents(items);

	//sort list
	search.addEventListener('input', (e) => {
		searchValue = e.target.value;

		if(searchValue.length > 1){
			deleteButton.classList.remove('hidden');
			searchValueLower = searchValue.toLowerCase();
			filteredItems = Array.from(items).filter(item => {
				return item.textContent.toLowerCase().includes(searchValueLower);
			})
			// hidden all items
			Array.from(items).forEach(item => {
				item.classList.add('hidden');
			});
			// remove no result message if exists
			const noResultMessage = list.querySelector('.no-result-message');
			if (noResultMessage) {
				noResultMessage.remove();
			}
			if(filteredItems.length === 0){
				const li = document.createElement('li');
				li.textContent = 'Aucun élément trouvé';
				li.className = 'no-result-message';
				list.appendChild(li);
			} else {
				// show filtered items
				filteredItems.forEach(item => {
					item.classList.remove('hidden');
				});
			}
		} else {
			// Show all items
			Array.from(items).forEach(item => {
				item.classList.remove('hidden');
			});
			const noResultMessage = list.querySelector('.no-result-message');
			if (noResultMessage) {
				noResultMessage.remove();
			}
			deleteButton.classList.add('hidden');
		}
	})
}

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
		filterRecipes();
	})
	tagContainer.appendChild(tag);
	tags.add(text);
	filterRecipes();
};