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