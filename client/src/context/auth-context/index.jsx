import { initialLoginFormData, initialRegisterFormData } from "@/config";
import { createContext, useEffect, useState } from "react";
import { loginService, registerService, checkAuthService } from "@/services";
import {useNavigate} from 'react-router-dom';
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast"

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {

    const [loginFormData, setLoginFormData] = useState(initialLoginFormData);
    const [registerFormData, setRegisterFormData] = useState(initialRegisterFormData)
    const [auth, setAuth] = useState({
        authenticated: false,
        user: null,
    });

    const [loading, setLoading] = useState(true);
    const [startLoad, setStartLoad] = useState(false);
    const { toast } = useToast()
    const navigate = useNavigate();

    async function handleRegisterSubmit(event) {
        event.preventDefault();
        setStartLoad(true);
        const data = await registerService(registerFormData);
        if(data.success){
            setStartLoad(false)
            toast({
                title: "Registration successful",
                description: "You can now login",
            });
        }

    }

    async function handleLoginSubmit(event) {   
        event.preventDefault();
        setStartLoad(true);
        try {
            const data = await loginService(loginFormData);
            
            if(data.success){
                sessionStorage.setItem('accessToken', JSON.stringify(data.data.accessToken));
                const { userName } = data.data.user;
                setAuth({
                    authenticated: true,
                    user: data.data.user,
                });
                toast({
                    title: "Logged in successfully",
                    description: `Welcome back ${userName}!`,
                });
            }
        } catch (error) {
            setAuth({
                authenticated: false,
                user: null,
            });
            toast({
                title: "Login failed",
                description: "Invalid email or password",
                variant: "destructive",
            });
        } finally {
            setStartLoad(false);
        }
    }

    //check auth user
async function checkAuthUser(){
    try{    
        const data = await checkAuthService();
        if(data.success){
            setAuth({
                authenticated: true,
                user: data.data.user,
            });
        }
        else{
            setAuth({
                authenticated: false,
                user: null,
            });
        }
    } catch(error){
        if(!error?.response?.data?.success){
            setAuth({
                authenticated: false,
                user: null,
            });
        }
    } finally{
        setLoading(false);
    }
}

    function resetCredentials(){
        sessionStorage.removeItem('accessToken');
        setAuth({
            authenticated: false,
            user: null,
        });
    }

    useEffect(() => {
        checkAuthUser()
    },[])

    console.log(auth);

    return (
        <AuthContext.Provider value={{
            loginFormData, 
            setLoginFormData, 
            registerFormData, 
            setRegisterFormData,
            handleRegisterSubmit,
            handleLoginSubmit,
            auth,
            resetCredentials,
            startLoad, 
            setStartLoad
        }}>
            {loading ? <Skeleton/> : children}
        </AuthContext.Provider>
    );
};
