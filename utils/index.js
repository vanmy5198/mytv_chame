// Month here is 1-indexed (January is 1, February is 2, etc). This is
// because we're using 0 as the day so that it returns the last day
// of the last month, so you have to add 1 to the month number 
// so it returns the correct amount of days
export function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}

