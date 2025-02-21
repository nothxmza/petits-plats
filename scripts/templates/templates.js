
export const listTemplates = (data, type) => {

	let btnName = '';
	if(type === 'ingredient'){
		btnName = 'ingrédient';
	}else if(type === 'devices'){
		btnName = 'appareil';
	}else if(type === 'ustensils'){
		btnName = 'ustensile';
	}

	const container = document.createElement('div');
	container.className = `${type}-list hidden`;

	const button = document.createElement('button');
	button.className = `flex items-center justify-between w-full bg-white p-4 rounded-t-lg btn-${type}-list`;
	button.innerHTML = `${btnName} <i class="fa-solid fa-chevron-up chevron-select"></i>`;

	const searchDiv = document.createElement('div');
	searchDiv.className = 'flex flex-col gap-5 bg-white px-4 pb-4 rounded-b-lg';
	searchDiv.innerHTML = `
		<div class="relative w-full bg-white rounded-lg flex items-center">
			<input type="text" class="border-1 border-gray-300 rounded-sm p-2 text-gray-400" />
			<i class="fa-solid fa-magnifying-glass absolute right-5 text-gray-300"></i>
		</div>
	`;

	const ul = document.createElement('ul');
	const items = new Set();

	data.forEach(recipe => {
		if (type === 'ingredient') {
			recipe.ingredients.forEach(ingredient => {
				items.add(ingredient.ingredient);
			});
		} else if (type === 'devices') {
			items.add(recipe.appliance);
		} else if (type === 'ustensils') {
			recipe.ustensils.forEach(ustensil => {
				items.add(ustensil);
			});
		}
	});
	items.forEach(item => {
		const li = document.createElement('li');
		li.textContent = item;
		li.className = 'cursor-pointer hover:bg-yellow-100 p-1';
		ul.appendChild(li);
	});


	console.log(ul);

	searchDiv.appendChild(ul);
	container.appendChild(button);
	container.appendChild(searchDiv);

	return container;
}



export const cardTemplates = (data) => {

	console.log(data);
	const url = `/assets/images/${data.image}`;

	const article = document.createElement('article');
	article.className = 'bg-white rounded-lg';
	
	article.innerHTML = `
		<div class="relative">
			<img src="${url}" alt="" class="w-full h-60 object-cover rounded-t-lg">
			<span class="absolute top-0 right-0 m-5 bg-yellow-400 py-1 px-3 rounded-xl text-xs">${data.time}min</span>
		</div>
		<div class="py-7 px-6 flex flex-col gap-6">
			<h2 class="text-lg font-normal font-anton">${data.name}</h2>
			<div class="flex flex-col gap-3">
				<h3 class="text-xs text-gray-500 font-manrope">RECETTE</h3>
				<p class="text-black text-sm font-manrope">${data.description}</p>
			</div>
			<div class="flex flex-col gap-3">
				<h3 class="text-xs text-gray-500 font-manrope">INGREDIENT</h3>
				<div class="grid grid-cols-2 gap-6">
					${data.ingredients.map(ingredient => `
						<div>
							<h4 class="text-black text-sm font-manrope">${ingredient.ingredient}</h4>
							<p class="text-sm text-gray-500 font-manrope">${ingredient.quantity || ''} ${ingredient.unit || ''}</p>
						</div>
					`).join('')}
				</div>
			</div>
		</div>
	`;
	
	return article;
}