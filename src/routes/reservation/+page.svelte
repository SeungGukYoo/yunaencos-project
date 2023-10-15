<script lang="ts">
	import dropIcon from '$lib/images/icons/arrow_drop_down.svg';
	import closeIcon from '$lib/images/icons/close.svg';
	import minusIcon from '$lib/images/icons/math-minus.svg';
	import plusIcon from '$lib/images/icons/math-plus.svg';
	import dateIcon from '$lib/images/icons/today.svg';
	import { get } from 'svelte/store';
	import { handlePopUp, handleReservationInfo } from '../../store';
	import Popup from './Popup.svelte';
	import TableList from './TableList.svelte';

	$: isPopUp = false;
	let dateMassage = get(handleReservationInfo).reservedDate;
	let reservedTalbeInfo: number[] = get(handleReservationInfo).reservedTable;
	let guestCount = 1;
	let isSelectTable = false;

	function inCreaseCount(e: MouseEvent) {
		e.preventDefault();
		if (guestCount === 99) {
			alert('maximum guest count is 99');
		}
		guestCount += 1;
	}
	function deCreaseCount(e: MouseEvent) {
		e.preventDefault();
		if (guestCount <= 1) {
			alert('minimum guest count is 1');
		}
		guestCount -= 1;
	}
	function popUpDate() {
		if (isPopUp) return;
		handlePopUp.update((prev: boolean) => {
			prev = true;
			return prev;
		});
	}

	function choiceTable() {
		isSelectTable = !isSelectTable;
	}

	const tableMessage = handleReservationInfo.subscribe((value) => {
		reservedTalbeInfo = value.reservedTable;
	});
	const dateMessage = handleReservationInfo.subscribe((value) => {
		let { reservedDate } = value;
		if (reservedDate === dateMassage) return;
		dateMassage = reservedDate;
	});

	const popUpSubscribe = handlePopUp.subscribe((value) => (isPopUp = value));
</script>

<section class="addReservationContainer">
	{#if isPopUp}
		<Popup />
	{/if}
	<form>
		<div class="reservationTopContainer">
			<label for="reservation-name">
				<input
					type="text"
					name="reservation-name"
					id="reservation-name"
					placeholder="Name"
					class="nameInputContainer"
				/>
			</label>
			<label for="reservation-phone">
				<input
					type="tel"
					id="reservation-phone"
					name="phone"
					pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
					placeholder="Phoone"
				/>
			</label>
			<label>
				<button type="button" class="dateChoiceBtn" on:click|preventDefault={popUpDate}>
					<img src={dateIcon} alt="calendar Icon" />
					{#if dateMassage}
						{dateMassage}
					{:else}
						Seleted Date
					{/if}
				</button>
			</label>
		</div>
		<div class="reservationMidContainer">
			<label class="countContainer"
				>Guest
				<button class="countBtn" on:click={deCreaseCount}><img src={minusIcon} alt="" /></button>
				<span>{guestCount}</span>
				<button class="countBtn" on:click={inCreaseCount}><img src={plusIcon} alt="" /></button>
			</label>
			<div class="dropdownContainer">
				<div class="dropdownBtn">
					{#if reservedTalbeInfo.length}
						<div class="tableContainer">
							{#each reservedTalbeInfo as table}
								<span>
									Table {table} • Floor 1 <button><img src={closeIcon} alt="" /></button></span
								>
							{/each}
						</div>
					{:else}
						<p>Select Table</p>
					{/if}
					<img class="dropDownIcon" src={dropIcon} alt="" on:click={choiceTable} />
					{#if isSelectTable}
						<TableList />
					{/if}
				</div>
			</div>
		</div>
		<textarea class="textElement" name="" id="" cols="30" rows="10" placeholder="Add note" />
		<div>
			<button class="reservationBtn"> Save </button>
		</div>
	</form>
</section>

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
	.reservationBtn {
		width: 100%;
		height: 48px;
		margin-bottom: 24px;
		border: none;
		background-color: rgb(229, 92, 61);
		color: #eee;
		border-radius: 8px;
		box-shadow: 1px 1px 3px 1px rgba(66, 66, 66, 0.35);
	}
</style>
