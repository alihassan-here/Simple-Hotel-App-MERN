import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import HomeScreen from './screens/HomeScreen';
import Bookingscreen from './screens/Bookingscreen';

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Route path="/home" exact component={HomeScreen} />
        <Route path="/book/:roomid" component={Bookingscreen} />
      </BrowserRouter>
    </div>
  );
}

export default App;
