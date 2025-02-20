import { Route, Routes } from "react-router-dom"
// import AuthPage from "./pages/auth"
import RouteGuard from "./components/route-guard"
import { AuthContext } from "./context/auth-context"
// import InstructorDashboardPage from "./pages/instructor"
// import StudentHomePage from "./pages/student/home"
import StudentViewCommonLayout from "./components/student-view/common-layout"
import { useContext, Suspense, lazy } from "react"
import NotFoundPage from "./pages/not-found"
import AddNewCoursePage from "./pages/instructor/add-new-course"
import StudentViewCoursesPage from "./pages/student/courses"
// import StudentCourseDetails from "./pages/student/course-details"
import PaymentReturnPage from "./pages/student/payment-return"
import StudentCoursesPage from "./pages/student/my-courses"
import StudentViewCourseProgressPage from "./pages/student/course-progress"
import PaymentCancelPage from "./pages/student/payment-cancel"
import CartPage from './pages/student/cart'
import ForgotPassword from './pages/auth/forgot-password'
import ResetPassword from './pages/auth/reset-password'
import VerifyEmail from './pages/auth/verify-email';
import LoadingScreen from './components/loading-screen'
import TermsOfService from './pages/support/terms-of-service'
import HelpCenter from './pages/support/help-center';
import PrivacyPolicy from './pages/support/privacy-policy';

const StudentHomePage = lazy(() => import('./pages/student/home'));
const AuthPage = lazy(() => import('./pages/auth'));
const InstructorDashboardPage = lazy(() => import('./pages/instructor'));
const StudentCourseDetails = lazy(() => import('./pages/student/course-details'));

function App() {
  const { auth } = useContext(AuthContext);

  return (

    <Suspense fallback={<LoadingScreen/>}>
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

      {/* Public home route */}
      <Route path="/" element={<StudentViewCommonLayout />}>
        <Route path="" element={<StudentHomePage />} />
        <Route path="home" element={<StudentHomePage />} />
        <Route path="/courses" element={<StudentViewCoursesPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} /> 
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route path="/terms-of-service" element={<TermsOfService/>}/>
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Route>
      
      {/* Protected Student Routes */}
      <Route
        path="/"
        element={
          <RouteGuard
            element={<StudentViewCommonLayout/>}
            authenticated={auth?.authenticated}
            user={auth?.user}
          />
        }
      >
        <Route path="/course/details/:id" element={<StudentCourseDetails />} />
        <Route path="/payment-return" element={<PaymentReturnPage />} />        
        <Route path="/payment-cancel" element={<PaymentCancelPage />} />
        <Route path="/my-courses" element={<StudentCoursesPage />} />
        <Route path="/course-progress/:id" element={<StudentViewCourseProgressPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage/>} />
    </Routes>
    </Suspense>
  );
}

export default App
