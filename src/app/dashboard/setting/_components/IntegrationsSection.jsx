import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Image from 'next/image';
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from '@/components/ui/card';

import whatsapp from '../../../../../public/whatsapp.png';
import facebook from '../../../../../public/facebook.png';

const IntegrationsSection = () => {
  const [generatedAPIKey, setGeneratedAPIKey] = useState(null);

  const generateAPI = () => {
    const crypto = require('crypto');
    const newAPIKey = crypto.randomBytes(18).toString('hex');
    setGeneratedAPIKey(newAPIKey);
    toast.success(`API key: ${newAPIKey}`);
    console.log(`API key ${newAPIKey} generated successfully`);
  };

  const copyToClipboard = () => {
    if (generatedAPIKey) {
      navigator.clipboard.writeText(generatedAPIKey).then(
        () => {
          toast.success('API key copied to clipboard!');
        },
        () => {
          toast.error('Failed to copy API key!');
        }
      );
    }
  };

  return (
    <>
      <div className="grid gap-5">
        <Card>
          <CardHeader>
            <CardTitle className="flex">Secret API key</CardTitle>
            <CardDescription>
              Copy this API_KEY and use in Pabbly Connect
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex w-full gap-5">
              <div className="w-[40%] border-dashed border flex justify-start items-center px-5 dark:border-white rounded-lg">
                <input
                  type="text"
                  value={generatedAPIKey || ''}
                  readOnly
                  placeholder="Click on generate"
                  className="w-full text-white bg-transparent focus:border-none focus:outline-none"
                />
              </div>
              <Button disabled={!generatedAPIKey} onClick={copyToClipboard}>
                Copy
              </Button>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4 flex">
            <Button onClick={generateAPI}>Generate API_KEY</Button>
          </CardFooter>
        </Card>
      </div>
      <div className="gird space-y-5 gap-10">
        <Card className="">
          <CardHeader>
            <CardTitle className="flex items-center justify-between my-2">
              <div className="flex items-center gap-5">
                <Image src={whatsapp} width={50} height={50} alt="WhatsApp" />
                <div>WhatsApp API</div>
              </div>
              <Button variant="outline" type="button">
                Connect
              </Button>
            </CardTitle>
            <CardDescription>
              Copy this API_KEY and use in Pabbly Connect
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex w-full gap-5"></div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4 flex justify-end">
            <Button>View Integration</Button>
          </CardFooter>
        </Card>
        <Card className="">
          <CardHeader>
            <CardTitle className="flex items-center justify-between my-2">
              <div className="flex items-center gap-5">
                <Image src={facebook} width={50} height={50} alt="WhatsApp" />
                <div>FaceBook Lead's</div>
              </div>
              <Button variant="outline" type="button">
                Connect
              </Button>
            </CardTitle>
            <CardDescription>
              Copy this API_KEY and use in Pabbly Connect
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex w-full gap-5"></div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4 flex justify-end">
            <Button>View Integration</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default IntegrationsSection;
