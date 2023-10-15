<script lang="ts">
	import timeIcon from '$lib/images/icons/alarm_on.svg';
	import downArrowIcon from '$lib/images/icons/chevron-down.svg';
	import upArrowIcon from '$lib/images/icons/chevron-up.svg';
	import dateIcon from '$lib/images/icons/today.svg';
	import deleteIcon from '$lib/images/icons/trash.svg';
	import { get } from 'svelte/store';
	import { handlePopUp, handleReservationInfo } from '../../store';
	type Calender = {
		[key: string]: number;
	};

	const period = ['AM', 'PM'];
	const calendar: Calender = {
		Jen: 31,
		Feb: 28,
		Mar: 31,
		Apr: 30,
		May: 31,
		Jun: 30,
		Jul: 31,
		Aug: 31,
		Sep: 30,
		Oct: 31,
		Nov: 30,
		Dec: 31
	};
	let timeFocus = false;
	let dateFocus = false;
	let maxDay = Array.from({ length: 30 }, (_, idx) => idx + 1);
	let currentHour = '07';
	let currentMinute = '00';
	let currentTimePeriod = 0;
	let choiceMonth: string = 'Sep';
	let choiceDay: number = 1;
	let isSaveDate = false;
	$: fullDate =
		choiceMonth +
		' ' +
		choiceDay +
		',' +
		currentHour +
		':' +
		currentMinute +
		period[currentTimePeriod];
	function closePopUp() {
		handlePopUp.update((prev) => {
			prev = false;
			return prev;
		});
	}
	function changeHour(hour: number) {
		timeFocus = true;
		dateFocus = false;
		let changeHour = parseInt(currentHour) + hour;
		if (changeHour < 0) changeHour = 24;
		if (changeHour > 24) changeHour = 0;
		currentHour = changeHour < 10 ? '0' + changeHour.toString() : changeHour.toString();
	}
	function changeMinute(minute: number) {
		timeFocus = true;
		dateFocus = false;
		let changeMinute = parseInt(currentMinute) + minute;
		if (changeMinute < 0) changeMinute = 59;
		if (changeMinute > 59) changeMinute = 0;
		currentMinute = changeMinute < 10 ? '0' + changeMinute.toString() : changeMinute.toString();
	}
	function changePeriod(periodIdx: number) {
		timeFocus = true;
		dateFocus = false;
		let changePeriodIdx = currentTimePeriod + periodIdx;
		if (changePeriodIdx >= period.length) changePeriodIdx = 0;
		if (changePeriodIdx < 0) changePeriodIdx = 1;
		currentTimePeriod = changePeriodIdx;
	}
	function changeDate(isChangeDate: boolean) {
		if (!isChangeDate) {
			timeFocus = false;
			dateFocus = true;
			isSaveDate = false;
		} else {
			dateFocus = false;
			isSaveDate = true;
		}
	}
	function makeDays() {
		if (!choiceMonth) {
			return;
		}
		maxDay = Array.from({ length: calendar[choiceMonth] }, (_, idx) => idx + 1);
		choiceDay = 1;
	}
	function saveDate() {
		if (!isSaveDate) return;
		handleReservationInfo.update((prev) => {
			prev.reservedDate = fullDate;
			return prev;
		});
		console.log(get(handleReservationInfo));
		handlePopUp.update((prev) => (prev = false));
	}
</script>

<div class="popUp">
	<div class="showDateContainer">
		<div class="timeContainer">
			<img src={timeIcon} alt="" />
			<p class="showInputContainer time {timeFocus ? 'on' : 'off'}">
				<span>{currentHour}</span>
				:
				<span>{currentMinute}</span>
				<span>{period[currentTimePeriod]}</span>
			</p>
		</div>
		<div class="dayContainer">
			<img src={dateIcon} alt="date icon" />
			{#if dateFocus}
				<form on:submit={() => changeDate(true)} class="showInputContainer inputDayContainer">
					<select bind:value={choiceMonth} class="inputMonth" on:change={makeDays}>
						{#each Object.entries(calendar) as [month]}
							<option value={month}>{month}</option>
						{/each}
					</select>
					<select bind:value={choiceDay} class="inputDay">
						{#each maxDay as day}
							<option value={day}>{day}</option>
						{/each}
					</select>
					<input class="saveDateBtn" type="submit" value="✓" />
				</form>
			{:else}
				<p
					class="showInputContainer date {dateFocus ? 'on' : 'off'}"
					on:click={() => changeDate(false)}
				>
					{choiceMonth}
					{choiceDay}
					{#if !isSaveDate}
						<pre class="warnMessage">날짜를 변경해주세요</pre>
					{/if}
				</p>
			{/if}
		</div>
	</div>

	<div class="controlDateContainer">
		<div class="eachControlContainer">
			<img src={upArrowIcon} alt="" on:click={() => changeHour(1)} />
			<p class="controlDateText">
				{currentHour}
			</p>
			<img src={downArrowIcon} alt="" on:click={() => changeHour(-1)} />
		</div>
		<p class="colonText">:</p>
		<div class="eachControlContainer">
			<img src={upArrowIcon} alt="" on:click={() => changeMinute(1)} />
			<p class="controlDateText">{currentMinute}</p>
			<img src={downArrowIcon} alt="" on:click={() => changeMinute(-1)} />
		</div>
		<div class="eachControlContainer">
			<img class="upIcon" src={upArrowIcon} alt="" on:click={() => changePeriod(1)} />
			<p>{period[currentTimePeriod]}</p>
			<img class="downIcon" src={downArrowIcon} alt="" on:click={() => changePeriod(-1)} />
		</div>
	</div>
	<div class="btnContainer">
		<button class="deleteButton" on:click|preventDefault={closePopUp}>
			<img src={deleteIcon} alt="" />
		</button>
		<button class="addButton" on:click={saveDate}> Save </button>
	</div>
</div>

<style>
	.popUp {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #f3f3f3;
		width: 350px;
		padding: 15px;
		z-index: 50;
		border-radius: 5px;
	}

	.showDateContainer {
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.timeContainer {
		display: flex;
		width: 100%;
	}

	.showInputContainer {
		width: 100%;
		margin-left: 10px;
		padding: 13px 15px;
		border-radius: 3px;
	}
	.showInputContainer.time.on {
		border: 2px solid rgb(255, 104, 71);
	}
	.showInputContainer.time.off {
		border: 1px solid gray;
	}

	.showInputContainer.date.off {
		border: 1px solid gray;
	}

	.dayContainer {
		display: flex;
		width: 100%;
		position: relative;
	}
	.inputDayContainer {
		border: 2px solid rgb(255, 104, 71);
	}
	.inputMonth,
	.inputDay {
		border: none;
		background-color: transparent;
		outline: none;
		font-size: 18px;
		margin-right: 5px;
	}
	.saveDateBtn {
		border: 2px solid rgb(255, 104, 71);
		color: rgb(255, 104, 71);
		text-align: center;
		padding: 3px 8px;
		border-radius: 50%;
		outline: none;
	}
	.warnMessage {
		position: absolute;
		background-color: #eee;
		right: 20px;
		top: 20px;
	}

	.controlDateContainer {
		display: flex;
		justify-content: center;
		gap: 30px;
		margin-bottom: 14px;
	}
	.colonText {
		display: flex;
		align-items: center;
	}
	.eachControlContainer {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.controlDateText {
		font-size: 24px;
	}
	.btnContainer {
		display: flex;
		gap: 18px;
	}
	.deleteButton {
		border: none;
		border-radius: 5px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 7px 14px;
		box-shadow: 1px 1px 3px 1px rgba(66, 66, 66, 0.35);
	}
	.addButton {
		border: none;
		width: 100%;
		border-radius: 5px;
		background-color: rgb(229, 92, 61);
		color: white;
		box-shadow: 1px 1px 3px 1px rgba(66, 66, 66, 0.35);
	}
</style>
