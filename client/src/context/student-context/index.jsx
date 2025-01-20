import {createContext, useContext, useState} from 'react';

export const StudentContext = createContext(null);

export default function StudentProvider({children}) {
    const [coursesList, setCoursesList] = useState([]);
    const [loading, setLoading] = useState(true);

    return (
        <StudentContext.Provider value={{coursesList, setCoursesList, loading, setLoading}}>
            {children}
        </StudentContext.Provider>
    )
}