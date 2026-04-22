import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext.jsx';
import { ThemeProvider } from '../context/ThemeContext.jsx';
import { ProtectedRoute } from '../components/ProtectedRoute.jsx';
import MainLayout from '../layouts/MainLayout.jsx';

import Login from '../pages/auth/Login.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import ClassRoutine from '../pages/ClassRoutine.jsx';
import Attendance from '../pages/Attendance.jsx';
import Assignment from '../pages/Assignment.jsx';
import AcademicCalendar from '../pages/AcademicCalendar.jsx';
import Examination from '../pages/Examination.jsx';
import Result from '../pages/Result.jsx';
import Quiz from '../pages/Quiz.jsx';
import SubjectPlanner from '../pages/SubjectPlanner.jsx';
import Feedback from '../pages/Feedback.jsx';
import ResolvedFeedback from '../pages/resolved-feedback.jsx';
import Activity from '../pages/activity.jsx';
import StudentSection from '../pages/student-section.jsx';
import Fees from '../pages/Fees.jsx';
import Notice from '../pages/Notice.jsx';
import Downloads from '../pages/Downloads.jsx';
import Profile from '../pages/Profile.jsx';
import Settings from '../pages/Settings.jsx';

export default function AppRoutes() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/class-routine" element={<ClassRoutine />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/assignment" element={<Assignment />} />
              <Route path="/calendar" element={<AcademicCalendar />} />
              <Route path="/examination" element={<Examination />} />
              <Route path="/result" element={<Result />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/subject-planner" element={<SubjectPlanner />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/resolved-feedback" element={<ResolvedFeedback />} />
              <Route path="/activity" element={<Activity />} />
              <Route path="/student-section" element={<StudentSection />} />
              <Route path="/fees" element={<Fees />} />
              <Route path="/notice" element={<Notice />} />
              <Route path="/downloads" element={<Downloads />} />
              <Route path="/my-profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
            </Route>

            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}
