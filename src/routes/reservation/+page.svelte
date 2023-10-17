<script lang="ts">
	import { goto } from '$app/navigation';
	import dropIcon from '$lib/images/icons/arrow_drop_down.svg';
	import closeIcon from '$lib/images/icons/close.svg';
	import minusIcon from '$lib/images/icons/math-minus.svg';
	import plusIcon from '$lib/images/icons/math-plus.svg';
	import dateIcon from '$lib/images/icons/today.svg';
	import Form from '../../components/Form.svelte';
	import Popup from '../../components/Popup.svelte';
	import TableList from '../../components/TableList.svelte';
	import { handlePopUp, handleReservationData, type ReservedData } from '../../store';
	import { popUpDate } from '../../util/popUpClient';
	import { ReservationData } from '../../util/reservationClient';

	const reservationClient = new ReservationData();
	let reservation: ReservedData;
	let isSelectTable = false;
	let isPopUp = false;

	let reservationInfo = reservationClient.getData();
	reservationInfo.subscribe((prevReservation) => {
		reservation = prevReservation;
	});
	handlePopUp.subscribe((value) => (isPopUp = value));

	function saveDate(fullDate: string) {
		reservationClient.updateDate(fullDate);
	}

	function validateForm() {
		if (reservationClient.validateReservation()) {
			handleReservationData.update((prev) => {
				return [...prev, reservation];
			});
			goto('/');
		}
	}
</script>

<section class="addReservationContainer">
	{#if isPopUp}
		<Popup {saveDate} />
	{/if}
	<Form {reservation} {reservationClient} {validateForm} {isPopUp} {isSelectTable} />
</section>

<style>
	.addReservationContainer {
		background-color: white;
		display: flex;
		justify-content: center;
		position: relative;
	}
</style>
