// import { createContext, useContext, useState, useEffect } from 'react';
// import { useDatabase } from './database-context';

// // Define user type
// export interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: string;
// }

// // Define auth context type
// interface AuthContextType {
//   user: User | null;
//   loading: boolean;
//   error: string | null;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => void;
//   register: (name: string, email: string, password: string) => Promise<void>;
// }

// // Create auth context
// const AuthContext = createContext<AuthContextType>({
//   user: null,
//   loading: true,
//   error: null,
//   login: async () => {},
//   logout: () => {},
//   register: async () => {}
// });

// // Auth provider component
// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const db = useDatabase();

//   // Check for existing session on mount
//   useEffect(() => {
//     const checkSession = async () => {
//       try {
//         // In a real app, this would check for a valid session token
//         // For demo purposes, we'll auto-login as the demo user
//         const demoUser = await db.getUserByEmail('demo@example.com');

//         if (demoUser) {
//           setUser({
//             id: demoUser.id,
//             name: demoUser.name,
//             email: demoUser.email,
//             role: demoUser.role
//           });
//         }

//         setLoading(false);
//       } catch (err) {
//         setError('Failed to check session: ' + (err instanceof Error ? err.message : String(err)));
//         setLoading(false);
//       }
//     };

//     checkSession();
//   }, [db]);

//   // Login function
//   const login = async (email: string, password: string) => {
//     try {
//       setLoading(true);
//       setError(null);

//       // In a real app, this would validate credentials against the database
//       // For demo purposes, we'll just check if the user exists
//       const user = await db.getUserByEmail(email);

//       if (!user) {
//         throw new Error('Invalid email or password');
//       }

//       // In a real app, this would verify the password hash
//       // For demo purposes, we'll skip password verification

//       setUser({
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         role: user.role
//       });

//       setLoading(false);
//     } catch (err) {
//       setError('Login failed: ' + (err instanceof Error ? err.message : String(err)));
//       setLoading(false);
//       throw err;
//     }
//   };

//   // Logout function
//   const logout = () => {
//     // In a real app, this would invalidate the session token
//     setUser(null);
//   };

//   // Register function
//   const register = async (name: string, email: string, password: string) => {
//     try {
//       setLoading(true);
//       setError(null);

//       // Check if user already exists
//       const existingUser = await db.getUserByEmail(email);

//       if (existingUser) {
//         throw new Error('Email already in use');
//       }

//       // In a real app, this would hash the password
//       // For demo purposes, we'll use a placeholder hash
//       const passwordHash = '$2a$10$demopasswordhashvalue';

//       // Create new user
//       const userId = await db.createUser({
//         id: `user_${Date.now()}`,
//         name,
//         email,
//         passwordHash,
//         role: 'user',
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString()
//       });

//       // Get the created user
//       const newUser = await db.getUser(userId);

//       if (!newUser) {
//         throw new Error('Failed to create user');
//       }

//       // Set the user in state
//       setUser({
//         id: newUser.id,
//         name: newUser.name,
//         email: newUser.email,
//         role: newUser.role
//       });

//       setLoading(false);
//     } catch (err) {
//       setError('Registration failed: ' + (err instanceof Error ? err.message : String(err)));
//       setLoading(false);
//       throw err;
//     }
//   };

//   // Context value
//   const value = {
//     user,
//     loading,
//     error,
//     login,
//     logout,
//     register
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// // Hook to use auth context
// export function useAuth() {
//   const context = useContext(AuthContext);

//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }

//   return context;
// }


import { createContext, useContext, useState, useEffect } from 'react';
import { useDatabase } from './database-context';

// Define user type
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

// Define auth context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
}

// Create auth context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  login: async () => { },
  logout: () => { },
  register: async () => { }
});

// Auth provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // const db = useDatabase();


  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        // const demoUser = await db.getUserByEmail('demo@example.com');
        const res = await fetch('/api/users/me')
        const data: any = await res.json()
        if (data) {
          setUser({
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            role: data.user.role
          });
        }
        setLoading(false);
      } catch (err) {
        if (!user) {
          setLoading(false);
          return
        }
        setError('Failed to check session: ' + (err instanceof Error ? err.message : String(err)));
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) {
        throw new Error(`Login request failed: ${res.statusText}`);
      }

      const loggedUser: any = await res.json();
      console.log(loggedUser)
      if (!loggedUser) {
        throw new Error('Invalid email or password');
      }

      setUser({
        id: loggedUser.user.id,
        name: loggedUser.user.name,
        email: loggedUser.user.email,
        role: loggedUser.user.role
      });


      setLoading(false);
    } catch (err) {
      setError('Login failed: ' + (err instanceof Error ? err.message : String(err)));
      setLoading(false);
      throw err;
    }
  };

  // Logout function
  const logout = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/auth/logout');
    }
    // In a real app, this would invalidate the session token
    setUser(null);
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);


      const res = await fetch('api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password })
      });
      const data: any = await res.json()
      console.log(data)

      const existingUser = data.error == "Email already in use"
      if (existingUser) {
        throw new Error('Email already in use');
      }
      const newUser = data;
      // const passwordHash = '$2a$10$demopasswordhashvalue';

      // const userId = await db.createUser({
      //   id: `user_${Date.now()}`,
      //   name,
      //   email,
      //   passwordHash,
      //   role: 'user',
      //   createdAt: new Date().toISOString(),
      //   updatedAt: new Date().toISOString()
      // });

      // const newUser = await db.getUser(userId);
      // if (!newUser) {
      //   throw new Error('Failed to create user');
      // }

      setUser({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      });

      setLoading(false);
    } catch (err) {
      setError('Registration failed: ' + (err instanceof Error ? err.message : String(err)));
      setLoading(false);
      throw err;
    }
  };

  // Context value
  const value = {
    user,
    loading,
    error,
    login,
    logout,
    register
  };

  console.log(value)

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use auth context
export function useAuth() {
  return useContext(AuthContext);
}