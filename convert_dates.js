function excelDateToJSDate(serial) {
    var utc_days = Math.floor(serial - 25569);
    var utc_value = utc_days * 86400;
    var date_info = new Date(utc_value * 1000);
    return date_info.toISOString().split('T')[0];
}

const serials = [
    45903, 45919, // Hope Ladder I
    45917,        // Hope Ladder II (end)
    45737, 45750, // Pres Sci Grad
    45755,        // Pres Sci Undergrad (end)
    45742, 45763, // Humanities/Arts
    45974,        // National Excel (end)
    45901, 45989  // Master Excel
];

serials.forEach(s => {
    console.log(`${s} -> ${excelDateToJSDate(s)}`);
});
