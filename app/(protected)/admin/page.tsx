import { redirect } from 'next/navigation';

// The old single /admin tabbed page was split into three nested pages under
// /system/security/. Keep this redirect for any existing bookmarks.
export default function AdminRedirectPage() {
  redirect('/system/security/roles');
}
