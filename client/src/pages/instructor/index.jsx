import AdminDashboard from "@/components/admin-view/dashboard";
import AdminCourses from "@/components/admin-view/courses";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/auth-context";
import {InstructorContext} from "@/context/instructor-context"
import { fetchAdminCourseListService } from "@/services"
import {BarChart} from "lucide-react";
import { Book } from "lucide-react";
import { LogOut } from "lucide-react";
import { useContext, useState, useEffect } from "react";
import { Tabs, TabsContent } from "@radix-ui/react-tabs";

function InstructorDashboardPage () {

    const {resetCredentials} = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('dashboard');
    const {adminCourseList, setAdminCourseList} = useContext(InstructorContext)

    async function fetchAllCourses(){
        const response = await fetchAdminCourseListService();

        if(response?.success){
            setAdminCourseList(response?.data)
            console.log(adminCourseList);

        }
    }

    useEffect(()=>{
        fetchAllCourses()
    },[])

    const menuItems =[
        {
            icon: BarChart,
            label: 'Dashboard',
            value: 'dashboard',
            compoent: <AdminDashboard/>
        },
        {
            icon: Book,
            label: 'Courses',
            value: 'courses',
            compoent: <AdminCourses coursesList={adminCourseList}/>
        },
        {
            icon: LogOut,
            label: 'Logout',
            value: 'logout',
            compoent: null
        },
    ]

    function handleLogout(){
        resetCredentials();
        sessionStorage.clear();
    }

    return (
    <div className="flex h-full min-h-screen bg-gray-300">
        <aside className="w-64  bg-white">
            <div className="p-4 ">
                <h2 className="text-2xl font-bold mb-4"> Admin View</h2>
                <nav>
                    {
                        menuItems.map((item) =>
                        <Button 
                        key={item.value} 
                        className="flex items-center w-full py-2 px-4 mb-2 rounded-lg text-left hover:bg-gray-400 hover:text-black"
                        variant={activeTab === item.value ? 'secondary' : 'default'}
                        onClick={item.value === 'logout' ? handleLogout : () => setActiveTab(item.value)}
                        >
                            <item.icon className="h-6 w-6 mr-2"/>
                            {item.label}
                        </Button>
                        )
                    }
                </nav>
            </div>
        </aside>
        <main className="flex-1 p-8 overflow-auto">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">
                        Dashboard
                    </h1>
                    <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    >
                        {
                            menuItems.map((item) => 
                            <TabsContent 
                            value={item.value}
                            key={item.value}
                            >
                                {
                                    item.compoent !== null ? item.compoent : null
                                }
                            </TabsContent>
                            )
                        }

                    </Tabs>
                </div>
        </main>
    </div> );
}

export default InstructorDashboardPage;