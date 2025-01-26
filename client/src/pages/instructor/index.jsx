import AdminDashboard from "@/components/admin-view/dashboard";
import AdminCourses from "@/components/admin-view/courses";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/auth-context";
import {InstructorContext} from "@/context/instructor-context"
import { fetchAdminCourseListService } from "@/services"
import {BarChart, Book, LogOut, Home,Menu, X} from "lucide-react";
import { useContext, useState, useEffect } from "react";
import { Tabs, TabsContent } from "@radix-ui/react-tabs";
import StudentHomePage from "@/pages/student/home"
import { useNavigate } from "react-router-dom";

function InstructorDashboardPage () {

    const {resetCredentials} = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('dashboard');
    const {adminCourseList, setAdminCourseList} = useContext(InstructorContext)
    const navigate = useNavigate();
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
            icon: Home,
            label: 'Home',
            value: 'home',
            component: null
        },
        {
            icon: BarChart,
            label: 'Dashboard',
            value: 'dashboard',
            component: <AdminDashboard/>
        },
        {
            icon: Book,
            label: 'Courses',
            value: 'courses',
            component: <AdminCourses coursesList={adminCourseList}/>
        },
        {
            icon: LogOut,
            label: 'Logout',
            value: 'logout',
            component: null
        },
    ]

    function handleLogout(){
        resetCredentials();
        sessionStorage.clear();
    }

     const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-full min-h-screen bg-gray-300">
      {/* Mobile Sidebar Toggle */}
      <Button 
        className="md:hidden fixed top-4 left-4 z-50" 
        variant="outline"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X /> : <Menu />}
      </Button>

      {/* Sidebar */}
      <aside className={`
        fixed md:static w-64 bg-white h-full z-40
        transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}>
        <div className="p-4">
          
          <nav className='mt-12 space-y-12'>
            {menuItems.map((item) => (
              <Button 
                key={item.value} 
                className="flex items-center w-full py-2 px-4 mb-2 rounded-lg text-left"
                variant={activeTab === item.value ? 'outline' : 'default'}
                onClick={() => {
                  setIsSidebarOpen(false);
                  if (item.value === 'logout') {
                    handleLogout();
                  } else if (item.value === 'home') {
                    navigate('/home');
                  } else {
                    setActiveTab(item.value);
                  }
                }}
              >
                <item.icon className="h-6 w-6 mr-2"/>
                {item.label}
              </Button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-auto mt-16 md:mt-0">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8">
            Dashboard
          </h1>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {menuItems.map((item) => (
              <TabsContent value={item.value} key={item.value}>
                {item.component}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </div>
  );
}

export default InstructorDashboardPage;