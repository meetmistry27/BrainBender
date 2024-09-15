import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from "../components/ui/button.tsx";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card.tsx";
import { User, Mail, Key, AlertTriangle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs.tsx";
import { Label } from './ui/label.tsx'
import { Input } from './ui/input.tsx';

interface UserProfile {
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

const mockUserProfile: UserProfile = {
  name: "John Doe",
  email: "john.doe@example.com",
  createdAt: "2023-01-15T10:30:00Z",
  updatedAt: "2023-06-20T14:45:00Z"
};

export default function ProfilePage() {
  const [isEditing, setIsEditing] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <nav className="mb-8">
        <ul className="flex space-x-4 justify-center">
          {['Home', 'Quizzes', 'Analytics', 'Profile'].map((item) => (
            <li key={item}>
              <Link
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  item === 'Profile' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="max-w-4xl mx-auto">
        <motion.h1
          className="text-4xl font-bold mb-8 text-center text-primary"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Your Profile
        </motion.h1>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Profile Information</TabsTrigger>
            <TabsTrigger value="security">Security Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>View and manage your profile details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <div className="flex items-center space-x-2">
                    <User className="text-gray-500" />
                    <Input
                      id="name"
                      defaultValue={mockUserProfile.name}
                      readOnly={!isEditing}
                      className={isEditing ? "border-primary" : ""}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="flex items-center space-x-2">
                    <Mail className="text-gray-500" />
                    <Input
                      id="email"
                      type="email"
                      defaultValue={mockUserProfile.email}
                      readOnly={!isEditing}
                      className={isEditing ? "border-primary" : ""}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={''}>Account Created</Label>
                  <div className="text-sm text-gray-500">
                    {new Date(mockUserProfile.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={''}>Last Updated</Label>
                  <div className="text-sm text-gray-500">
                    {new Date(mockUserProfile.updatedAt).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                {isEditing ? (
                  <div className="flex space-x-2 w-full">
                    <Button className="flex-1" onClick={() => setIsEditing(false)}>Save Changes</Button>
                    <Button variant="outline" className="flex-1" onClick={() => setIsEditing(false)}>Cancel</Button>
                  </div>
                ) : (
                  <Button className="w-full" onClick={() => setIsEditing(true)}>Edit Profile</Button>
                )}
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <div className="flex items-center space-x-2">
                    <Key className="text-gray-500" />
                    <Input id="current-password" type="password" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <div className="flex items-center space-x-2">
                    <Key className="text-gray-500" />
                    <Input id="new-password" type="password" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <div className="flex items-center space-x-2">
                    <Key className="text-gray-500" />
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
                <div className="flex items-center p-4 text-amber-800 bg-amber-50 rounded-md">
                  <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                  <p className="text-sm">Ensure your new password is strong and unique.</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Update Password</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
