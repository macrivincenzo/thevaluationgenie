import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Mail, Phone, MapPin, Briefcase, Calendar } from "lucide-react";

export default function CustomerData() {
  const { user, isAuthenticated } = useAuth();
  const [showEmail] = useState(false);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-slate-50 p-4">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-8 text-center">
              <h2 className="text-xl font-semibold mb-2">Access Required</h2>
              <p className="text-slate-600">Please log in to view customer data.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const userData = user as any;

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Customer Data Management</h1>
          <p className="text-slate-600">
            Comprehensive customer information collected for service delivery and support.
          </p>
        </div>

        {/* User Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Full Name</label>
                <p className="text-slate-900">{userData.firstName} {userData.lastName}</p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                <p className="text-slate-900">
                  {showEmail ? userData.email : '***@***.com'}
                  <Button variant="link" className="p-0 h-auto ml-2 text-blue-600">
                    {showEmail ? 'Hide' : 'Show'}
                  </Button>
                </p>
              </div>

              {userData.phoneNumber && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </label>
                  <p className="text-slate-900">{userData.phoneNumber}</p>
                </div>
              )}

              {userData.company && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    Company
                  </label>
                  <p className="text-slate-900">{userData.company}</p>
                </div>
              )}
            </div>

            {(userData.city || userData.state) && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  Location
                </label>
                <p className="text-slate-900">
                  {userData.city && userData.state 
                    ? `${userData.city}, ${userData.state}`
                    : userData.city || userData.state || 'Not provided'
                  }
                </p>
              </div>
            )}

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-slate-700">Profile Status:</label>
              <Badge variant={userData.profileComplete ? "default" : "secondary"}>
                {userData.profileComplete ? "Complete" : "Incomplete"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Professional Context */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Professional Context
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userData.businessType && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Role/Type</label>
                  <p className="text-slate-900 capitalize">{userData.businessType.replace('_', ' ')}</p>
                </div>
              )}

              {userData.jobTitle && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Job Title</label>
                  <p className="text-slate-900">{userData.jobTitle}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Account Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Account Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Account Created</label>
                <p className="text-slate-900">
                  {userData.createdAt 
                    ? new Date(userData.createdAt).toLocaleDateString()
                    : 'Not available'
                  }
                </p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Last Login</label>
                <p className="text-slate-900">
                  {userData.lastLoginAt 
                    ? new Date(userData.lastLoginAt).toLocaleDateString()
                    : 'Not available'
                  }
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Email Notifications</label>
                <Badge variant={userData.emailNotifications ? "default" : "secondary"}>
                  {userData.emailNotifications ? "Enabled" : "Disabled"}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Marketing Emails</label>
                <Badge variant={userData.marketingEmails ? "default" : "secondary"}>
                  {userData.marketingEmails ? "Enabled" : "Disabled"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Collection Notice */}
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              </div>
              <div>
                <h4 className="font-medium text-blue-900 mb-1">Data Collection & Privacy</h4>
                <p className="text-sm text-blue-800">
                  All customer data is collected with consent and used exclusively for service delivery, 
                  customer support, and communication. We implement industry-standard security measures 
                  to protect your information. Users can update preferences and request data deletion 
                  through their account settings.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}