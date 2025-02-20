import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDownIcon } from "lucide-react";
import { useState } from "react";
import { filterOptions, sortOptions } from "@/config";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { StudentContext } from "@/context/student-context";
import { useEffect, useContext} from "react";
import { fetchAllStudentCoursesService, checkCoursePurchaseInfoService } from "@/services";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import {AuthContext} from "@/context/auth-context";
import CourseCard from "@/components/student-view/course-card";
import BackToTop from "@/components/ui/back-to-top";


function createSearchParams(filterParams) {
    const queryParams = [];
  
    for (const [key, value] of Object.entries(filterParams)) {
      if (Array.isArray(value) && value.length > 0) {
        const paramValue = value.join(",");
  
        queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
      }
    }
  
    return queryParams.join("&");
  }

function StudentViewCoursesPage(){

    const [sort, setSort ] = useState('price-lowtohigh');
    const [filters, setFilters] = useState({});
    const [searchParams, setSearchParams] = useSearchParams({});
    const {coursesList, setCoursesList, loading, setLoading} = useContext(StudentContext);
    const {auth} = useContext(AuthContext);
    const navigate = useNavigate();

    function handleFilterOnChange(getSectionId, getCurrentOption) {
        let cpyFilters = { ...filters };
        const indexOfCurrentSeection =
          Object.keys(cpyFilters).indexOf(getSectionId);
    
        console.log(indexOfCurrentSeection, getSectionId);
        if (indexOfCurrentSeection === -1) {
          cpyFilters = {
            ...cpyFilters,
            [getSectionId]: [getCurrentOption.id],
          };
    
          console.log(cpyFilters);
        } else {
          const indexOfCurrentOption = cpyFilters[getSectionId].indexOf(
            getCurrentOption.id
          );
    
          if (indexOfCurrentOption === -1)
            cpyFilters[getSectionId].push(getCurrentOption.id);
          else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
        }
    
        setFilters(cpyFilters);
        sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
      }

      async function fetchAllStudentCourses(filters, sort) {
        const query = new URLSearchParams({
          ...filters,
          sortBy: sort,
        });
        const response = await fetchAllStudentCoursesService(query);
        if (response?.success) {
          setCoursesList(response?.data);
          setLoading(false);
        }
      }
    
      async function handleCourseNavigate(getCurrentCourseId) {
        const response = await checkCoursePurchaseInfoService(
          getCurrentCourseId,
          auth?.user?._id
        );

        console.log(response);
    
        if (response?.success) {
          if (response?.data) {
            navigate(`/course-progress/${getCurrentCourseId}`);
          } else {
            navigate(`/course/details/${getCurrentCourseId}`);
          }
        }
      }

      useEffect(() => {
        const buildQueryStringForFilters = createSearchParams(filters);
        setSearchParams(new URLSearchParams(buildQueryStringForFilters));
      }, [filters]);

    useEffect(() => {
        setSort("price-lowtohigh");
        setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
      }, []);

    useEffect(() => {
        if(filters!== null && sort !== null){
        fetchAllStudentCourses(filters, sort);}
    },[filters, sort])

    useEffect(() => {
        return () => {
          sessionStorage.removeItem("filters");
        };
      }, []);

    return (
        <div className=" container mx-auto p-4 "> 
             <h1 className="text-2xl text-center font-bold mb-4">
                All Courses
             </h1>
             <div className="flex flex-col md:flex-row gap-4">
                <aside className="w-full md:w-64 space-y-4 sticky">
                    <div className=" ">
                        {
                            Object.keys(filterOptions).map(filterOption =>
                                <div className="p-4 space-y-4 border-b" key={filterOption}>
                                    <h3 className="font-bold md-3">
                                        {filterOption.toUpperCase()}
                                    </h3>
                                    <div className="grid grid-row gap-2 mt-2">
                                        {
                                            filterOptions[filterOption].map(option =>
                                                <Label className="flex font-medium items-center gap-3" key={option.id}>
                                                    <Checkbox
                                                    checked={
                                                        filters && 
                                                        Object.keys(filters).length > 0 &&
                                                        filters[filterOption]?.indexOf(option.id) > -1
                                                    }
                                                    onCheckedChange={()=>{handleFilterOnChange(filterOption, option)}}
                                                    />
                                                    <span>{option.label}</span>
                                                </Label>
                                            )
                                        }

                                    </div>
                                </div>
                            )
                        }
                    </div>

                </aside>
                <main className="flex-1">
                    <div className="flex justify-between items-center mb-4 gap-5"> 
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="flex items-center gap-2 p-4"> 
                                    <ArrowUpDownIcon className="h-4 w-4"/>
                                    <span className="text-[15px] font-medium">Sort By</span>
                                </Button>
                            </DropdownMenuTrigger>  
                            <DropdownMenuContent align="end" className="w-[180px]">
                                <DropdownMenuRadioGroup value={sort} onValueChange={(value)=>setSort(value)}>
                                    {
                                        sortOptions.map(sortOption =>
                                            <DropdownMenuRadioItem key={sortOption.id} value={sortOption.id}>
                                                {sortOption.label}
                                            </DropdownMenuRadioItem>
                                        )
                                    }
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>  
                        </DropdownMenu>
                        <span className="text-sm text-gray-700 font-bold">{coursesList.length} Results</span>
                    </div>
                    <div className="space-y-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                
                    {coursesList && coursesList.length > 0 ? (
              coursesList.map((courseItem) => (
                // <Card
                //   onClick={()=>handleCourseNavigate(courseItem?._id)}
                //   className="cursor-pointer"
                //   key={courseItem?._id}
                // >
                //   <CardContent className="flex gap-4 p-4">
                //     <div className="w-48 h-32 flex-shrink-0">
                //       <img
                //         src={courseItem?.image}
                //         className="w-ful h-full object-cover"
                //       />
                //     </div>
                //     <div className="flex-1 overflow-hidden">
                //       <CardTitle className=" sm:text-xs text-md mb-2 line-clamp-2 h-14 overflow-hidden">
                //         {courseItem?.title}
                //       </CardTitle>
                //       <p className="text-sm text-gray-600 mb-1">
                //         By{" "}
                //         <span className="font-bold line-clamp-2">
                //           {courseItem?.InstructorName}
                //         </span>
                //       </p>
                //       <p className="text-[16px] text-gray-600 mt-3 mb-2">
                //         {`${courseItem?.curriculum?.length} ${
                //           courseItem?.curriculum?.length <= 1
                //             ? "Lecture"
                //             : "Lectures"
                //         } - ${courseItem?.level.toUpperCase()} Level`}
                //       </p>
                //       <p className="font-bold text-lg">
                //         R{courseItem?.pricing.toFixed(2)}
                //       </p>
                //     </div>
                //   </CardContent>
                // </Card>
                <CourseCard {...courseItem} key={courseItem._id}/>
              ))
            ) : loading ?(<Skeleton/>)
            :(
              <h1 className="font-extrabold text-4xl">No Courses Found</h1>
            )}
                    </div>
                </main>
             </div>
             <BackToTop/>
        </div>
    )
}

export default StudentViewCoursesPage;
