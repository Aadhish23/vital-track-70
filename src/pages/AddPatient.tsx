import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { DashboardLayout } from '@/components/shared/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ArrowLeft, Mail, CalendarIcon, User, Loader2, CheckCircle, Users, Heart, Lock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export const AddPatient: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dob: undefined as Date | undefined,
    phone: '',
    familyName: '',
    familyEmail: '',
    familyRelationship: '',
  });
  const [dobPopoverOpen, setDobPopoverOpen] = useState(false);

  const errors = useMemo(() => {
    const newErrors: Record<string, string> = {};

    if (touched.name && !formData.name.trim()) {
      newErrors.name = 'Patient name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (touched.email) {
      if (!formData.email.trim()) {
        newErrors.email = 'Patient email is required';
      } else if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    if (touched.dob && formData.dob) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (formData.dob > today) {
        newErrors.dob = 'Date of birth cannot be in the future';
      }
      
      const age = today.getFullYear() - formData.dob.getFullYear();
      if (age > 120) {
        newErrors.dob = 'Please enter a valid date of birth';
      }
    }

    if (touched.familyEmail && formData.familyEmail && !emailRegex.test(formData.familyEmail)) {
      newErrors.familyEmail = 'Please enter a valid email address';
    }

    return newErrors;
  }, [formData, touched]);

  const isFormValid = useMemo(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return formData.name.trim() !== '' && emailRegex.test(formData.email);
  }, [formData.name, formData.email]);

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all required fields as touched
    setTouched({ name: true, email: true, dob: true });

    if (!isFormValid) return;

    setIsLoading(true);

    try {
      // Build payload
      const hasFamilyData = formData.familyName || formData.familyEmail || formData.familyRelationship;
      
      const payload: Record<string, unknown> = {
        patient_name: formData.name,
        patient_email: formData.email,
        dob: formData.dob ? format(formData.dob, 'ddMMyyyy') : undefined,
        phone: formData.phone || undefined,
      };

      if (hasFamilyData) {
        payload.family_member = {
          name: formData.familyName || undefined,
          email: formData.familyEmail || undefined,
          relationship: formData.familyRelationship || undefined,
        };
      }

      // Simulate API call
      console.log('Submitting payload:', JSON.stringify(payload, null, 2));
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast({
        title: 'Patient Added Successfully',
        description: `${formData.name} has been added to your patient list.`,
      });

      navigate('/clinic');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add patient. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-4 fade-in">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Add New Patient</h1>
            <p className="text-muted-foreground">Register a new patient to the system</p>
          </div>
        </div>

        <Card variant="glass" className="fade-in" style={{ animationDelay: '0.1s' }}>
          <CardHeader>
            <CardTitle>Patient Information</CardTitle>
            <CardDescription>
              Enter the patient's details. They will receive login credentials via email.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Patient Full Name - Required */}
              <div className="space-y-2">
                <Label htmlFor="name">
                  Patient Full Name <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onBlur={() => handleBlur('name')}
                    className="pl-10"
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                </div>
                {errors.name && (
                  <p id="name-error" className="text-sm text-rose-400" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Patient Email - Required */}
              <div className="space-y-2">
                <Label htmlFor="email">
                  Patient Email Address <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onBlur={() => handleBlur('email')}
                    className="pl-10"
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                </div>
                {errors.email && (
                  <p id="email-error" className="text-sm text-rose-400" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Date of Birth - Calendar Picker */}
              <div className="space-y-2">
                <Label htmlFor="dob">
                  Date of Birth (Password) 
                  <span className="ml-2 text-xs text-blue-600 font-normal">✓ Used as password</span>
                </Label>
                <Popover open={dobPopoverOpen} onOpenChange={setDobPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      id="dob"
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.dob && "text-muted-foreground",
                        errors.dob && "border-rose-400"
                      )}
                      onBlur={() => handleBlur('dob')}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.dob ? (
                        <span className="flex items-center gap-2">
                          {format(formData.dob, 'PPP')}
                          <span className="text-xs text-muted-foreground">→ Password: {format(formData.dob, 'ddMMyyyy')}</span>
                        </span>
                      ) : (
                        <span>Pick date of birth (will be used as password)</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.dob}
                      onSelect={(date) => {
                        setFormData({ ...formData, dob: date });
                        setDobPopoverOpen(false);
                        handleBlur('dob');
                      }}
                      disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                      initialFocus
                      defaultMonth={new Date(1990, 0)}
                    />
                  </PopoverContent>
                </Popover>
                <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <Lock className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-blue-900">
                    <p className="font-semibold">Password automatically set</p>
                    <p className="text-blue-700 mt-1">The date of birth in DDMMYYYY format will be the patient's login password. No manual entry needed.</p>
                    {formData.dob && (
                      <p className="mt-2 font-mono font-bold text-blue-600">Password: {format(formData.dob, 'ddMMyyyy')}</p>
                    )}
                  </div>
                </div>
                {errors.dob && (
                  <p id="dob-error" className="text-sm text-rose-400" role="alert">
                    {errors.dob}
                  </p>
                )}
              </div>

              {/* Phone - Optional */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              {/* Family Member Section */}
              <div className="border-t border-border pt-6 mt-6">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Family Member Details</h3>
                  <span className="text-xs text-muted-foreground">(Optional)</span>
                </div>

                <div className="space-y-4">
                  {/* Family Name */}
                  <div className="space-y-2">
                    <Label htmlFor="familyName">Family Member Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="familyName"
                        placeholder="Jane Doe"
                        value={formData.familyName}
                        onChange={(e) => setFormData({ ...formData, familyName: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Family Email */}
                  <div className="space-y-2">
                    <Label htmlFor="familyEmail">Family Member Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="familyEmail"
                        type="email"
                        placeholder="jane@email.com"
                        value={formData.familyEmail}
                        onChange={(e) => setFormData({ ...formData, familyEmail: e.target.value })}
                        onBlur={() => handleBlur('familyEmail')}
                        className="pl-10"
                        aria-invalid={!!errors.familyEmail}
                        aria-describedby={errors.familyEmail ? 'family-email-error' : undefined}
                      />
                    </div>
                    {errors.familyEmail && (
                      <p id="family-email-error" className="text-sm text-rose-400" role="alert">
                        {errors.familyEmail}
                      </p>
                    )}
                  </div>

                  {/* Relationship */}
                  <div className="space-y-2">
                    <Label htmlFor="familyRelationship">Relationship</Label>
                    <div className="relative">
                      <Heart className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="familyRelationship"
                        placeholder="e.g., Daughter, Son, Spouse"
                        value={formData.familyRelationship}
                        onChange={(e) => setFormData({ ...formData, familyRelationship: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="button" variant="outline" onClick={() => navigate(-1)} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" className="flex-1" disabled={isLoading || !isFormValid}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Adding Patient...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Add Patient
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AddPatient;
