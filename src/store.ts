import { writable } from 'svelte/store';

interface ReservedData {
	name: string;
	phone: string;
	reservedDate: string;
	people: number;
	reservedTable: number[];
	reservedFloor: number;
	etc: string;
}

export const reservationList: Array<ReservedData> = [
	{
		name: 'David',
		phone: '012-345-6789',
		reservedDate: '2:00 Pm',
		people: 4,
		reservedTable: [7, 8],
		reservedFloor: 1,
		etc: 'Birthday'
	},
	{
		name: 'David',
		phone: '012-345-6789',
		reservedDate: '2:00 Pm',
		people: 4,
		reservedTable: [7, 8],
		reservedFloor: 1,
		etc: ''
	},
	{
		name: 'David',
		phone: '012-345-6789',
		reservedDate: '2:00 Pm',
		people: 4,
		reservedTable: [7, 8],
		reservedFloor: 1,
		etc: ''
	},
	{
		name: 'David',
		phone: '012-345-6789',
		reservedDate: '2:00 Pm',
		people: 4,
		reservedTable: [7, 8],
		reservedFloor: 1,
		etc: ''
	}
];

const isNewAddReservation = false;
export const handleMode = writable(isNewAddReservation);
