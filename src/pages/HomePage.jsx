import { Navbar } from "../components/Navbar";
import {Link} from "react-router";
import { useMyContext } from "../context/MyContext";
const HomePage=()=>{
    const {setCount}=useMyContext();
    return(
        <div>
                <Navbar />
            <p>
                This is Home Page!
            </p>
            <button
                onClick={()=>{
                  setCount((prev)=>prev+1);
                }}
                className="py-1 px-2 border-1 rounded-md">
                  ++
              </button>
        </div>
    )
}

export {HomePage};