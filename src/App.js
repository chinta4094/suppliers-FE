import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import Item from './Item'
import AddItems from './AddItems'
import Cart from './Cart'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/addToCart' element={<Item/>}/>
          <Route path='/addItems' element={<AddItems/>}/>
          <Route path='/cartDetails' element={<Cart/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
