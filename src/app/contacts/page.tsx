import { LoadingPage } from '@/components/LoadingPage';
import ContactsView from '@/components/contacs/ContactsView';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <ContactsView />
    </Suspense>
  );
}