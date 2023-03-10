// CSS
import 'react-toastify/dist/ReactToastify.css';


// Components
import Navbar from "./Components/Navbar";
import Login from "./Sites/Login";
import Register from "./Sites/Register";
import Logout from "./Sites/Logout";
import Activate from "./Sites/Activate";
import Home from "./Sites/Home";
import Dashboard from "./Sites/Dashboard";


// Imports
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {createContext} from "react";
import {ToastContainer} from "react-toastify";
import useAuth from "./Contexts/Auth.jsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Protected from "./Others/Protected.jsx";


// Code
const queryClient = new QueryClient()
export const authContext = createContext()


function App() {

    const {setUser, removeUser, isUser, getUser, fetchAuthorization} = useAuth()

    return (
        <div className="min-h-screen dark:bg-gray-600 bg-gray-100 text-gray-900 dark:text-white">
            <QueryClientProvider client={queryClient}>
                <authContext.Provider value={{setUser, removeUser, isUser, getUser, fetchAuthorization}}>
                    <BrowserRouter>
                        <Navbar/>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/dashboard" element={
                                <Protected isSignedIn={fetchAuthorization()}>
                                    <Dashboard/>
                                </Protected>
                            }/>
                            <Route path="/register" element={<Register/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/logout" element={<Logout/>}/>
                            <Route path="/activate/:KEY" element={<Activate/>}/>
                            <Route path="*" element={<div>404</div>}/>
                        </Routes>
                        <ToastContainer
                            position="bottom-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                    </BrowserRouter>
                </authContext.Provider>
            </QueryClientProvider>
        </div>
    )
}

export default App
