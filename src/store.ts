import { writable } from 'svelte/store';

interface ReservedData {
	name: string;
	phone: string;
	reservedDate: string;
	people: number;
	reservedTable: number[];
	etc: string;
}

export const reservationList: Array<ReservedData> = [];

const currentReservationInfo: ReservedData = {
	name: '',
	phone: '',
	reservedDate: '',
	people: 0,
	reservedTable: [],
	etc: ''
};

const isNewAddReservation = '/';
const isPopUpOn = false;
export const handleReservationInfo = writable(currentReservationInfo);
export const handlePopUp = writable(isPopUpOn);
export const handleMode = writable(isNewAddReservation);
export const handleReservationData = writable(reservationList);
