<script lang="ts">
	import dropIcon from '$lib/images/icons/arrow_drop_down.svg';
	import minusIcon from '$lib/images/icons/math-minus.svg';
	import plusIcon from '$lib/images/icons/math-plus.svg';
	import dateIcon from '$lib/images/icons/today.svg';
	import { handlePopUp, handleReservationInfo } from '../../store';
	import Popup from './Popup.svelte';

	$: isPopUp = false;
	$: dateMassage = 'Select Date';
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
		console.log(isSelectTable);
		isSelectTable = !isSelectTable;
	}
	handleReservationInfo.subscribe((value) => {
		dateMassage = value.reservedDate;
	});
	handlePopUp.subscribe((value) => (isPopUp = value));
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
					{dateMassage}
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
				<div class="dropdownBtn" on:click={choiceTable}>
					<p>Select Table</p>
					<img src={dropIcon} alt="" />
					{#if !isSelectTable}
						<ul class="tableListContainer">
							<li value="1">Table 1</li>
							<li value="2">Table 2</li>
							<li value="3">Table 3</li>
							<li value="4">Table 4</li>
							<li value="5">Table 5</li>
							<li value="6">Table 6</li>
							<li value="7">Table 7</li>
							<li value="8">Table 8</li>
						</ul>
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
		display: flex;
	}
	.dropdownBtn {
		display: flex;
		justify-content: space-between;
		width: 240px;
		border: 1px solid gray;
		padding-left: 24px;
		padding-right: 24px;
		position: relative;
	}
	.tableListContainer {
		position: absolute;
		top: 35.5px;
		left: 0px;
		width: 100%;
		list-style: none;
		text-align: center;
		background-color: #eee;
		border-left: 1px solid black;
		border-right: 1px solid black;
	}

	.tableListContainer li {
		padding: 12px;
		border-bottom: 1px solid black;
	}
	.tableListContainer li:last-child {
		margin-bottom: 0;
		padding: 12px;
		border-bottom: 1px solid black;
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
