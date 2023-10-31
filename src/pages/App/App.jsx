import { useState } from "react";
import AuthPage from "../AuthPage/AuthPage";
import { Routes, Route } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import { getUser } from "../../Utilities/users-service";
import MainPage from "../MainPage/MainPage";
import MemoryPage from "../MemoryPage/MemoryPage";
import DogProfilePage from "../DogProfilePage/DogProfilePage";
import UserMemoryPage from "../MemoryPage/UserMemoryPage";





export default function App() {
  const [user, setUser] = useState(getUser());
  console.log(user)
  return (
    <>
      <main className="App">
        {user ? (
          <>
            <NavBar user={user} setUser={setUser}/>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/memory" element={<MemoryPage user={user}/>} />
              <Route path="/dogprofiles" element={<DogProfilePage />} />
              <Route path="/memory/:userId" element={<UserMemoryPage user={user}/>} />
            </Routes>
          </>
        ) : (
          <AuthPage setUser={setUser}/>
        )}
      </main>
    </>
  );
}


