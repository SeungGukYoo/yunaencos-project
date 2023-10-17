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

export const reservationList: Array<ReservedData> = [];

const isPopUpOn = false;
export const handlePopUp = writable(isPopUpOn);
export const handleReservationData = writable(reservationList);
