import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useHelpers from '@/hooks/useHelpers';
import { useState } from 'react';
import { toast } from 'sonner';
import CustomButton from '../CustomButton';
import Roles from './Members/Options/Roles';
import axios from 'axios';

export default function NewMember({ team_id }) {
  const { open, setOpen, loading, setLoading } = useHelpers();
  const [member, setMember] = useState({
    name: '',
    email: '',
    role: 'member',
  });

  const saveMember = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/team', {
        ...member,
        team_id,
      });

      if (response.status === 201) {
        toast.success('Team member successfully added.');
      } else {
        toast.error('Failed to add team member.');
      }
    } catch (error) {
      console.error('Error adding team member:', error);
      toast.error('Failed to add team member.');
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button>
          <span>New member</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-lg">
        <DialogHeader>
          <DialogTitle>Add a new member</DialogTitle>
          <DialogDescription>
            Please enter name and email of member. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Full Name"
              value={member.name}
              className="col-span-3"
              onChange={(e) => setMember({ ...member, name: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="">
              Email
            </Label>
            <Input
              id="email"
              value={member.email}
              placeholder="johndoe@gmail.com"
              className="col-span-3"
              onChange={(e) => setMember({ ...member, email: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="">
              Select role
            </Label>
            <div className="w-[240px]">
              <Roles
                selected={member.role}
                setSelected={(value) => setMember({ ...member, role: value })}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <CustomButton
            label="Send invitation"
            loading={loading}
            onClick={saveMember}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
