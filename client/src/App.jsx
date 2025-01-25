import { Route, Routes } from "react-router-dom"
import AuthPage from "./pages/auth"
import RouteGuard from "./components/route-guard"
import { AuthContext } from "./context/auth-context"
import InstructorDashboardPage from "./pages/instructor"
import StudentHomePage from "./pages/student/home"
import StudentViewCommonLayout from "./components/student-view/common-layout"
import { useContext } from "react"
import NotFoundPage from "./pages/not-found"
import AddNewCoursePage from "./pages/instructor/add-new-course"
import StudentViewCoursesPage from "./pages/student/courses"
import StudentCourseDetails from "./pages/student/course-details"
import PaymentReturnPage from "./pages/student/payment-return"
import StudentCoursesPage from "./pages/student/my-courses"
import StudentViewCourseProgressPage from "./pages/student/course-progress"

function App() {
  const { auth } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/auth"
        element={
          <RouteGuard
            element={<AuthPage />}
            authenticated={auth?.authenticated}
            user={auth?.user}
          />
        }
      />
      <Route
        path="/admin"
        element={
          <RouteGuard
            element={<InstructorDashboardPage />}
            authenticated={auth?.authenticated}
            user={auth?.user}
          />
        }
      />
            <Route
        path="/admin/create-new-course"
        element={
          <RouteGuard
            element={<AddNewCoursePage />}
            authenticated={auth?.authenticated}
            user={auth?.user}
          />
        }
      />
      <Route
        path="/admin/edit-course/:id"
        element={
          <RouteGuard
            element={<AddNewCoursePage />}
            authenticated={auth?.authenticated}
            user={auth?.user}
          />
        }
      />
      <Route
        path="/"
        element={
          <RouteGuard
            element={<StudentViewCommonLayout />}
            authenticated={auth?.authenticated}
            user={auth?.user}
          />
        }
      >
        <Route path="" element={<StudentHomePage />} />
        <Route path="home" element={<StudentHomePage />} />
        <Route path="/courses" element={<StudentViewCoursesPage />} />
        <Route path="/course/details/:id/:studentId" element={<StudentCourseDetails />} />
        <Route path="/payment-return" element={<PaymentReturnPage />} />
        <Route path="/my-courses" element={<StudentCoursesPage />} />
        <Route path="/course-progress/:id" element={<StudentViewCourseProgressPage />} />

      </Route>
      <Route path="*" element={<NotFoundPage/>} />
    </Routes>
  );
}

export default App
