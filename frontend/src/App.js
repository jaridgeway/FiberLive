import { Container } from "react-bootstrap";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
//import './App.css';
import HomeScreen from "./screens/HomeScreen";
import ReviewScreen from './screens/ReviewScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/review" element={<ReviewScreen />} />
            <Route path='/login' element={<LoginScreen/>} />
            <Route path='/register' element={<RegisterScreen/>} /> 
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
