// rrd imports
import { Link, useLoaderData } from "react-router-dom";

// library imports
import { toast } from "react-toastify";

// components
import Intro from "../components/intro";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

// helper functions
import {createBudget, createExpense, deleteItem, fetchData, waait, calculateTotalSpendings, formatCurrency, getBudget, calculateSpentByBudget} from "../helpers"


// loader
export function dashboardLoader() {
    const userName = fetchData("userName");
    const budgets = fetchData("budgets")
    const expenses = fetchData("expenses")
    return { userName, budgets, expenses }
}

// action
export async function dashboardAction({request}){
   await waait();
   
    // get FormData from request body
    const data = await request.formData();
    const {_action, ...values } = Object.fromEntries(data);
    console.log(_action)

    // new user submission
    if (_action == "newUser") {
        try {
            // save userName to session storage
            localStorage.setItem("userName", JSON.stringify(values.userName));
            // return toast success message
            return toast.success('Welcome to Budget Buddy, ' + values.userName + '! ヽ(´▽`)/');
        } 
        catch (error) {
            throw new Error("There was a problem creating your account. Please try again later. щ（ﾟДﾟщ）");  
        }
    }

    if (_action == "createBudget") {
        try {
            // create budget
            createBudget({
                name: values.newBudget,
                amount: values.newBudgetAmount
            })
            return toast.success("Budget created!");
        } 
        catch (error) {
            throw new Error("There was a problem creating your budget. Please try again. щ（ﾟДﾟщ）");  
        }
    }

    if (_action === "createExpense") {
        try {
        //create expense 
        createExpense({
            name: values.newExpense,
            amount: values.newExpenseAmount,
            budgetId: values.newExpenseBudget
        })
        if (calculateSpentByBudget(values.newExpenseBudget) > getBudget(values.newExpenseBudget)) {
            toast.success(`"You have gone over budget!"`)
        }
        return toast.success(`"Expense 
            ${values.newExpense} created!"`)
        } catch (e) {
            throw new Error("There was a problem creating your expense.")
        }
    }

    if (_action === "deleteExpense") {
        try {
        // delete expense
        deleteItem ({
            key: "expenses",
            id: values.expenseId,
        });
        return toast.success("Expense deleted!")
        } catch (e) {
            throw new Error("There was a problem deleting your expense D:");
        }
    }
}

const Dashboard = () => {
    const { userName, budgets, expenses } = useLoaderData()
    const totalSpendings = calculateTotalSpendings()

    return (
        <>
            {userName ? (
            <div className="dashboard">
                <h1> Welcome, <span style= {{color: "#D757A8"}}>{userName}</span></h1>
                <div className="grid-sm">
                    {
                        budgets && budgets.length > 0
                        ? (
                            <div className="grid-lg">
                                <div className="flex-lg">
                                    <AddBudgetForm />
                                    <AddExpenseForm budgets={budgets} />
                                </div>
                                <h2>Existing Budgets</h2>
                                <div className="budgets">
                                    {
                                        budgets.map((budget) => {
                                            return (<BudgetItem key={budget.id} budget={budget} />)
                                        })
                                    }
                                </div>
                                {
                                    expenses && expenses.length > 0 && (
                                        <div className="grid-md"> 
                                            <h2>Recent Expenses</h2>
                                            <Table expenses={expenses
                                            .sort((a, b) => b.createdAt - a.createdAt
                                            ).slice(0, 8)
                                            }/>
                                            {expenses.length > 8 && (
                                                <Link
                                                to="expenses"
                                                className="btn btn--light"
                                                >
                                                View all expenses</Link>
                                            )}
                                            <br></br>
                                            <h3>Total Expenses: {" " + formatCurrency(totalSpendings)}</h3>
                                        </div>
                                    )
                                }
                            </div>
                        )
                        : (
                            <div className="grid-sm">
                                <p>Personal budgeting is the secret to financial freedom.</p>
                                <p>Create a budget to get started!</p>
                                <AddBudgetForm />
                            </div>
                        )
                    }
                </div>
            </div>
            ) : <Intro />}
        </>
    )
}
export default Dashboard