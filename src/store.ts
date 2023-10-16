import { writable } from 'svelte/store';

export interface ReservedData {
	id: number;
	name: string;
	phone: string;
	reservedDate: string;
	people: number;
	reservedTable: number[];
	etc: string;
}

export const reservationList: Array<ReservedData> = [
	{ id: 1, name: '1', phone: '1', reservedDate: '1', people: 1, reservedTable: [1], etc: '1' }
];

const isNewAddReservation = '/';
const isPopUpOn = false;
export const handlePopUp = writable(isPopUpOn);
export const handleMode = writable(isNewAddReservation);
export const handleReservationData = writable(reservationList);
