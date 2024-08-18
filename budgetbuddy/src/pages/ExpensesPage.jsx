// rrd imports
import { useLoaderData } from "react-router-dom";

// library import
import { toast } from "react-toastify";

// component imports
import Table from "../components/Table";

// helper functions
import { calculateTotalSpendings, deleteItem, fetchData, formatCurrency } from "../helpers";

export async function expensesLoader() {
    const expenses = fetchData("expenses");
    return { expenses }
}

// action
export async function expensesAction({ request }) {
    const data = await request.formData();
    const {_action, ...values } = Object.fromEntries(data);

    if (_action === "deleteExpense") {
        try {
        // delete expense
        deleteItem ({
            key: "expenses",
            id: values.expenseId,
        });
        return toast.success("Expense deleted!")
        } catch (e) {
            throw new Error("There was a problem deleting your expense.")
        }
    }
}

const ExpensesPage = () => {
    const totalSpendings = calculateTotalSpendings()
    const { expenses } = useLoaderData();
    return (
        <div className="grid-lg">
            <h1>All Expenses</h1>
            {
                expenses && expenses.length > 0 ? (
                    <div className="grid-md">
                        <h2>Recent Expenses <small>({expenses.length} total)</small></h2>
                        <Table expenses={expenses} />
                        <h3>Total Expenses: {" " + formatCurrency(totalSpendings)}</h3>
                    </div>
                ) : (
                    <p>No expenses found.</p>
                )
            }
        </div>
    )
};

export default ExpensesPage;