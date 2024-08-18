// rrd imports
import { redirect } from "react-router-dom";

// library
import { toast } from "react-toastify";

// helpers
import { deleteItem } from "../helpers";


export async function logoutAction() {
    // delete the user
    deleteItem({
        key: "userName"
    })
    deleteItem({
        key: "budgets"
    })
    deleteItem({
        key: "expenses"
    })

    toast.success("You've deleted your account! Boooooo! ヽ༼ ಠ益ಠ ༽ﾉ")

    // return redirect
    return redirect("/")
}