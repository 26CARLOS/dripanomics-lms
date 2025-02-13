import CommonForm from '@/components/common-form';
import {Card, CardContent, CardDescription,CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger  } from '@/components/ui/tabs';
import { LoginFormControls, RegisterFormControls } from '@/config';
import { GraduationCap } from 'lucide-react';
import React, {useState, useContext} from 'react';
import { AuthContext } from '@/context/auth-context';
import { Link } from 'react-router-dom';

function AuthPage() {
const [activeTab, setActiveTab] = useState('login');

const {
    loginFormData, 
    setLoginFormData, 
    registerFormData, 
    setRegisterFormData,
    handleRegisterSubmit,
    handleLoginSubmit,
    startLoad, 
} = useContext(AuthContext);

function handleTabChange(value) {
    setActiveTab(value);

}

function checkRegisterFormValidity(){
    return registerFormData && registerFormData.userName!=="" && registerFormData.userEmail !== "" && registerFormData.password !== "";
}

function checkLoginFormValidity(){
    return loginFormData && loginFormData.userEmail !== "" && loginFormData.password !== "";
}

console.log(loginFormData, registerFormData);

  return (
    <div className="flex flex-col 100-vh min-h-screen">
        <header className="px-4 lg:px-6 h-14 flex items-center border bottom">
            <Link to={'/'} className="flex items-center justify-center">
            <GraduationCap className='h-8 w-8 mr-4'/>
            <span className='font-extrabold text-xl'>Dripanmics Tutorials</span>
            </Link>
        </header>
        <div className='flex items-center justify-center min-h-screen bg-gray'>
            <Tabs
            value={activeTab}
            defaultValue='login'
            onValueChange={handleTabChange}
            className='w-full max-w-md'
            >
                <TabsList className='grid w-full grid-cols-2 '>
                    <TabsTrigger value='login'>Log in</TabsTrigger>
                    <TabsTrigger value='register'>Register</TabsTrigger>
                </TabsList>
                <TabsContent value='login'>
                    <Card className='p-6 space-y-4 mx-2'>
                        <CardHeader>
                            <CardTitle>Log in to your account</CardTitle>
                            <CardDescription>Enter your email and password</CardDescription>
                        </CardHeader>
                        <CardContent>
                        <CommonForm 
                        formControls={LoginFormControls}
                        buttonText={'Log in'}
                        formData={loginFormData}
                        setFormData={setLoginFormData}
                        isButtonDisabled={!checkLoginFormValidity()}
                        handleSubmit={handleLoginSubmit}
                        />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value='register'>
                <Card className='p-6 space-y-4 mx-2'>
                        <CardHeader>
                            <CardTitle>Create a new account</CardTitle>
                            <CardDescription>Enter your details</CardDescription>
                        </CardHeader>
                        <CardContent>
                        <CommonForm 
                        formControls={RegisterFormControls}
                        buttonText={'Log in'}
                        formData={registerFormData}
                        setFormData={setRegisterFormData}
                        isButtonDisabled={!checkRegisterFormValidity()}
                        handleSubmit={handleRegisterSubmit}
                        />
                        </CardContent>
                    </Card>                
                </TabsContent>
            </Tabs>
        </div>
    </div>
  );
}

export default AuthPage;