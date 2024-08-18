/* eslint-disable no-unused-vars */

// imports
import { CurrencyDollarIcon } from "@heroicons/react/24/solid"
import { Form } from "react-router-dom"

//react imports
import { useRef } from "react"

//rrd imports
import { useFetcher } from "react-router-dom"
import { useEffect } from "react"

const AddBudgetForm = () => {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting"

    const formRef = useRef();
    const focusRef = useRef();

    useEffect(() => {
        if(!isSubmitting) {
            formRef.current.reset()
            focusRef.current.focus()
        }
    }, [isSubmitting])
    return (
        <div className="form-wrapper">
            <h2 className="h3">
                Create Budget
            </h2>
            <fetcher.Form
                method="post"
                className="grid-sm"
                ref={formRef}
            >
               <div className="grid-xs">
                    <label htmlFor="newBudget">Budget Name</label>
                    <input 
                        type="text"
                        name="newBudget" 
                        id="newBudget"
                        placeholder="e.g., Food"
                        required
                        ref={focusRef}
                    />
               </div>
               <div className="grid-xs">
                    <label htmlFor="newBudgetAmount">Amount</label>
                    <input
                        type="number"
                        step="0.01"
                        name="newBudgetAmount"
                        id="newBudgetAmount"
                        placeholder="e.g., $100"
                        required
                        inputMode="decimal"
                    />
               </div>
               <input type="hidden" name="_action" value="createBudget" />
               <button type="submit" className="btn btn--light"
                disabled={isSubmitting}>
                    {
                        isSubmitting ? <span>Submitting budget</span> 
                        : (
                            <>
                            <span>Create budget</span> 
                            <CurrencyDollarIcon width={20} />
                            </>
                        )
                    }

                </button>
            </fetcher.Form>
        </div>
    )
}
export default AddBudgetForm