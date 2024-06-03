const todayDateContainer = document.getElementById("today");
const currentDateContainer = document.getElementById("currentDate");
const currentMonthContainer = document.getElementById("currentMonth");
const currentMonthSelectContainer = document.getElementById("currentMonthSelect");
const currentYearContainer = document.getElementById("currentYear");
const currentYearInputContainer = document.getElementById("currentYearInput");
const calendarHeader = document.getElementById("calendar-header");
const calendarBody = document.getElementById("calendar-body");

const monthDown = document.getElementById("month-down");
const monthUp = document.getElementById("month-up");
const yearDown = document.getElementById("year-down");
const yearUp = document.getElementById("year-up");

const getCurrentDay = () => {
    const date = new Date();
    return date.getDate();
};

const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
];

weekdays.forEach((weekday) => {
    const calendarWeekday = document.createElement("div");
    calendarWeekday.classList.add("weekday-cell");
    calendarWeekday.innerText = weekday;
    calendarHeader.appendChild(calendarWeekday);
});

const fullStringDate = (date) => `
    ${date.getDate()} de 
    ${months[date.getMonth()]}, 
    ${date.getFullYear()} - 
    ${weekdays[date.getDay()]}
`;

setInterval(() => {
    const date = new Date();
    todayDateContainer.innerHTML = `${fullStringDate(date)}, ${date.toTimeString()}`;
}, 1000);

const today = new Date();
let day = today.getDate();
let month = today.getMonth();
let year = today.getFullYear();

document.getElementById("reset-button").addEventListener("click", () => {
    const today = new Date();
    day = today.getDate();
    month = today.getMonth();
    year = today.getFullYear();
    update();
});

yearUp.addEventListener("click", () => {
    year += 1;
    update();
});

yearDown.addEventListener("click", () => {
    year -= 1;
    update();
});

monthUp.addEventListener("click", () => {
    if (month < 11) {
        month += 1;
    } else {
        month = 0;
        year += 1;
    }
    update();
});

monthDown.addEventListener("click", () => {
    if (month > 0) {
        month -= 1;
    } else {
        month = 11;
        year -= 1;
    }
    update();
});



currentMonthContainer.addEventListener("click", (e) => {
    currentMonthContainer.classList.add("hidden");
    currentMonthSelectContainer.classList.remove("hidden");
    currentMonthSelectContainer.value = months[month];
    currentMonthSelectContainer.focus();

    const currentMonth = month;

    currentMonthSelectContainer.innerHTML = "";

    months.forEach(month => {
        const option = document.createElement("option");
        option.value = month;
        option.label = month;

        if (month === months[currentMonth]) {
            option.selected = true;
        }

        currentMonthSelectContainer.appendChild(option);
    });
});

function resetSelect() {
    currentMonthContainer.classList.remove("hidden");
    currentMonthSelectContainer.classList.add("hidden");
}

currentMonthSelectContainer.addEventListener("blur", () => {
    resetSelect();
});

currentMonthSelectContainer.addEventListener("change", (e) => {
    console.log(currentMonthSelectContainer.value);
    month = months.indexOf(currentMonthSelectContainer.value);
    console.log(month);
    update();
});



currentYearContainer.addEventListener("click", (e) => {
    currentYearContainer.classList.add("hidden");
    currentYearInputContainer.classList.remove("hidden");
    currentYearInputContainer.value = year;
    currentYearInputContainer.focus();
});

function resetInput() {
    currentYearContainer.classList.remove("hidden");
    currentYearInputContainer.classList.add("hidden");
}

currentYearInputContainer.addEventListener("blur", () => {
    resetInput();
});

currentYearInputContainer.addEventListener("change", (e) => {
    console.log(currentYearInputContainer.value);
    year = Number(currentYearInputContainer.value);
    update();
});

currentYearInputContainer.addEventListener("keydown", (e) => {
    console.log(currentYearInputContainer.value);
    year = Number(currentYearInputContainer.value);
    update();
});



document.addEventListener("keydown", e => {
    if (e.key === "Escape" || e.key === "Enter") {
        if (!currentYearInputContainer.classList.contains("hidden")) {
            console.log("resetInput")
            resetInput();
        }
        if (!currentMonthSelectContainer.classList.contains("hidden")) {
            console.log("resetSelect");
            resetSelect();
        }
    }
});

update();

function update() {
    let dateShown = `${month + 1}/${day}/${year}`;
    drawCurrentMonth(dateShown);
}

function drawCurrentMonth(date) {
    const currentDate = new Date(date);

    currentMonthContainer.innerHTML = months[currentDate.getMonth()];
    currentYearContainer.innerHTML = currentDate.getFullYear();

    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const firstWeekday = new Date(`${currentMonth + 1}/01/${currentYear}`).getDay();

    const februarySpan = (currentYear) => {
        return isLeapYear(currentYear) ? 29 : 28;
    };

    const monthSpan = [31, februarySpan(currentYear), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    let day = 0;
    const calendarSpan = firstWeekday + monthSpan[currentMonth];

    generateCells(calendarSpan);

    const dayCells = document.querySelectorAll(".day-cell");

    for (let i = firstWeekday; i < calendarSpan; i++) {
        day++;
        dayCells[i].innerText = day;
    };
}

function generateCells(calendarSpan) {

    if (calendarBody.hasChildNodes()) {
        calendarBody.innerHTML = "";
    }

    const generatedCells = calendarSpan % 7 === 0 ?
        calendarSpan :
        Math.ceil(calendarSpan / 7) * 7;

    for (let i = 0; i < generatedCells; i++) {
        const calendarCell = document.createElement("div");
        calendarCell.classList.add("day-cell");
        calendarBody.appendChild(calendarCell);
    };
}

function isLeapYear(currentYear) {
    let isLeap = false;

    if (currentYear % 4 === 0) {
        isLeap = true;

        if (currentYear % 100 === 0) {
            isLeap = false;

            if (currentYear % 400 === 0) {
                isLeap = true;
            }
        }
    }

    return isLeap;
}




