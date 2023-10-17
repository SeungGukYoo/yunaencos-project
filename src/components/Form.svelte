<script lang="ts">
	import dropIcon from '$lib/images/icons/arrow_drop_down.svg';
	import closeIcon from '$lib/images/icons/close.svg';
	import minusIcon from '$lib/images/icons/math-minus.svg';
	import plusIcon from '$lib/images/icons/math-plus.svg';
	import dateIcon from '$lib/images/icons/today.svg';
	import deleteBtn from '$lib/images/icons/trash.svg';
	import type { EventHandler } from 'svelte/elements';
	import type { ReservedData } from '../store';
	import { popUpDate } from '../util/popUpClient';
	import type { ReservationData } from '../util/reservationClient';
	import TableList from './TableList.svelte';

	export let reservation: ReservedData;
	export let reservationClient: ReservationData;
	export let validateForm: EventHandler<SubmitEvent, HTMLFormElement>;
	export let isPopUp: boolean;
	export let isSelectTable: boolean;

	function choiceTable() {
		isSelectTable = !isSelectTable;
	}

	function saveDate(fullDate: string) {
		reservationClient.updateDate(fullDate);
	}
	function addTable(addTableNumber: number) {
		reservationClient.addTable(addTableNumber);
		isSelectTable = false;
	}
</script>

<form on:submit|preventDefault={validateForm}>
	<div class="reservationTopContainer">
		<label for="reservation-name">
			<input
				type="text"
				name="reservation-name"
				id="reservation-name"
				placeholder="Name"
				class="nameInputContainer"
				value={reservation.name}
				on:input={(e) => reservationClient.updateName(e.currentTarget.value)}
			/>
		</label>
		<label for="reservation-phone">
			<input
				type="tel"
				id="reservation-phone"
				name="phone"
				placeholder="Phoone"
				value={reservation.phone}
				on:input={(e) => reservationClient.updatePhone(e.currentTarget.value)}
			/>
		</label>
		<label>
			<button
				type="button"
				class="dateChoiceBtn"
				on:click|preventDefault={() => popUpDate(isPopUp)}
			>
				<img src={dateIcon} alt="calendar Icon" />
				{#if reservation.reservedDate}
					{reservation.reservedDate}
				{:else}
					Seleted Date
				{/if}
			</button>
		</label>
	</div>
	<div class="reservationMidContainer">
		<label class="countContainer"
			>Guest
			<button class="countBtn" on:click|preventDefault={() => reservationClient.deCreaseCount()}
				><img src={minusIcon} alt="" /></button
			>
			<span>{reservation.people}</span>
			<button class="countBtn" on:click|preventDefault={() => reservationClient.inCreaseCount()}
				><img src={plusIcon} alt="" /></button
			>
		</label>
		<div class="dropdownContainer">
			<div class="dropdownBtn">
				{#if reservation.reservedTable.length}
					<div class="tableContainer">
						{#each reservation.reservedTable as table}
							<span>
								Table {table} • Floor 1
								<button on:click|preventDefault={() => reservationClient.deleteTable(table)}
									><img src={closeIcon} alt="delete icon" /></button
								></span
							>
						{/each}
					</div>
				{:else}
					<p>Select Table</p>
				{/if}
				<img class="dropDownIcon" src={dropIcon} alt="" on:click={choiceTable} />
				{#if isSelectTable}
					<TableList {addTable} />
				{/if}
			</div>
		</div>
	</div>
	<textarea
		class="textElement"
		name=""
		id=""
		cols="30"
		rows="10"
		on:input={(e) => reservationClient.updateEtc(e.currentTarget.value)}
		value={reservation.etc}
		placeholder="Add note"
	/>
	<div class="btnContainer">
		<button class="deleteBtn">
			<img src={deleteBtn} alt="" />
		</button>
		<button class="reserveBtn" type="submit"> Seated </button>
	</div>
</form>

<style>
	.addReservationContainer {
		background-color: white;
		display: flex;
		justify-content: center;
		position: relative;
	}
	.reservationTopContainer {
		display: flex;
		align-items: center;
		gap: 15px;
		margin-bottom: 30px;
	}
	form input {
		padding: 12px 10px;
		border: gray 1px solid;
		border-radius: 7px;
		width: 300px;
	}

	.dateChoiceBtn {
		border: none;
		display: flex;
		align-items: center;
		padding: 7px 33px;
		border-radius: 7px;
		color: gray;
		box-shadow: 1px 1px 3px 1px rgba(66, 66, 66, 0.35);
	}
	.dateChoiceBtn img {
		margin-right: 4px;
	}

	.reservationMidContainer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30px;
	}
	.countContainer {
		display: flex;
		align-items: center;

		gap: 10px;
	}
	.countContainer span {
		font-size: 24px;
		margin: 0 12px;
	}
	.countBtn {
		border: none;
		box-shadow: 1px 1px 3px 1px rgba(66, 66, 66, 0.35);
		padding: 8px 10px;
	}
	.dropdownContainer {
		width: 400px;
		display: flex;
	}
	.dropdownBtn {
		width: 100%;
		display: flex;
		justify-content: space-between;

		border: 1px solid gray;
		padding-left: 24px;
		padding-right: 24px;
		position: relative;
	}
	.tableContainer {
		display: flex;
		overflow-y: scroll;
		align-items: center;
		gap: 10px;
	}
	.tableContainer span {
		background-color: rgb(203, 203, 203);
		border-radius: 10px;
		padding: 4px 12px;
		height: 24px;
		font-size: 7px;
		display: flex;
		min-width: 120px;
		justify-content: space-between;
		align-items: center;
	}
	.tableContainer button {
		height: 17px;
		width: 17px;
		object-fit: contain;
		border: none;
		border-radius: 50%;
	}
	.tableContainer button img {
		height: 100%;
		width: 100%;
		object-fit: contain;
	}

	.dropdownBtn p {
		display: flex;
	}
	.dropDownIcon {
		cursor: pointer;
	}

	.textElement {
		width: 100%;
		resize: none;
		padding: 10px;
		outline: none;
		font-family: var(--font-body);
		margin-bottom: 30px;
	}
	.btnContainer {
		display: flex;
		margin-bottom: 20px;
	}
	.deleteBtn {
		outline: none;
		border: none;
		background-color: rgb(246, 246, 246);
		border-radius: 8px;
		padding: 12px 14px;
		box-shadow: 1px 1px 8px 1px rgba(66, 66, 66, 0.35);
	}
	.reserveBtn {
		color: white;
		background-color: rgb(231, 85, 51);
		border: none;
		border-radius: 8px;
		flex-grow: 2;
		margin-left: 18px;
		box-shadow: 1px 1px 8px 1px rgba(66, 66, 66, 0.35);
	}
</style>
