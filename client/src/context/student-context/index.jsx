import {createContext, useContext, useState} from 'react';

export const StudentContext = createContext(null);

export default function StudentProvider({children}) {
    const [coursesList, setCoursesList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [studentViewCourseDetials, setStudentViewCourseDetials] = useState(null); 
    const [currentCourseId, setCurrentCourseId] = useState(null);

    return (
        <StudentContext.Provider value={{coursesList, 
            setCoursesList, 
            loading, 
            setLoading, 
            studentViewCourseDetials, 
            setStudentViewCourseDetials, 
            currentCourseId, 
            setCurrentCourseId
        }}>
            {children}
        </StudentContext.Provider>
    )
}