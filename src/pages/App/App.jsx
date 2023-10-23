import { useState } from "react";
import AuthPage from "../AuthPage/AuthPage";
import { Routes, Route } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import { getUser } from "../../Utilities/users-service";
import MainPage from "../MainPage/MainPage";
import WishListPage from "../WishListPage/WishListPage";



export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <>
      <main className="App">
        {user ? (
          <>
            <NavBar user={user} setUser={setUser}/>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/wishlist" element={<WishListPage />} />
            </Routes>
          </>
        ) : (
          <AuthPage setUser={setUser}/>
        )}
      </main>
    </>
  );
}


