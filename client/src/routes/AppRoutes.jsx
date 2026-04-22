import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext.jsx';
import { ThemeProvider } from '../context/ThemeContext.jsx';
import { ProtectedRoute } from '../components/ProtectedRoute.jsx';
import MainLayout from '../layouts/MainLayout.jsx';

import Login from '../pages/auth/Login.jsx';
import Dashboard from '../pages/dashboard/Dashboard.jsx';
import ClassRoutine from '../pages/class-routine/ClassRoutine.jsx';
import Attendance from '../pages/attendance/Attendance.jsx';
import Assignment from '../pages/assignment/Assignment.jsx';
import AcademicCalendar from '../pages/calendar/AcademicCalendar.jsx';
import Examination from '../pages/examination/Examination.jsx';
import Result from '../pages/result/Result.jsx';
import Quiz from '../pages/quiz/Quiz.jsx';
import SubjectPlanner from '../pages/subject-planner/SubjectPlanner.jsx';
import Feedback from '../pages/feedback/Feedback.jsx';
import ResolvedFeedback from '../pages/resolved-feedback.jsx';
import Activity from '../pages/activity.jsx';
import StudentSection from '../pages/student-section.jsx';
import Fees from '../pages/fees/Fees.jsx';
import Notice from '../pages/notice/Notice.jsx';
import Notifications from '../pages/notifications/Notifications.jsx';
import Downloads from '../pages/downloads/Downloads.jsx';
import Profile from '../pages/profile/Profile.jsx';
import Settings from '../pages/settings/Settings.jsx';

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
              <Route path="/notifications" element={<Notifications />} />
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
