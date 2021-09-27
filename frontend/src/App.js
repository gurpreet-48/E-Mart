import { BrowserRouter as Router , Route} from 'react-router-dom'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

import Home from "./components/Home"
import ProductDetails from './components/product/ProductDetails'

function App() {
  return (
    <Router>
    <div className="App">
      <Header />
      <div className="container container-fluid">
      <Route path='/' component={Home} exact/>
      <Route path='/product/:id' component={ProductDetails} exact/>
      </div>
      <Footer />
    </div>
    </Router>
   
  );
}

export default App;
