const formattedDate = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString('default', { month: 'long' });
    const year = today.getFullYear();

    return `${day} ${month} ${year}`;
};

const generateRandomSixDigitNumber = () => {
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    return randomNumber;
};

const getAvailableSeatsByType = (hallData, seatTypes) => {
    const availableSeatsByType = {};
    hallData.seatLayout.forEach((row, rowIndex) => {
        row.forEach((seat, seatIndex) => {
            if (!seat.occupied) {
                const seatType = seatTypes[seat.type];
                availableSeatsByType[seatType] = availableSeatsByType[seatType] || [];
                availableSeatsByType[seatType].push({ rowIndex, seatIndex });
            }
        });
    });
    return availableSeatsByType;
};

const selectSeats = (seatTypes, seatAmounts, availableSeatsByType) => {
    const totalSeatsNeeded = seatAmounts.reduce((acc, amount) => acc + amount, 0);
    const selectedSeats = [];

    for (let i = 0; i < totalSeatsNeeded; i++) {
        let selectedSeat = null;

        for (let typeIndex = 0; typeIndex < seatTypes.length; typeIndex++) {
            const seatType = seatTypes[typeIndex];
            const maxAllowedSeats = seatAmounts[typeIndex];
            const selectedSeatsOfType = selectedSeats.filter(({ seatType }) => seatType === typeIndex);

            if (selectedSeatsOfType.length < maxAllowedSeats) {
                const availableSeatsOfType = availableSeatsByType[seatType];
                if (availableSeatsOfType?.length > 0) {
                    const randomAvailableSeatIndex = Math.floor(Math.random() * availableSeatsOfType.length);
                    selectedSeat = availableSeatsOfType.splice(randomAvailableSeatIndex, 1)[0];
                    selectedSeats.push({ ...selectedSeat, seatType: typeIndex });
                    break;
                }
            }
        }

        if (selectedSeat === null) {
            selectedSeats.forEach(({ rowIndex, seatIndex, seatType }) => {
                availableSeatsByType[seatTypes[seatType]].push({ rowIndex, seatIndex });
            });
            selectedSeats.length = 0;
            i = -1;
        }
    }

    return selectedSeats;
};

export { formattedDate, generateRandomSixDigitNumber, getAvailableSeatsByType, selectSeats };