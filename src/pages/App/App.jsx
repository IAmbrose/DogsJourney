import { useState } from "react";
import AuthPage from "../AuthPage/AuthPage";
import { Routes, Route } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import { getUser } from "../../Utilities/users-service";
import MainPage from "../MainPage/MainPage";
import MemoryPage from "../MemoryPage/MemoryPage";



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
              <Route path="/memory"element={<MemoryPage />} />
            </Routes>
          </>
        ) : (
          <AuthPage setUser={setUser}/>
        )}
      </main>
    </>
  );
}


