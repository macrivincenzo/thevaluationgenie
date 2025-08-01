import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Building, MapPin, Briefcase } from "lucide-react";

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  phoneNumber: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  businessType: z.string().min(1, "Please select your role"),
  purposeForValuation: z.string().min(1, "Please select your primary purpose"),
  emailNotifications: z.boolean().default(true),
  marketingEmails: z.boolean().default(true),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileCompletionModalProps {
  isOpen: boolean;
  user: any;
  onClose: () => void;
}

export default function ProfileCompletionModal({ isOpen, user, onClose }: ProfileCompletionModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      company: user?.company || "",
      jobTitle: user?.jobTitle || "",
      phoneNumber: user?.phoneNumber || "",
      city: user?.city || "",
      state: user?.state || "",
      businessType: user?.businessType || "",
      purposeForValuation: "",
      emailNotifications: user?.emailNotifications ?? true,
      marketingEmails: user?.marketingEmails ?? true,
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (data: ProfileFormData) => {
      const response = await apiRequest("POST", "/api/auth/complete-profile", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Profile Updated",
        description: "Your profile has been completed successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      onClose();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    updateProfileMutation.mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Complete Your Profile</DialogTitle>
          <DialogDescription>
            Help us provide you with better service by completing your profile information.
            All fields marked with * are required.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <User className="w-4 h-4" />
                Personal Information
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name *</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name *</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address *</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input {...field} type="tel" placeholder="(555) 123-4567" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Professional Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <Briefcase className="w-4 h-4" />
                Professional Information
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company/Organization</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="jobTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="businessType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Role *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your primary role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="buyer">Business Buyer</SelectItem>
                        <SelectItem value="seller">Business Seller</SelectItem>
                        <SelectItem value="broker">Business Broker</SelectItem>
                        <SelectItem value="investor">Investor</SelectItem>
                        <SelectItem value="consultant">Consultant/Advisor</SelectItem>
                        <SelectItem value="owner">Current Business Owner</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="purposeForValuation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Purpose for Valuation *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="What's your main goal?" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="buying">Buying a business</SelectItem>
                        <SelectItem value="selling">Selling my business</SelectItem>
                        <SelectItem value="investment">Investment analysis</SelectItem>
                        <SelectItem value="advisory">Client advisory services</SelectItem>
                        <SelectItem value="curiosity">Market research/curiosity</SelectItem>
                        <SelectItem value="refinancing">Refinancing/lending</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Location Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <MapPin className="w-4 h-4" />
                Location Information
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="CA, NY, TX, etc." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Communication Preferences */}
            <div className="space-y-4">
              <div className="text-sm font-medium text-slate-700">Communication Preferences</div>
              
              <FormField
                control={form.control}
                name="emailNotifications"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Email notifications for account activity
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="marketingEmails"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Industry insights and market updates
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                className="flex-1"
                disabled={updateProfileMutation.isPending}
              >
                {updateProfileMutation.isPending ? "Saving..." : "Complete Profile"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={updateProfileMutation.isPending}
              >
                Skip for Now
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}