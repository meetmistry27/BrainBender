// import React from 'react';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios'; // For making API requests
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card.tsx";
// import { Button } from "../components/ui/button.tsx";
// import { Input } from "../components/ui/input.tsx";
// import { Label } from "../components/ui/label.tsx";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs.tsx";
// import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

// export function LoginSignupPage() {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = React.useState(false);

//   // Separate loading states for login and signup
//   const [isLoginLoading, setIsLoginLoading] = React.useState(false);
//   const [isSignupLoading, setIsSignupLoading] = React.useState(false);

//   // State to store feedback message
//   const [signupMessage, setSignupMessage] = React.useState<string | null>(null);
//   const [loginMessage, setLoginMessage] = React.useState<string | null>(null);

//   // Separate states for login and signup
//   const [loginData, setLoginData] = React.useState({
//     email: '',
//     password: ''
//   });

//   const [signupData, setSignupData] = React.useState({
//     name: '',
//     email: '',
//     password: ''
//   });

//   const [activeTab, setActiveTab] = React.useState('login'); // track active tab

//   // Handle input changes for login form
//   const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setLoginData({ ...loginData, [e.target.name]: e.target.value }); // Use 'name' instead of 'id'
//   };

//   // Handle input changes for signup form
//   const handleSignupInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSignupData({ ...signupData, [e.target.name]: e.target.value }); // Use 'name' instead of 'id'
//   };

//   // Submit login
//   const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setIsLoginLoading(true); // Set loading for login only
    
//     try {
//       // Call login API
//       const response = await axios.post('http://localhost:5000/users/login', {
//         email: loginData.email,
//         password: loginData.password
//       });

//       // Store JWT in localStorage and navigate
//       if (response.data.token) {
//         localStorage.setItem('authToken', response.data.token);
//         navigate('/profile'); // Redirect to dashboard after login
//       }
//     } catch (error) {
//       console.error("Error during login", error);
//       setLoginMessage('Login failed. Please try again.');
//     } finally {
//       setIsLoginLoading(false); // Stop loading for login
//     }
//   };

//   // Submit signup
//   const handleSignupSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setIsSignupLoading(true);
//     setSignupMessage(null); // Reset message

//     try {
//         const response = await axios.post('http://localhost:5000/users/register', {
//             name: signupData.name,
//             email: signupData.email,
//             password: signupData.password
//         });

//         // Check if response status is 201 for success
//         if (response.status === 201) {
//             setSignupMessage('Account created successfully!');
//             setTimeout(() => {
//                 navigate('/profile');
//             }, 1000); // Wait 1 second before redirecting
//         } else {
//             setSignupMessage('Signup failed. Please try again.');
//         }
//     } catch (error) {
//         // Log the error details for better debugging
//         console.error('Error in signup:', error);

//         // Check if there's an error response from the server
//         if (axios.isAxiosError(error) && error.response) {
//             console.error('Server response error:', error.response.data);
//             setSignupMessage(`Signup failed: ${error.response.data.message || 'Unknown error'}`);
//         } else {
//             setSignupMessage('Signup failed. Please try again.');
//         }
//     } finally {
//         setIsSignupLoading(false); // Stop loading state
//     }
// };


//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="w-full max-w-md"
//       >
//         <Card>
//           <CardHeader className="space-y-1">
//             <CardTitle className="text-2xl font-bold text-center">Welcome to QuizMaster</CardTitle>
//             <CardDescription className="text-center">Enter your details to get started</CardDescription>
//           </CardHeader>
//           <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//             <TabsList className="grid w-full grid-cols-2">
//               <TabsTrigger value="login">Login</TabsTrigger>
//               <TabsTrigger value="signup">Sign Up</TabsTrigger>
//             </TabsList>

//             {/* Login Form */}
//             <TabsContent value="login">
//               <form onSubmit={handleLoginSubmit}>
//                 <CardContent className="space-y-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="login-email">Email</Label>
//                     <div className="relative">
//                       <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                       <Input
//                         id="login-email"
//                         name="email" // Change to name
//                         type="email"
//                         placeholder="m@example.com"
//                         className="pl-9"
//                         required
//                         value={loginData.email}
//                         onChange={handleLoginInputChange}
//                       />
//                     </div>
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="login-password">Password</Label>
//                     <div className="relative">
//                       <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                       <Input
//                         id="login-password"
//                         name="password" // Change to name
//                         type={showPassword ? "text" : "password"}
//                         className="pl-9 pr-9"
//                         required
//                         value={loginData.password}
//                         onChange={handleLoginInputChange}
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowPassword(!showPassword)}
//                         className="absolute right-3 top-3 text-gray-400"
//                       >
//                         {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                       </button>
//                     </div>
//                   </div>
//                   {loginMessage && (
//                     <div className="text-red-500 text-sm">{loginMessage}</div>
//                   )}
//                 </CardContent>
//                 <CardFooter className="flex flex-col space-y-4">
//                   <Button type="submit" className="w-full" disabled={isLoginLoading}>
//                     {isLoginLoading ? "Logging in..." : "Login"}
//                   </Button>
//                 </CardFooter>
//               </form>
//             </TabsContent>

//             {/* Signup Form */}
//             <TabsContent value="signup">
//               <form onSubmit={handleSignupSubmit}>
//                 <CardContent className="space-y-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="signup-name">Name</Label>
//                     <div className="relative">
//                       <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                       <Input
//                         id="signup-name"
//                         name="name" // Change to name
//                         placeholder="John Doe"
//                         className="pl-9"
//                         required
//                         value={signupData.name}
//                         onChange={handleSignupInputChange}
//                       />
//                     </div>
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="signup-email">Email</Label>
//                     <div className="relative">
//                       <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                       <Input
//                         id="signup-email"
//                         name="email" // Change to name
//                         type="email"
//                         placeholder="m@example.com"
//                         className="pl-9"
//                         required
//                         value={signupData.email}
//                         onChange={handleSignupInputChange}
//                       />
//                     </div>
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="signup-password">Password</Label>
//                     <div className="relative">
//                       <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                       <Input
//                         id="signup-password"
//                         name="password" // Change to name
//                         type={showPassword ? "text" : "password"}
//                         className="pl-9 pr-9"
//                         required
//                         value={signupData.password}
//                         onChange={handleSignupInputChange}
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowPassword(!showPassword)}
//                         className="absolute right-3 top-3 text-gray-400"
//                       >
//                         {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                       </button>
//                     </div>
//                   </div>
//                   {signupMessage && (
//                     <div className={`text-sm ${signupMessage.includes("successfully") ? "text-green-500" : "text-red-500"}`}>
//                       {signupMessage}
//                     </div>
//                   )}
//                 </CardContent>
//                 <CardFooter className="flex flex-col space-y-4">
//                   <Button type="submit" className="w-full" disabled={isSignupLoading}>
//                     {isSignupLoading ? "Creating Account..." : "Create Account"}
//                   </Button>
//                 </CardFooter>
//               </form>
//             </TabsContent>
//           </Tabs>
//         </Card>
//       </motion.div>
//     </div>
//   );
// }


import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // For making API requests
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card.tsx";
import { Button } from "../components/ui/button.tsx";
import { Input } from "../components/ui/input.tsx";
import { Label } from "../components/ui/label.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs.tsx";
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export function LoginSignupPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  // Separate loading states for login and signup
  const [isLoginLoading, setIsLoginLoading] = React.useState(false);
  const [isSignupLoading, setIsSignupLoading] = React.useState(false);

  // State to store feedback message
  const [signupMessage, setSignupMessage] = React.useState<string | null>(null);
  const [loginMessage, setLoginMessage] = React.useState<string | null>(null);

  // Separate states for login and signup
  const [loginData, setLoginData] = React.useState({
    email: '',
    password: ''
  });

  const [signupData, setSignupData] = React.useState({
    name: '',
    email: '',
    password: ''
  });

  const [activeTab, setActiveTab] = React.useState('login'); // track active tab

  // Handle input changes for login form
  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // Handle input changes for signup form
  const handleSignupInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  // Submit login
  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoginLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/users/login', {
        email: loginData.email,
        password: loginData.password
      });
        
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        //const { userName, userEmail } = response.data;
        localStorage.setItem('userName', response.data.user.name);
        localStorage.setItem('userEmail', response.data.user.email);
        navigate('/profile');
      }
    } catch (error) {
      console.error("Error during login", error);
      setLoginMessage('Login failed. Please try again.');
    } finally {
      setIsLoginLoading(false);
    }
  };

  // Submit signup
  const handleSignupSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSignupLoading(true);
    setSignupMessage(null);

    try {
      const response = await axios.post('http://localhost:5000/users/register', {
        name: signupData.name,
        email: signupData.email,
        password: signupData.password
      });

      if (response.status === 201) {
        setSignupMessage('Account created successfully!');
      localStorage.setItem('userName', signupData.name);
      localStorage.setItem('userEmail', signupData.email);
        setTimeout(() => {
          navigate('/profile');
        }, 1000);
      } else {
        setSignupMessage('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Error in signup:', error);

      if (axios.isAxiosError(error) && error.response) {
        setSignupMessage(`Signup failed: ${error.response.data.message || 'Unknown error'}`);
      } else {
        setSignupMessage('Signup failed. Please try again.');
      }
    } finally {
      setIsSignupLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Welcome to QuizMaster</CardTitle>
            <CardDescription className="text-center">Enter your details to get started</CardDescription>
          </CardHeader>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* Login Form */}
            <TabsContent value="login">
              <form onSubmit={handleLoginSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-email"
                        name="email"
                        type="email"
                        placeholder="m@example.com"
                        className="pl-9"
                        required
                        value={loginData.email}
                        onChange={handleLoginInputChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        className="pl-9 pr-9"
                        required
                        value={loginData.password}
                        onChange={handleLoginInputChange}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  {loginMessage && (
                    <div className="text-red-500 text-sm">{loginMessage}</div>
                  )}
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button type="submit" className="w-full" disabled={isLoginLoading}>
                    {isLoginLoading ? "Logging in..." : "Login"}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>

            {/* Signup Form */}
            <TabsContent value="signup">
              <form onSubmit={handleSignupSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-name"
                        name="name"
                        placeholder="John Doe"
                        className="pl-9"
                        required
                        value={signupData.name}
                        onChange={handleSignupInputChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-email"
                        name="email"
                        type="email"
                        placeholder="m@example.com"
                        className="pl-9"
                        required
                        value={signupData.email}
                        onChange={handleSignupInputChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        className="pl-9 pr-9"
                        required
                        value={signupData.password}
                        onChange={handleSignupInputChange}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  {signupMessage && (
                    <div className={`text-sm ${signupMessage.includes("successfully") ? "text-green-500" : "text-red-500"}`}>
                      {signupMessage}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button type="submit" className="w-full" disabled={isSignupLoading}>
                    {isSignupLoading ? "Signing up..." : "Sign Up"}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </motion.div>
    </div>
  );
}
