import "./App.css";
import { Route, Routes } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';


import { lazy , Suspense } from 'react'

const Login =lazy(()=> import("./Pages/Login/Login.jsx"))
const Chat =lazy(()=> import("./Pages/Chat/Chat.jsx"))
function App() {
 
 
  let routes =
        <Routes>
          <Route path="/" Component={Login} />
          <Route path="/chat" Component={Chat} />
        </Routes>
 
 
  return (
   
   
     <Suspense fallback={<div className="" > LOADING... </div>}>

                  {routes}

      </Suspense>



);
}

export default App;
