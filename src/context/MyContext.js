import { createContext,useContext } from "react"; //importing them

const MyContext = createContext(); //creating a global like storage context

const useMyContext=()=>{
  return useContext(MyContext);
}                                     //this is a custom hook which so the work of usecontext

export {MyContext,useMyContext};           //exporting 
