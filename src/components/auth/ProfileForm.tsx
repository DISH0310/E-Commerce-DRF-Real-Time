"use client";

import { useState, useEffect, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import type { UserProfile, Address } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { Loader2, UserCircle } from 'lucide-react';
import { Separator } from '../ui/separator';

export default function ProfileForm() {
  const { user, updateProfile, loading: authLoading } = useAuth();
  const { toast } = useToast();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setStateVal] = useState(''); // Renamed to avoid conflict with React's state
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || ''); // Email might not be updatable, display only
      setPhone(user.phone || '');
      setStreet(user.address?.street || '');
      setCity(user.address?.city || '');
      setStateVal(user.address?.state || '');
      setZipCode(user.address?.zipCode || '');
      setCountry(user.address?.country || '');
    }
  }, [user]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const addressData: Address = { street, city, state, zipCode, country };
    const profileData: Partial<UserProfile> = { name, phone, address: addressData };

    try {
      await updateProfile(profileData);
      toast({ title: 'Profile Updated', description: 'Your profile information has been saved.' });
    } catch (err: any) {
      toast({ title: 'Update Failed', description: err.message || 'Could not update profile.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const isLoading = authLoading || isSubmitting;

  if (authLoading && !user) {
    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <div className="flex items-center space-x-3 mb-2">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <CardTitle className="text-2xl">Loading Profile...</CardTitle>
                </div>
                <CardDescription>Fetching your profile details.</CardDescription>
            </CardHeader>
             <CardContent className="space-y-4">
                <div className="h-10 bg-muted rounded animate-pulse"></div>
                <div className="h-10 bg-muted rounded animate-pulse"></div>
                <div className="h-10 bg-muted rounded animate-pulse"></div>
             </CardContent>
        </Card>
    )
  }


  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <div className="flex items-center space-x-3 mb-2">
            <UserCircle className="h-10 w-10 text-primary"/>
            <CardTitle className="text-3xl">Your Profile</CardTitle>
        </div>
        <CardDescription>View and update your personal information and address.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">Personal Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} disabled={isLoading} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email (Cannot be changed)</Label>
                <Input id="email" type="email" value={email} readOnly disabled className="bg-muted/50 cursor-not-allowed" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} disabled={isLoading} />
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">Shipping Address</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="street">Street Address</Label>
                <Input id="street" value={street} onChange={(e) => setStreet(e.target.value)} disabled={isLoading} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} disabled={isLoading} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State / Province</Label>
                <Input id="state" value={state} onChange={(e) => setStateVal(e.target.value)} disabled={isLoading} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP / Postal Code</Label>
                <Input id="zipCode" value={zipCode} onChange={(e) => setZipCode(e.target.value)} disabled={isLoading} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" value={country} onChange={(e) => setCountry(e.target.value)} disabled={isLoading} />
              </div>
            </div>
          </div>
          
          <Button type="submit" className="w-full sm:w-auto text-lg py-3 px-6" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
            Save Changes
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
