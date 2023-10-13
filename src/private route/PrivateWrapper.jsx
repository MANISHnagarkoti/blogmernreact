

import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux"


const PrivateWrapper = () => {


    // const [s, ss] = useState(userLogin)
    const { userLogin } = useSelector(state => state.currentUser)








    return (
        <>
            {

userLogin ? <Outlet /> : <Navigate to="/login" />


            }

        </>
    )
}

export default PrivateWrapper