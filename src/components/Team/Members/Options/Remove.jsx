import CustomButton from '@/components/CustomButton';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import useHelpers from '@/hooks/useHelpers';
import toast, { Toaster } from 'react-hot-toast';

export default function Remove({ user, open, onClose }) {
  const { loading, setLoading } = useHelpers();

  const removeMember = async () => {
    try {
      setLoading(true);

      const response = await fetch('/api/team', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: user.id,
          type: 'status',
          value: 'removed',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      toast.success('User successfully removed from team.');
    } catch (error) {
      console.error('Error removing user:', error);
      toast.error('Failed to remove user from team.');
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {user.name || 'Member'} will no longer be part of the team and will
            no longer have access to team-related content.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => onClose()}
            className="bg-red-500 text-white"
          >
            Cancel
          </AlertDialogCancel>
          <CustomButton
            label="Confirm"
            loading={loading}
            onClick={removeMember}
          />
        </AlertDialogFooter>
      </AlertDialogContent>
      <Toaster />
    </AlertDialog>
  );
}
