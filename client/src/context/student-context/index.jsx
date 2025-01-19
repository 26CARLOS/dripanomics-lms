import {createContext, useContext, useState} from 'react';

export const StudentContext = createContext(null);

export default function StudentProvider({children}) {
    const [coursesList, setCoursesList] = useState([]);


    return (
        <StudentContext.Provider value={{coursesList, setCoursesList}}>
            {children}
        </StudentContext.Provider>
    )
}