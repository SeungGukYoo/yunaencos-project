<script lang="ts">
	import timeIcon from '$lib/images/icons/alarm_on.svg';
	import downArrowIcon from '$lib/images/icons/chevron-down.svg';
	import upArrowIcon from '$lib/images/icons/chevron-up.svg';
	import dateIcon from '$lib/images/icons/today.svg';
	import deleteIcon from '$lib/images/icons/trash.svg';
	
	let isPopUp = 'off';
	$: popUpState = 'off';
</script>

<div class="popUp {popUpState}">
	<div class="showDateContainer">
		<div class="timeContainer">
			<img src={timeIcon} alt="" />
			<p class="showInputContainer">2:00 PM</p>
		</div>
		<div class="dayContainer">
			<img src={dateIcon} alt="" />
			<p class="showInputContainer">May 10</p>
		</div>
	</div>

	<div class="controlDateContainer">
		<div class="eachControlContainer">
			<img src={upArrowIcon} alt="" />
			<p class="controlDateText">02</p>
			<img src={downArrowIcon} alt="" />
		</div>
		<p class="colonText">:</p>
		<div class="eachControlContainer">
			<img src={upArrowIcon} alt="" />
			<p class="controlDateText">00</p>
			<img src={downArrowIcon} alt="" />
		</div>
		<div class="eachControlContainer">
			<img class="upIcon" src={upArrowIcon} alt="" />
			<p class="aa">PM</p>
			<img class="downIcon" src={downArrowIcon} alt="" />
		</div>
	</div>
	<div class="btnContainer">
		<button class="deleteButton" on:click|preventDefault={closePopUp}>
			<img src={deleteIcon} alt="" />
		</button>
		<button class="addButton"> Save </button>
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

	.popUp.on {
		display: block;
	}
	.popUp.off {
		display: none;
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
		border: 1px solid gray;
		padding: 13px 15px;
		border-radius: 3px;
	}

	.dayContainer {
		display: flex;
		width: 100%;
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
