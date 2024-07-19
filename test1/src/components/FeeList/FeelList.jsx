import React, { useState } from "react";
import axios from "axios";

function FeelList() {
    const [date, setDate] = useState("");
    const [userId, setUserId] = useState("");
    const [userType, setUserType] = useState("natural");
    const [operationType, setOperationType] = useState("cash_in");
    const [amount, setAmount] = useState("");
    const [currency, setCurrency] = useState("EUR");
    const [results, setResults] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const operation = {
                date,
                user_id: parseInt(userId),
                user_type: userType,
                type: operationType,
                operation: {
                    amount: parseFloat(amount),
                    currency
                }
            };

            const response = await axios.post("http://localhost:3001/calculate", {
                operations: [operation],
            });
            setResults(response.data);
            console.log(results)
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Date:
                    <input type="text" value={date} onChange={(e) => setDate(e.target.value)} />
                </label>
                <br />
                <label>
                    User ID:
                    <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
                </label>
                <br />
                <label>
                    User Type:
                    <select value={userType} onChange={(e) => setUserType(e.target.value)}>
                        <option value="natural">natural</option>
                        <option value="juridical">juridical</option>
                    </select>
                </label>
                <br />
                <label>
                    Operation Type:
                    <select value={operationType} onChange={(e) => setOperationType(e.target.value)}>
                        <option value="cash_in">cash_in</option>
                        <option value="cash_out">cash_out</option>
                    </select>
                </label>
                <br />
                <label>
                    Amount:
                    <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </label>
                <br />
                <label>
                    Currency:
                    <input type="text" value={currency} onChange={(e) => setCurrency(e.target.value)} />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
            <ul>
                {results.map((result, index) => (
                    <li key={index}>{result}</li>
                ))}
            </ul>
        </div>
    );
}

export default FeelList;
