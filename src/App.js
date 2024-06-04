import { Routes,Route } from "react-router-dom";
import Home from "./Home";
import Invoice from "./Invoice";

function App() {
    return( <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/invoice" element={<Invoice/>}/>
     </Routes>
    )
     
}
export default App;
