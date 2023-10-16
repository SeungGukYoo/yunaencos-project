import { error } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { handleReservationData } from '../../../store.js';
export function load({ params }) {
	const totalTalbe = get(handleReservationData);
	const editTableId: number = parseInt(params.editTable);
	for (const tableIdx in totalTalbe) {
		if (totalTalbe[tableIdx].id === editTableId) {
			return totalTalbe[tableIdx];
		}
	}

	throw error(404, 'Not found');
}
