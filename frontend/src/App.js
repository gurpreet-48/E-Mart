import { BrowserRouter as Router , Route} from 'react-router-dom'
import {useEffect,useState} from 'react'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

import Home from "./components/Home"
import ProductDetails from './components/product/ProductDetails'

import Cart from './components/cart/Cart'
import Shipping from './components/cart/Shipping'
import ConfirmOrder from './components/cart/ConfirmOrder'
import Payment from './components/cart/Payment'


import Login from './components/user/Login'
import Register from './components/user/Register'
import Profile from './components/user/Profile'
import UpdateProfile from './components/user/UpdateProfile'
import UpdatePassword from './components/user/UpdatePassword'
import ForgotPassword from './components/user/ForgotPassword'
import NewPassword from './components/user/NewPassword'

import ProtectedRoute from './components/route/ProtectedRoute'

import {loadUser} from './actions/userActions'
import store from './store'
import axios from 'axios'

// Payment
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'


function App() {

  const [stripeApiKey, setStripeApiKey] = useState('');

  //for the user to be already logged in when the page is loaded
  //for user to be already logged in when the page is loaded
  useEffect(() => {
  store.dispatch(loadUser())

  async function getStripeApiKey(){
     const {data} = await axios.get('/api/v1/stripeapi');
     setStripeApiKey(data.stripeApiKey)
  } 

  getStripeApiKey();
},[])

  return (
    <Router>
    <div className="App">
      <Header />
      <div className="container container-fluid">
      <Route path='/' component={Home} exact/>
      <Route path='/search/:keyword' component={Home}/>
      <Route path='/product/:id' component={ProductDetails} exact/>
      <Route path='/cart' component={Cart} exact/>
      <ProtectedRoute path = '/shipping' component= {Shipping} />
      <ProtectedRoute path = '/order/confirm' component= {ConfirmOrder} />
      {stripeApiKey &&
          <Elements stripe = {loadStripe(stripeApiKey)}>
            <ProtectedRoute path="/payment" component={Payment} />
        </Elements>
      }

      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      
      <Route path="/password/forgot" component={ForgotPassword} exact/>
      <Route path="/password/reset/:token" component={NewPassword} exact/>

      <ProtectedRoute path="/me" component={Profile} exact />
      <ProtectedRoute path="/me/update" component={UpdateProfile} exact />
      <ProtectedRoute path="/password/update" component={UpdatePassword} exact />

      </div>
      <Footer />
    </div>
    </Router>
   
  );
}

export default App;
