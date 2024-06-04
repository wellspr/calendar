function fullStringDate(date) {
    return `
        ${date.getDate()} de 
        ${months[date.getMonth()]} de 
        ${date.getFullYear()} - 
        ${weekdays[date.getDay()]}`
};

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

        if (day === currentDate.getDate()) {
            dayCells[i].classList.add("current-day");
        }
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

/* https://www.mathsisfun.com/leap-years.html */
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

