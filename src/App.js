import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import AggregateCalculator from "./components/AggregateCal";
import GPACalculator from "./components/GPAcal";
import CGPACalculator from "./components/CGPAcal";
import TimetableGenerator from "./components/TimeTable";
import FrontPages from "./components/FrontPages";
import GenerateFP from "./components/GenerateFP";
import FacultiesDepartments from "./components/FacAndDept";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Signup from "./components/Signup";
import Login from "./components/Login";
import UserPortal from "./components/PortalOFuser";

function App() {
  const ScrollUP = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
      // eslint-disable-next-line
    }, [pathname]);
    return null;
  };

  return (
    <>
      <Router>
        <ScrollUP />
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/portal" element={<UserPortal />} />
          {/* <Route exact path="/portal" element={<ProfileHeader />} /> */}
          <Route
            exact
            path="/AggregateCalculator"
            element={<AggregateCalculator />}
          />
          <Route exact path="/GPAcalculator" element={<GPACalculator />} />
          <Route exact path="/CGPACalculator" element={<CGPACalculator />} />
          <Route exact path="/TimeTable" element={<TimetableGenerator />} />
          <Route exact path="/FrontPages" element={<FrontPages />} />
          <Route exact path="/design/:id" element={<GenerateFP />} />
          <Route
            exact
            path="/FacultiesDepartments"
            element={<FacultiesDepartments />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
