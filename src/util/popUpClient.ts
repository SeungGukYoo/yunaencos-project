import { handlePopUp } from '../store';

function closePopUp() {
	handlePopUp.update((prev) => {
		prev = false;
		return prev;
	});
}

function popUpDate(isPopUp: boolean) {
	if (isPopUp) return;
	handlePopUp.update((prev: boolean) => {
		prev = true;
		return prev;
	});
}


export { closePopUp, popUpDate };
