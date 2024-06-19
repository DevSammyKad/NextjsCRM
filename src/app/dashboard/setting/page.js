'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Toaster, toast } from 'sonner';

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
import FileUploaderTest from '@/components/FileUploader';
import { Textarea } from '@/components/ui/textarea';
import GeneralSection from './_components/GeneralSection';
import SecuritySection from './_components/SecuritySection';
import IntegrationsSection from './_components/IntegrationsSection';
import SupportSection from './_components/SupportSection';
import OrganizationSetting from './_components/OrganizationSetting';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('organization');

  useEffect(() => {
    const hash = window.location.hash.replace('#');
    if (hash) {
      setActiveSection(hash);
    }
  }, []);

  const renderSection = () => {
    switch (activeSection) {
      case 'general':
        return <GeneralSection />;
      case 'security':
        return <SecuritySection />;
      case 'integrations':
        return <IntegrationsSection />;
      case 'support':
        return <SupportSection />;
      case 'organization':
        return <OrganizationSetting />;
      case 'advanced':
        return <AdvancedSection />;
      default:
        return <GeneralSection />;
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto flex flex-col w-full max-w-6xl items-start gap-6">
          <nav className="flex gap-4 text-sm my-5 text-muted-foreground">
            <a
              href="#"
              className={`font-semibold ${
                activeSection === 'general' ? 'text-primary' : ''
              }`}
              onClick={() => setActiveSection('general')}
            >
              General
            </a>
            <a
              href="#"
              className={activeSection === 'security' ? 'text-primary' : ''}
              onClick={() => setActiveSection('security')}
            >
              Security
            </a>
            <a
              href="#"
              className={activeSection === 'integrations' ? 'text-primary' : ''}
              onClick={() => setActiveSection('integrations')}
            >
              Integrations
            </a>
            <a
              href="#"
              className={activeSection === 'support' ? 'text-primary' : ''}
              onClick={() => setActiveSection('support')}
            >
              Support
            </a>
            <a
              href="#"
              className={activeSection === 'organization' ? 'text-primary' : ''}
              onClick={() => setActiveSection('organization')}
            >
              Organization
            </a>
            {/* <a
              href="#"
              className={activeSection === 'advanced' ? 'text-primary' : ''}
              onClick={() => setActiveSection('advanced')}
            >
              Advanced
            </a> */}
          </nav>
          <div className="grid gap-6 w-full">{renderSection()}</div>
        </div>
      </main>
    </div>
  );
};

const AdvancedSection = () => (
  <Card>
    <CardHeader>
      <CardTitle>Advanced Settings</CardTitle>
      <CardDescription>Configure your advanced settings here.</CardDescription>
    </CardHeader>
    <CardContent>
      <form>
        <Input placeholder="Advanced Setting" />
      </form>
    </CardContent>
    <CardFooter className="border-t px-6 py-4">
      <Button>Save</Button>
    </CardFooter>
  </Card>
);

export default Settings;
