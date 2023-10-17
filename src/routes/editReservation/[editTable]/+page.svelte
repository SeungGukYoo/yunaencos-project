<script lang="ts">
	import { goto } from '$app/navigation';

	import Form from '../../../components/Form.svelte';
	import Popup from '../../../components/Popup.svelte';
	import { handlePopUp, handleReservationData, type ReservedData } from '../../../store.js';

	import { ReservationData } from '../../../util/reservationClient';

	export let data;

	const reservationClient = new ReservationData();

	let isPopUp = false;
	let reservation: ReservedData;
	let reservationInfo = reservationClient.getData();
	let isSelectTable = false;
	reservationClient.setData(data);
	handlePopUp.subscribe((value) => (isPopUp = value));
	reservationInfo.subscribe((prevReservation) => {
		reservation = prevReservation;
	});

	function saveDate(fullDate: string) {
		reservationClient.updateDate(fullDate);
	}

	function validateForm() {
		if (reservationClient.validateReservation()) {
			handleReservationData.update((prev) => {
				let updateReservation = [...prev].map((table) => {
					if (table.id === reservation.id) {
						return reservation;
					}
					return table;
				});
				return updateReservation;
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
