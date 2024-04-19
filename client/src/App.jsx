import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from "./pages/Profile/Profile";
import Home from "./pages/home/Home"; 
 import Auth from "./pages/Auth/Auth";
import NavIcons from "./components/NavIcons/NavIcons";
 import { useSelector } from "react-redux";
 import  {  Routes, Route, Navigate} from 'react-router-dom'
import Chat from "./pages/Chat/Chat";
function App() {
  const user = useSelector((state) => state.authReducer.authData);
  return (
    <div className="App">
       < div  className="blur" style={{top:'-18', right:'0'}}></div>
       <div style={{top:"36%",left:'-8rem'} }className="blur"></div> 
       <Routes>
       <Route
          path="/"
          element={user ? <Navigate to="home" /> : <Navigate to="auth" />}
        />
         <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="../auth" />}
        />
         <Route
          path="/auth"
          element={user ? <Navigate to="../home" /> : <Auth />}
        />
          <Route
          path="/profile/:id"
          element={user ? <Profile /> : <Navigate to="../auth" />}
        />
       <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <NavIcons></NavIcons>
              <hr />
              <p className="noti"><b>There is nothing here!</b></p>
            </main>
            }
        />
        <Route path="/chat" element={user? <Chat/>:<Navigate to="../auth"/>}/>
      </Routes>
     

    </div>
  );
}

export default App;
