import { BrowserRouter, Route, Routes } from "react-router";
import { HomePage } from "./pages/HomePage";
import { SearchPage } from "./pages/SearchPage";
import {ViewPage} from "./pages/ViewPage";
import { CartPage } from "./pages/CartPage";
import { ProfilePage } from "./pages/ProfilePage";
import { SignupPage } from "./pages/SignupPage";
import { LoginPage } from "./pages/LoginPage";
import { NotfoundPage } from "./pages/NotfoundPage";
import { useMyContext } from "./context/MyContext";

function App() {
  const{user,appLoading}=useMyContext();

  if(!appLoading){
    return(
      <div className="min-h-[100vh] flex items-center content-center">
        <div className="tetx-purple-600 text-3xl">Loading....</div>
      </div>
    )
  }

  const{isAuthenticated}=user;

  if(!isAuthenticated){
     <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/*" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>

  }

  return (
    <>
      {/* <h1 className='text-9xl font-bold text-green-500'>Hello!</h1> */}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/view" element={<ViewPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/*" element={<NotfoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
