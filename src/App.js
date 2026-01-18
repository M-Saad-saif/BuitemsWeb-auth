import "./App.css";
import Home from "./components/Home";
import AggregateCalculator from "./components/AggregateCal";
import GPACalculator from "./components/GPAcal";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CGPACalculator from "./components/CGPAcal";
import TimetableGenerator from "./components/TimeTable";
import FrontPages from "./components/FrontPages";
import GenerateFP from "./components/GenerateFP";
import FacultiesDepartments from "./components/FacAndDept";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="/AggregateCalculator"
            element={<AggregateCalculator />}
          />
          <Route exact path="/GPAcalculator" element={<GPACalculator />} />
          <Route exact path="/CGPACalculator" element={<CGPACalculator />} />
          <Route exact path="/TimeTable" element={<TimetableGenerator />} />
          <Route exact path="/FrontPages" element={<FrontPages />} />
          <Route exact path="/FrontPages" element={<FrontPages />} />
          <Route exact path="/design/:id" element={<GenerateFP />} />
          <Route exact path="/FacultiesDepartments" element={<FacultiesDepartments />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
