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

weekdays.forEach((weekday) => {
    const calendarWeekday = document.createElement("div");
    calendarWeekday.classList.add("weekday-cell");
    calendarWeekday.innerText = weekday;
    calendarHeader.appendChild(calendarWeekday);
});

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
    month = months.indexOf(currentMonthSelectContainer.value);
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
    year = Number(currentYearInputContainer.value);
    update();
});

currentYearInputContainer.addEventListener("keydown", (e) => {
    year = Number(currentYearInputContainer.value);
    update();
});


document.addEventListener("keydown", e => {
    if (e.key === "Escape" || e.key === "Enter") {
        if (!currentYearInputContainer.classList.contains("hidden")) {
            resetInput();
        }
        if (!currentMonthSelectContainer.classList.contains("hidden")) {
            resetSelect();
        }
    }
});

update();

