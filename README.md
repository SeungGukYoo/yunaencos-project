# JustQ 프론트엔드 사전 과제

## 1. 지원자

| 사진                                                                                                                        | 정보                                                                                                               |
| --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| <img src="https://github.com/SeungGukYoo/justQ-project/assets/119836116/1a34fe0b-3072-482a-ae31-2f48cc6954c0" height="140"> | 이름: 유승국<br />개인 블로그: https://9uk-e.tistory.com/<br />깃 주소: https://github.com/SeungGukYoo/SeungGukYoo |

## 2. 디렉토리 구조

```bash
src
├── src/app.d.ts
├── src/app.html
├── src/components
│   ├── src/components/Form.svelte
│   ├── src/components/List.svelte
│   ├── src/components/Popup.svelte
│   ├── src/components/TableList.svelte
│   └── src/components/Title.svelte
├── src/lib
│   └── src/lib/images
│       ├── src/lib/images/github.svg
│       └── src/lib/images/icons
├── src/routes
│   ├── src/routes/+layout.svelte
│   ├── src/routes/+page.svelte
│   ├── src/routes/+page.ts
│   ├── src/routes/editReservation
│   │   └── src/routes/editReservation/[editTable]
│   │       ├── src/routes/editReservation/[editTable]/+layout.svelte
│   │       ├── src/routes/editReservation/[editTable]/+page.svelte
│   │       └── src/routes/editReservation/[editTable]/+page.ts
│   ├── src/routes/reservation
│   │   ├── src/routes/reservation/+layout.svelte
│   │   └── src/routes/reservation/+page.svelte
│   └── src/routes/styles.css
├── src/store.ts
└── src/util
    ├── src/util/popUpClient.ts
    └── src/util/reservationClient.ts
```

## 3. 개발 환경

| 환경       | 목적      | 사용한 환경                |
| ---------- | --------- | -------------------------- |
| 프레임워크 | SvelteKit | `npm create svelte@latest` |

## 4. 구현 영상

- 예약 추가

  ![ezgif com-video-to-gif (5)](https://github.com/SeungGukYoo/yunaencos-project/assets/119836116/48c51560-108c-40eb-8b08-115848210e99)

- 예약 수정

  ![ezgif com-video-to-gif (8)](https://github.com/SeungGukYoo/yunaencos-project/assets/119836116/e2c51c7d-c87e-43f5-bd08-c5c2c4c4b645)

- 예약 삭제

  ![ezgif com-video-to-gif (7)](https://github.com/SeungGukYoo/yunaencos-project/assets/119836116/bb03806f-04e0-41a8-bbb2-fe4928688cb3)

- 기본 정보(이름, 핸드폰 번호, 예약 날짜, 인원)를 입력하지 않았을 경우

  <img width="541" alt="스크린샷 2023-10-17 오후 7 41 25" src="https://github.com/SeungGukYoo/yunaencos-project/assets/119836116/4589980e-66f5-4ac2-8312-78535106fa31">

## 5. 배포 링크

배포 링크 : [Vercel 바로가기](https://manage-reservation.vercel.app/)

## 6. 로컬 환경에서 시작하기

```bash
git clone https://github.com/SeungGukYoo/yunaencos-project.git

cd yunaencos-project

npm i && npm run dev
```

## 7. 기능 구현

Svlete와 SvelteKit을 사용해본 경험이 없기 때문에 Svelte와 SvelteKit 문서를 바탕으로 요구사항을 분석하여 기능 구현을 했습니다.

### 7-1 구현 기능

1. 예약 추가
   - `new Reservation`버튼을 누르면 예약 페이지로 넘어가 예약을 추가할 수 있는 Form이 나오게 된다.
   - `Selected Date`버튼과 `Selected Table`의 아이콘을 클릭하면 날짜, 시간을 선택할 수 있는 팝업과 테이블을 선택할 수 있는 팝업이 나오게 된다.
   - 날짜를 선택할 수 있는 팝업에는 시간과 월/일을 선택할 수 있는 옵션이 있다.
   - 저장 버튼을 누르면 입력된 값을 바탕으로 값이 저장되고, 홈페이지에서는 저장된 값을 바탕으로 정렬해서 보여준다.
   - 기본 정보(이름, 핸드폰 번호, 인원, 날짜)를 작성하지 않으면 에러 반환
2. 예약 종료 및 예약 삭제
   - `Seated` 버튼을 클릭하게 되면 예약이 종료된 것이라고 판단해 리스트에서 사라지게 된다.(실제로는 데이터에서는 사라지지 않게 된다.)
   - 쓰레기통 아이콘을 클릭하게 되면 예약이 취소된 것이라고 판단해 리스트에서 사라지게 된다.(실제 데이터 저장소에서 제거된다.)
3. 예약 수정 및 취소
   - 예약된 리스트를 클릭하면 수정할 수 있는 페이지로 이동하게 된다.
   - 예약된 리스트 페이지는 저장된 값이 기본으로 들어가져 있어야 한다.
   - 수정을 한 후에 저장 버튼을 누르면 수정된 값으로 바뀌게 된다.
   - 값을 수정하다가 뒤로가기, 쓰리게통 버튼을 클릭하면 수정한 값으로 바뀌지 않는다.

### 7.2 파일 구조

프로젝트를 시작하기 전에 요구사항과 구현 기능을 바탕으로 경로와 컴포넌트를 생각해보았으며 전역 상태를 도입하기로 하였습니다.

- 경로 구상

```
'/' 홈페이지

'/reservation' 예약 페이지

'/editReservation/[:editReservationNumber]' 예약 수정 페이지
```

- 컴포넌트 구상

```tsx
// 홈 화면
<Title/>
<ReservationList/>

// 예약 화면
<Title/>
<Reservation/>
<PopUp/> // 조건부 렌더링
<TableList/> // 조건부 렌더링

// 수정 페이지
<Title/>
<EditReservation/>
<PopUp/> // 조건부 렌더링
<TableList/> // 조건부 렌더링
```

### 7.3 과제 수행에 중점을 둔 부분

#### 중복 함수 관리

예약을 등록하는 기능과 예약을 수정하는 기능은 중복된 기능이지만 서로 다른 컴포넌트에서 관리하기 때문에 중복된 코드가 발생하게 됩니다. 그래서 이를 `Class`를 사용하여 예약과 관련된 작업을 모아두었습니다. 그로인해 로직은 모듈화가 되어 재사용하는 것이 가능해졌으며, 추상화로 인해 외부 컴포넌트와 클래스는 서로 다른 관심사를 보도록 해보았습니다.

```ts
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

export class ReservationData implements IReservationData {}
```

#### 데이터 전달 방법

컴포넌트간 데이터를 전달하기 위해서는 전역 상태를 통해 데이터 연동하던가 Prop을 통해 데이터를 연동시켜 관리했어야 했습니다.
<br>
예약 페이지에서 사용하는 현재 예약 정보의 경우에는 prop-drilling이 크게 문제가 되지 않고, 추가적인 초기화 작업을 하지 않아도 되기 때문에 prop을 통해 데이터를 전달하는 방식을 선택하였고, 콜백을 통해서 데이터를 수정하는 작업을 진행했습니다.
<br>
그리고 예약이 완료된 경우의 데이터는 전역으로 관리하여 서로 다른 라우팅간 데이터 전달을 용이하게 만들었습니다.

```svelte
<!-- +page.svelte, reservation -->
<script>
	function addTable(addTableNumber: number) {
		 <!-- logic -->
	}
</script>

<div>
	<Table {addTable}>
</div>
 <!-- Table.svelte -->
<script>
	export let addTable:(addTableNumber:number)=>void;
</script>

{#each allTable as table, idx}
  <li on:click={() => addTable(idx)}>{table}</li>
{/each}
```

#### 각 월(month)에 맞는 최대 일(day)

각 월에 따라 최대 일 수는 28,30,31로 서로 다르기 때문에 월에 맞는 최대 일수를 설정하는 작업을 구현했습니다.

```svelte
<script>
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
	 <!-- 초기 설정 월은 10월(Oct)임으로 인덱스의 길이가 30인 배열 생성 -->
	let maxDay = Array.from({ length: 30 }, (_, idx) => idx + 1);

	 <!-- 월을 클릭하게 되면 클릭한 월에 맞는 calender의 value값을 바탕으로 새로운 최대일 배열 생성 -->
	function makeDays() {
		if (!choiceMonth) {
			return;
		}
		maxDay = Array.from({ length: calendar[choiceMonth] }, (_, idx) => idx + 1);
		choiceDay = 1;
	}
</script>
```

#### 예약 리스트 화면에서의 이벤트 버블링

리스트 화면에서 카드(li태그)를 클릭하면 수정 페이지로, 버튼을 누르면 버튼에 맞는 작업이 발생하게 되는데 이벤트 버블링 현상으로 인해 버튼 클릭시 수정 페이지로 이동하는 현상이 발생해 `stopPropagation`을 사용하여 버블링되는 현상을 막았습니다.

```svelte
<li on:click|preventDefault|stopPropagation={() => moveEditPage(reservData.id)}>
	<div class="btnContainer">
		<button
			class="deleteBtn"
			on:click|preventDefault|stopPropagation={() => deleteReservation(reservData.id)}
		>
			<img src={deleteBtn} alt="" />
		</button>
		<button
			class="reserveBtn"
			on:click|preventDefault|stopPropagation={() => completedReservation(reservData.id)}
		>
			Seated
		</button>
	</div>
</li>
```

#### 다이나믹 라우팅을 통한 예약 수정 페이지 구현

예약 카드(li 태그)를 클릭하였을 때 클릭된 예약 정보가 담긴 예약 수정 페이지로 이동하기 위해서 다이나믹 라우팅 기능을 사용하였습니다.
<br>
`+page.ts`에서 예약 정보를 찾은 후에 있다면 예약 페이지에 값을 전달하고, 없다면 404에러를 반한하게 됩니다.

```ts
import { error } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { handleReservationData } from '../../../store.js';
export function load({ params }) {
	const totalTalbe = get(handleReservationData);
	const editTableId: number = parseInt(params.editTable);
	for (const tableIdx in totalTalbe) {
		if (totalTalbe[tableIdx].id === editTableId) {
			return totalTalbe[tableIdx];
		}
	}

	throw error(404, 'Not found');
}
```
