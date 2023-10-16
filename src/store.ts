import { writable } from 'svelte/store';

export interface ReservedData {
	name: string;
	phone: string;
	reservedDate: string;
	people: number;
	reservedTable: number[];
	etc: string;
}

export const reservationList: Array<ReservedData> = [];

const isNewAddReservation = '/';
const isPopUpOn = false;
export const handlePopUp = writable(isPopUpOn);
export const handleMode = writable(isNewAddReservation);
export const handleReservationData = writable(reservationList);
