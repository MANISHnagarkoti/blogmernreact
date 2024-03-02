import Herosec from '../component/Herosec'
import Blog from '../component/Blog'
// import { useDispatch } from "react-redux"
// import { setuser } from '../redux/currentuser'
// import { removeuser } from '../redux/currentuser'
// import axios from 'axios'
import TrendingSec from '../component/TrendingSec'


const Home = () => {
    return (
        <>

            <Herosec />
            <Blog />
            <TrendingSec/>

        </>
    )
}

export default Home