"use client";

import { useEffect } from 'react';
import ProfileForm from '@/components/auth/ProfileForm';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function ProfilePage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      toast({ title: "Authentication Required", description: "Please login to view your profile.", variant: "destructive" });
      router.push('/login?redirect=/profile');
    }
    
    if (searchParams.get('editAddress') === 'true' && !loading && isAuthenticated) {
        toast({ title: "Update Address", description: "Please update your shipping address to proceed."});
        // Optionally scroll to address section or highlight it
        const addressSection = document.getElementById('street'); // Assuming street input has this id
        addressSection?.focus();
    }

  }, [isAuthenticated, loading, router, toast, searchParams]);

  if (loading || !isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-16 w-16 animate-spin text-primary mb-4" />
        <p className="text-lg text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <ProfileForm />
    </div>
  );
}
