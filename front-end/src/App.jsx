
import './App.css';
import { Route, Routes } from 'react-router-dom';

import Home from "./Pages/Home/home";
import Login from './Auth/Login/Login';
import Layoute from './Pages/Layoute';

import About from './Pages/About/About';
import BlogDetails from './Pages/BlogDetails/BlogDetails';
import Admin from './Admin/Admin';
import Dashboard from './Admin/Dashbaord/Dashboard';
import Users from './Admin/Users/Users';
import Profile from './Admin/Profile/Profile';
import Add_Post from './Admin/Post/Add_Post';
import Post from './Admin/Post/Post';
import Places from './Pages/Places/Places';
import { selectSession } from './Store/authenticationSlice';
import { useSelector } from 'react-redux';
import Notfound from './Pages/Notfound/Notfound';
import Register from './Auth/Register/Register';
import Author from './Admin/Author/Author';
import AuthorDetails from './Pages/AuthorDetails/AuthorDetails';
import Update_Post from './Admin/Post/Update_Post';
import TopBooks from './Pages/TopBooks/TopBooks';
import Category from './Pages/Category/Category';
import ChangePassword from './Admin/Users/ChangePassword';







function App() {

  const session = useSelector(selectSession)

  console.log(session.isAuthenticated)



  return (
    <div className="">


    <Routes>

      <Route path='/' element={<Layoute/>}>
        <Route index element={<Home/>}/>

        <Route path='/About' element={<About/>}/>

        <Route path='/topRatedBooks' element={<TopBooks/>}/>
        <Route path='/Books/:id' element={<BlogDetails />}/>
        <Route path='/Books/:id' element={<BlogDetails />}/>
        <Route path='/Books' element={<Places/>}/>
        <Route path='/Authors/:id' element={<AuthorDetails />}/>
        <Route path={'/Books/Category/:Category'} element={<Category/>}/>


 

        

     




      </Route>

      {

session.isAuthenticated?(

      <Route path='/user' element={<Admin/>}>

{
  session.user.type=='admin' ?(
<>
        <Route index element={<Dashboard/>}/>
        <Route path={'/user/Users'} element={<Users/>}/>
        <Route path={'/user/Books'} element={<Post/>}/>
        <Route path={'/user/Profile'} element={<Profile/>}/>
        <Route path={'/user/Books/Add'} element={<Add_Post/>}/>
        <Route path={'/user/Author'} element={<Author/>}/>
        <Route path={'/user/Books/Update/:id'} element={<Update_Post/>}/>
        <Route path={'/user/changePassword'} element={<ChangePassword/>}/>
       


</>):(<><Route path={'/user/Profile'} element={<Profile/>}/> <Route path={'/user/changePassword'} element={<ChangePassword/>}/></>)


}  
        


      </Route>):(<><Route path='/login' element={<Login/>}/>   <Route path='/register' element={<Register/>}/></>)
      
   
}

      <Route path='*' element={<Notfound/>}/>



   

      



    </Routes>

      
     
      





    </div>
  );
}

export default App;
