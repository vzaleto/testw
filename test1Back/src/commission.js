function getCashIn(amount) {
    const commission = amount * 0.0003;
    return Math.min(commission, 5);
}

function getCashOut(amount, userType, weeklyTotal) {
    if (userType === "natural") {
        const freeLimit = 1000;
        let commissionAmount = 0;

        if (weeklyTotal > freeLimit) {
            if (weeklyTotal - amount >= freeLimit) {
                commissionAmount = amount;
            } else {
                commissionAmount = amount - (freeLimit - (weeklyTotal - amount));
            }
            return Math.ceil(commissionAmount * 0.003 * 100) / 100;
        }
        return 0;
    } else if (userType === "juridical") {
        const commission = amount * 0.003;
        return Math.max(commission, 0.5);
    }
    return 0;
}

module.exports = { getCashIn, getCashOut };
