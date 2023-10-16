<script lang="ts">
	import etcIcon from '../lib/images/icons/edit.svg';
	import calendarIcon from '../lib/images/icons/event_available.svg';
	import groupIcon from '../lib/images/icons/group.svg';
	import phoneIcon from '../lib/images/icons/phone.svg';
	import deleteBtn from '../lib/images/icons/trash.svg';
	import { handleReservationData, type ReservedData } from '../store';

	let reservedData: ReservedData[] = [];

	handleReservationData.subscribe((value) => {
		reservedData = value;
		return;
	});
</script>

<section class="listSection">
	<ul class="listContainer">
		{#if reservedData.length}
			{#each reservedData as reservData}
				<li class="itemContainer">
					<div>
						<div class="titleContainer">
							<p class="userNameContainer">
								{reservData.name}
							</p>
							<p class="phoneContainer"><img src={phoneIcon} alt="" /> {reservData.phone}</p>
						</div>
						<p class="dayContainer">
							<img src={calendarIcon} alt="" />Today {reservData.reservedDate}
						</p>
						<p class="groupContainer"><img src={groupIcon} alt="" />{reservData.people}</p>
						<p class="tableContainer">
							{#if reservData.reservedTable.length}
								Reserved Table: <b>{reservData.reservedTable}</b> · Floor 1
							{:else}
								No Selected Table
							{/if}
						</p>
						<p class="etcContainer">
							{#if reservData.etc.length}
								{reservData.etc} <img src={etcIcon} alt="" />
							{/if}
						</p>
					</div>
					<div class="btnContainer">
						<button class="deleteBtn"><img src={deleteBtn} alt="" /></button>
						<button class="reserveBtn">Seated</button>
					</div>
				</li>
			{/each}
		{:else}
			<h1>No Reservation!!</h1>
		{/if}
	</ul>
</section>

<style>
	ul,
	li {
		list-style: none;
		padding: 0;
	}
	.listSection {
		min-height: 500px;
	}

	.listContainer {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 15px;
		padding: 20px;
	}

	.listContainer h1 {
		grid-column: 2;
	}
	.itemContainer {
		display: flex;
		flex-direction: column;
		flex-basis: 240px;
		background-color: rgb(255, 255, 255);
		padding: 14px 20px;
		border-radius: 12px;
		box-shadow: 1px 1px 8px 1px rgba(66, 66, 66, 0.35);
	}

	.titleContainer {
		display: flex;
		align-items: center;
	}
	.userNameContainer {
		font-weight: bold;

		margin-right: 24px;
	}
	.phoneContainer {
		background-color: rgb(244, 244, 241);
		color: rgb(179, 167, 163);
		padding: 10px 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 20px;
		box-shadow: 1px 1px 8px 1px rgba(66, 66, 66, 0.35);
	}
	.dayContainer {
		display: flex;
		margin: 0;
	}
	.dayContainer img {
		margin-right: 5px;
	}
	.groupContainer {
		display: flex;
		align-items: center;
	}
	.groupContainer img {
		margin-right: 5px;
	}
	.tableContainer {
		color: rgb(151, 145, 140);
	}
	.tableContainer b {
		color: black;
	}
	.etcContainer {
		display: flex;
		align-items: center;
	}
	.etcContainer img {
		margin-left: 5px;
	}
	.btnContainer {
		display: flex;
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
