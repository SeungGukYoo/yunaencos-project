import { get, writable } from 'svelte/store';
import type { ReservedData } from './../store';
type TWritable<T> = import('svelte/store').Writable<T>;
interface IReservationData {
	inCreaseCount: () => void;
	deCreaseCount: () => void;
	setData: (existReservationData: ReservedData) => void;
	getData: () => TWritable<ReservedData>;
	addTable: (addTableNumber: number) => void;
	deleteTable: (deleteTableNumber: number) => void;
	updateName: (name: string) => void;
	updatePhone: (phone: string) => void;
	updateDate: (fullDate: string) => void;
	updateEtc: (etc: string) => void;
	validateReservation: () => boolean;
}

export class ReservationData implements IReservationData {
	reservationData: TWritable<ReservedData>;
	reservedData: ReservedData;

	constructor() {
		this.reservationData = writable({
			id: 0,
			name: '',
			phone: '',
			reservedDate: '',
			people: 1,
			reservedTable: [],
			etc: ''
		});
		this.reservedData = get(this.reservationData);
	}
	setData(existReservationData: ReservedData) {
		this.reservationData.update((prevReservationData) => {
			prevReservationData = existReservationData;
			return prevReservationData;
		});
		this.reservedData = get(this.reservationData);
	}
	getData() {
		return this.reservationData;
	}
	inCreaseCount() {
		if (this.reservedData.people === 99) {
			alert('maximum guest count is 99');
			return;
		}
		this.reservationData.update((prevReservationTable) => {
			prevReservationTable.people += 1;
			return prevReservationTable;
		});
	}
	deCreaseCount() {
		if (this.reservedData.people === 1) {
			alert('minimum guest count is 1');
			return;
		}
		this.reservationData.update((prevReservationTable) => {
			prevReservationTable.people -= 1;
			return prevReservationTable;
		});
	}
	addTable(addTableNumber: number) {
		if (this.reservedData.reservedTable.includes(addTableNumber + 1)) {
			alert('aleady reserved table');
			return;
		}

		this.reservationData.update((prevReservationInfo) => {
			prevReservationInfo.reservedTable = [
				...prevReservationInfo.reservedTable,
				addTableNumber + 1
			];
			return prevReservationInfo;
		});
	}
	deleteTable(deleteTableNumber: number) {
		this.reservationData.update((prevReservationTable) => {
			prevReservationTable.reservedTable = prevReservationTable.reservedTable.filter(
				(tableNumber: number) => tableNumber !== deleteTableNumber
			);
			return prevReservationTable;
		});
	}
	updateName(reservationName: string) {
		this.reservationData.update((prevReservationTable) => {
			prevReservationTable.name = reservationName;
			return prevReservationTable;
		});
	}
	updatePhone(reservationPhone: string) {
		this.reservationData.update((prevReservationTable) => {
			prevReservationTable.phone = reservationPhone;
			return prevReservationTable;
		});
	}
	updateDate(fullDate: string) {
		this.reservationData.update((prevReservationTable) => {
			prevReservationTable.reservedDate = fullDate;
			return prevReservationTable;
		});
	}
	updateEtc(memo: string) {
		this.reservationData.update((prevReservationTable) => {
			prevReservationTable.etc = memo;
			return prevReservationTable;
		});
	}
	validateReservation() {
		if (this.reservedData.name.trim().length === 0) {
			throw Error('이름을 작성해주세요.');
		}
		if (this.reservedData.phone.trim().length === 0) {
			throw Error('핸드폰 번호를 작성해주세요.');
		}
		if (this.reservedData.reservedDate.length === 0) {
			throw Error('예약일은 필수입니다.');
		}
		if (this.reservedData.people === 0) {
			throw Error('최소 1명 이상 예약하셔야 합니다.');
		}
		this.reservationData.update((prevReservationTable) => {
			if (prevReservationTable.id === 0) prevReservationTable.id = Date.now();
			return prevReservationTable;
		});

		return true;
	}
}
