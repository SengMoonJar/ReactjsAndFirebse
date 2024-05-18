import AddTransition from "./Components/AddTransition/AddTransition";
import Signup from "./Components/Auth/Signup";
import { Routes,Route } from "react-router";
import Home from "./Components/Home/Home";
import MonthlyData from "./Components/MonthlyData/MonthlyData";
import EachMonthData from "./Components/EachMonthData/EachMonthData";
import AddIncome from "./Components/AddIncome/AddIncome";
import Login from "./Components/Auth/Login";
import { AuthProvider } from "./Components/Context/AuthContext";
function App() {
  return (
    <div className="App">
      <AuthProvider>
     <Routes>
       
       <Route path='/' element={<Login/>}/>
       <Route path='/signup' element={<Signup/>}/>
       <Route path='/home' element={<Home/>}/>
       <Route path='monthlydata' element={<MonthlyData/>}>
        <Route  path='eachmonthdata/:monthIndex' element={<EachMonthData/>}/>
       </Route>
       <Route path='addtransition' element={<AddTransition/>}/>
       <Route path='addincome' element={<AddIncome/>}/>
       
     </Routes>
     </AuthProvider>
    </div>
  );
}

export default App;
