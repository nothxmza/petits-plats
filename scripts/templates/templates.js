
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



export const cardTemplates = () => {

}