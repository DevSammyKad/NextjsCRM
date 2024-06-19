import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

// ...

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';

import axios from 'axios';
import { LoaderIcon } from 'lucide-react';

const OrganizationSetting = () => {
  // Organization

  const organizationSchema = z.object({
    organizationName: z
      .string()
      .min(2, {
        message: 'Organization Name must be at least 2 Character',
      })
      .max(20, {
        message: 'Organization Name must be less than 20 Character',
      }),
    organizationPanCard: z
      .string()
      .max(10, {
        message: 'Pan Card No must be less than 10 Character',
      })
      .regex(/[A-Z]{5}[0-9]{4}[A-Z]{1}/, 'Invalid Pan Card No'),
    organizationMail: z.string().email('Invalid email address'),
    organizationType: z.string().optional(),
    organizationWebsite: z.string().url('Invalid Website URL').optional(),
    state: z.string(),
    district: z.string(),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/api/organization', data);
      if (response.status === 200) {
        toast.success('Organization Data submitted Successfully');
      }
      console.log('Organization Form Data:', response.data);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error('Organization already exists');
      } else {
        console.log('Organization Form Data:', error);
        toast.error('Organization Data is not submitted , try again');
      }
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: zodResolver(organizationSchema) });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-5">
        <Card>
          <CardHeader>
            <CardTitle>Create Organization </CardTitle>
            <CardDescription>
              Configure your organization settings here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-10">
              <div className="grid grid-cols-2   max-sm:grid-cols-1 max-sm:space-y-5  gap-5">
                <div className="grid w-full gap-4 relative">
                  <Label htmlFor="organizationName">Organization Name</Label>
                  <Input
                    id="organizationName"
                    placeholder="For Ex- RSAI PVT"
                    {...register('organizationName')}
                  />
                  {errors.organizationName && (
                    <span className="text-red-500 text-xs absolute -bottom-6">
                      {errors.organizationName.message}
                    </span>
                  )}
                </div>
                <div className="grid w-full gap-4">
                  <Label htmlFor="organizationType">Organization Type</Label>
                  <Input
                    id="organizationType"
                    placeholder="For Ex - College, Classes, School"
                    {...register('organizationType')}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 max-sm:grid-cols-1 max-sm:space-y-5 gap-5">
                <div className="grid w-full gap-4 relative">
                  <Label htmlFor="organizationMail">
                    Organization Official Mail
                  </Label>
                  <Input
                    id="organizationMail"
                    type="email"
                    placeholder="For ex- rsai@gmail.com"
                    {...register('organizationMail')}
                  />
                  {errors.organizationMail && (
                    <span className="text-red-500 text-xs absolute -bottom-6">
                      {errors.organizationMail.message}
                    </span>
                  )}
                </div>
                <div className="grid w-full gap-4 relative">
                  <Label htmlFor="organizationPanCard">
                    PAN Card No (ADMIN)
                  </Label>
                  <Input
                    id="organizationPanCard"
                    placeholder="JYCPK2000A"
                    {...register('organizationPanCard')}
                  />
                  {errors.organizationPanCard && (
                    <span className="text-red-500 text-xs absolute -bottom-6">
                      {errors.organizationPanCard.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="grid w-full gap-4">
                <Label htmlFor="organizationWebsite">
                  Organization Website
                </Label>
                <Input
                  id="organizationWebsite"
                  placeholder="https://rsai.co.in"
                  {...register('organizationWebsite')}
                />
                {errors.organizationWebsite && (
                  <span className="text-red-500 text-xs">
                    {errors.organizationWebsite.message}
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Address Information</CardTitle>
            <CardDescription>
              Configure your organization address here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-5">
              <div className="grid w-full gap-4">
                <Label htmlFor="state">State</Label>
                <Input id="state" placeholder="Jaipur" {...register('state')} />
                {errors.state && (
                  <span className="text-red-500 text-xs">
                    {errors.state.message}
                  </span>
                )}
              </div>
              <div className="grid w-full gap-4">
                <Label htmlFor="district">District</Label>
                <Input
                  id="district"
                  placeholder="Pune"
                  {...register('district')}
                />
                {errors.district && (
                  <span className="text-red-500 text-xs">
                    {errors.district.message}
                  </span>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button
              disabled={isSubmitting}
              type="submit"
              className="flex gap-3 items-center"
            >
              {isSubmitting ? (
                <>
                  <LoaderIcon className="animate-spin" size={20} /> Loading
                </>
              ) : (
                <>Submit</>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
};

export default OrganizationSetting;
