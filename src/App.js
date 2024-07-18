import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import Login from './components/Login';
import MainCon from './components/MainCon';
import WelcomeCon from './components/WelcomeCon';
import ChatArea from './components/ChatArea';
import OnlArea from './components/OnlArea';
import Register from './components/Register';
import { Toaster } from "react-hot-toast"
import { useAuthContext } from './context/AuthContext';


function App() {
  const { authUser } = useAuthContext();
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={authUser ? <Navigate to="/app/welcome" /> : <Register />} />
        <Route path='/login' element={authUser ? <Navigate to="/app/welcome" /> : <Login />} />
        <Route path='app' element={authUser ? <MainCon /> : <Navigate to="/" />}>
          <Route path='welcome' element={authUser ? <WelcomeCon /> : <Navigate to="/" />} />
          <Route path='chat/:chatId' element={authUser ? <ChatArea /> : <Navigate to="/" />} />
          <Route path='users' element={authUser ? <OnlArea /> : <Navigate to="/" />} />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
