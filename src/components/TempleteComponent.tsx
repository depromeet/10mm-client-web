import { useAuth } from '@/hooks/useAuth';
import useForegroundNotification from '@/hooks/useForegroundNotification';

function TemplateComponent({ children }: { children: React.ReactNode }) {
  useAuth();
  useForegroundNotification();
  return children;
}

export default TemplateComponent;
