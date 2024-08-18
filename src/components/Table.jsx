/* eslint-disable react/prop-types */

//component import
import ExpenseItem from "./ExpenseItem"

const Table = ({ expenses, showBudget = true }) => {
    // Make headers Dark Pink
    const headerStyle = {
        backgroundColor: "#D757A8",
    }

    return (
        <div className="table">
            <table>
                <thead>
                    <tr>
                        {
                            ["Name", "Amount", "Date", showBudget ? "Budget" : "", ""].map((i,
                                index) => (
                                    <th key={index} style={headerStyle}>{i}</th>
                                ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                       expenses.map((expense) => (
                        <tr key={expense.id}>
                            <ExpenseItem expense={expense} showBudget={showBudget} />
                        </tr>
                       )) 
                    }
                </tbody>
            </table>
        </div>
    )
}
export default Table