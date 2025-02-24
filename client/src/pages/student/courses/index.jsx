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
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalCourses: 0,
        hasMore: true
    });

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

      async function fetchAllStudentCourses(filters, sort, page) {
        const query = new URLSearchParams({
            ...filters,
            sortBy: sort,
            page,
            limit: 8
        });
        
        const response = await fetchAllStudentCoursesService(query);
        if (response?.success) {
            setCoursesList(response?.data);
            setPagination(response.pagination);
            console.log(response)
            setLoading(false);
        }
    }
    
    function handlePageChange(newPage) {
      setCurrentPage(newPage);
      fetchAllStudentCourses(filters, sort, newPage);
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
        if (filters !== null && sort !== null) {
          fetchAllStudentCourses(filters, sort, currentPage);
        }
      }, [filters, sort, currentPage]);

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
                <CourseCard {...courseItem} key={courseItem._id}/>
              ))
            ) : loading ?(<Skeleton/>)
            :(
              <h1 className="font-extrabold text-4xl">No Courses Found</h1>
            )}
                    </div>
                </main>
             </div>
             <div className="flex flex-wrap justify-center items-center gap-2 mt-8">
              <Button 
                  variant="outline"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-24 sm:w-auto"
              >
                  Previous
              </Button>
              
              {/* Show limited page numbers on mobile */}
              <div className="hidden sm:flex gap-2">
                  {Array.from({ length: pagination.totalPages }, (_, i) => (
                      <Button
                          key={i + 1}
                          variant={currentPage === i + 1 ? "default" : "outline"}
                          onClick={() => handlePageChange(i + 1)}
                      >
                          {i + 1}
                      </Button>
                  ))}
              </div>

              {/* Show current page indicator on mobile */}
              <div className="sm:hidden flex items-center gap-2">
                  <span className="text-sm">
                      Page {currentPage} of {pagination.totalPages}
                  </span>
              </div>
              
              <Button 
                  variant="outline"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={!pagination.hasMore}
                  className="w-24 sm:w-auto"
              >
                  Next
              </Button>
          </div>
             <BackToTop/>
        </div>
    )
}

export default StudentViewCoursesPage;
