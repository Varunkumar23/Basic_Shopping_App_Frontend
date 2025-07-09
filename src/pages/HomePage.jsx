import { Navbar } from "../components/Navbar";
import {Link} from "react-router";
const HomePage=()=>{
    return(
        <div>
                <Navbar />
            <p>
                This is Home Page!
            </p>
        </div>
    )
}

export {HomePage};