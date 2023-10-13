<script lang="ts">
	import dropIcon from '$lib/images/icons/arrow_drop_down.svg';
	import etcIcon from '$lib/images/icons/edit.svg';
	import minusIcon from '$lib/images/icons/math-minus.svg';
	import plusIcon from '$lib/images/icons/math-plus.svg';
	import dateIcon from '$lib/images/icons/today.svg';

	let guestCount = 1;
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
</script>

<section class="addReservationContainer">
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
				<button type="button" class="dateChoiceBtn">
					<img src={dateIcon} alt="calendar Icon" /> Select Date
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
					<p>Select Table</p>
					<img src={dropIcon} alt="" />
				</div>
				<ul>
					<li value="1">Table 1</li>
					<li value="2">Table 2</li>
					<li value="3">Table 3</li>
					<li value="4">Table 4</li>
					<li value="5">Table 5</li>
					<li value="6">Table 6</li>
					<li value="7">Table 7</li>
					<li value="8">Table 8</li>
				</ul>
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
	}
	.dropdownContainer ul {
		list-style: none;
		position: absolute;
		top: 25px;
		width: 100%;
		text-align: center;

		display: none;
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
