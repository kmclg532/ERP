import { Outlet } from 'react-router-dom';
import ModernLayout from '../components/layout/ModernLayout.jsx';

export default function MainLayout() {
  return <ModernLayout><Outlet /></ModernLayout>;
}
