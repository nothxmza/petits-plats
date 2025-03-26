import { filterRecipes } from "../../index.js";

export const deleteSearch = () => {
	let search = document.getElementById('main-search');
	search.value = '';
	filterRecipes();
	hideBtnDeleteSearch();
}

export const displayBtnDeleteSearch = () => {
	const btnDeleteSearch = document.getElementById('btn-delete-search');
	btnDeleteSearch.addEventListener('click', deleteSearch);
	btnDeleteSearch.style.display = 'block';
}

export const hideBtnDeleteSearch = () => {
	const btnDeleteSearch = document.getElementById('btn-delete-search');
	btnDeleteSearch.style.display = 'none';
}