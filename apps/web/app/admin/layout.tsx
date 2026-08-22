import { AdminShell } from '@/components/admin-shell';
import { CustomCursor } from '@/legacy/components/CustomCursor';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-root min-h-screen">
      <CustomCursor />
      <AdminShell>{children}</AdminShell>
    </div>
  );
}

