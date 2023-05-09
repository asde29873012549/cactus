import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Main from './pages/MainPage'
import Me from './pages/Me'
import Sell from './pages/Sell'
import Shop from './pages/Shop'
import SingleListing from './pages/SingleListing'
import PerDepartmentPage from './pages/PerDepartmentPage'
import PerCategoryPage from './pages/PerCategoryPage'
import PerDesignerPage from './pages/PerDesignerPage'
import StaffPicks from './pages/StaffPicks'
import ShoppingCart from './pages/ShoppingCart'
import Articles from './pages/Articles'

function App() {

  return (
	<>
		<Router>
			<Routes>
				<Route path='/' element={<Main/>}/>
				<Route path='/designers' />
				<Route path='/shop/menswear' element={<PerDepartmentPage/>} />
				<Route path='/shop/womenswear' element={<PerDepartmentPage/>}/>
				<Route path='/sell' element={<Sell />}/>
				<Route path='/shop' element={<Shop />}/>
				<Route path='/shoppingCart' element={<ShoppingCart/>}/>
				<Route path='/me' element={<Me />}/>
				<Route path='/shop/listing/:id' element={<SingleListing/>} />
				<Route path='/shop/menswear/subCategoryListing/:id' element={<PerCategoryPage/>} />
				<Route path='/shop/menswear/categoryListing/:id' element={<PerCategoryPage/>} />
				<Route path='/shop/womenswear/subCategoryListing/:id' element={<PerCategoryPage/>} />
				<Route path='/shop/womenswear/categoryListing/:id' element={<PerCategoryPage/>} />
				<Route path='/shop/designerListing/:id' element={<PerDesignerPage/>} />
				<Route path='/shop/staffPick' element={<StaffPicks/>} />
				<Route path='/articles' element={<Articles/>} />
			</Routes>
		</Router>
	</>
  );
}

export default App;
