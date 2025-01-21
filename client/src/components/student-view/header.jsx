import { GraduationCap, TvMinimalPlay, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import { useNavigate } from "react-router-dom";

function StudentViewCommonHeader() {

    const navigate = useNavigate();


    const {resetCredentials} = useContext(AuthContext);
    function handleLogOut() {
        resetCredentials();
        sessionStorage.clear();
    }

    return ( 
        <header className="flex items-center justify-between p-4 border-b relative w-vw">
            <div className="flex items-center">
                <Link to="home" className="flex items-center space-x-2">
                    <GraduationCap className="h-8 w-8 mr-2 hover:text-gray-800 hidden md:block" />
                    <span className="font-extrabold md:text-xl text-[14px]">
                        Dripanomics Tutorials
                    </span>
                </Link>
                <div className="flex items-center space-x-1">
                    <Button 
                    variant='ghost' 
                    className="text-[14px] md:text-[16px] font-medium "
                    onClick={()=>navigate('/courses')}
                    >
                        Explore Courses
                    </Button>
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <div className="flex gap-2 items-center">
                    <div className="flex items-center gap-2">
                        <span className="font-medium md:text-xl text-[12px] hidden md:block">My Courses</span>
                        <TvMinimalPlay className="h-7 w-7 mx-4" />
                    </div>
                    <Button onClick={handleLogOut} className="text-[14px] md:text-[16px] font-small">
                        <p className="hidden md:block">
                        Sign Out
                        </p>
                        <span className="md:hidden font-bold">
                            <LogOut className="h-8 w-8"/>
                        </span>
                    </Button>
                </div>
            </div>
        </header>
    );
}

export default StudentViewCommonHeader;