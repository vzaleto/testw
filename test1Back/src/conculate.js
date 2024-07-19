const { getCashIn, getCashOut } = require("./commission");

function calculateCommission(operations) {
    const cashOut = {};

    return operations.map((operation) => {
        const { user_id, user_type, type, operation: opDetails } = operation;

        let commission = 0;

        if (type === "cash_in") {
            commission = getCashIn(opDetails.amount);
        } else if (type === "cash_out") {
            if (user_type === "natural") {
                if (!cashOut[user_id]) {
                    cashOut[user_id] = {};
                }

                const weekNumber = getWeekNumber(operation.date);  // 29

                if (!cashOut[user_id][weekNumber]) {
                    cashOut[user_id][weekNumber] = 0;
                }

                

                cashOut[user_id][weekNumber] += opDetails.amount;

                commission = getCashOut(
                    opDetails.amount,
                    "natural",
                    cashOut[user_id][weekNumber]
                );
            } else if (user_type === "juridical") {
                commission = getCashOut(opDetails.amount, "juridical", null);
            }
        }

        return commission.toFixed(2);
    });
}

function getWeekNumber(date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    const week = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    return week;
}

module.exports = { calculateCommission, getWeekNumber };
