// rrd imports
import { Form, NavLink } from "react-router-dom"

// library
import { TrashIcon } from '@heroicons/react/24/solid'

// assets
import piggy_icon from "../assets/piggy_icon.svg"

const Nav = ( {userName} ) => {
    return (
        <nav>
            <NavLink
                to="/"
                aria-label="Go to home"
            >
            <img src={piggy_icon} alt="" height={30} />
            <span>BudgetBuddy</span>
            </NavLink>
            {
                userName && (
                    <Form
                        method="post"
                        action="/logout"
                        onSubmit={(event) => {
                            if (!confirm("Delete user and all data? (DON'T)")) {
                                event.preventDefault()
                            }
                        }}
                    >
                        <button type="submit" className="btn btn--warning">
                            {/* <span>Delete User</span> */}
                            <TrashIcon width={20} />
                        </button>

                    </Form>
                )
            }
        </nav>
    )
}

export default Nav