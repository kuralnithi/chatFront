import "./App.css";
import { Route, Routes } from "react-router-dom";
import Chat from "./Pages/Chat/Chat";
import Login from "./Pages/Login/Login";
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
    </>
  );
}

export default App;
