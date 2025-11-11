import Spinner from '@/components/ui/spinner/spinner';
import { StatusMessage } from '@/components/ui/status-message/status-message';

export default function RequestSuspense() {
  return (
    <>
      <StatusMessage type="loading" />
      <Spinner />
    </>
  );
}
