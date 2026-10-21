import { createContext, useEffect, useState } from "react";
import auth from "../config/firebase.config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext();


export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    const [userRole, setUserRole] = useState(null);
    const [userRoleLoading, setUserRoleLoading] = useState(true)


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            if (!currentUser) {
                setUserRole(null);
                setUserRoleLoading(false);
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        let isMounted = true;
        if (user) {
            setUserRoleLoading(true);
            user.getIdToken()
                .then(token => {
                    return axios.get(`${import.meta.env.VITE_API_URL}/api/user/role-check`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                })
                .then(response => {
                    if (!isMounted) return;
                    if (response?.data?.success) {
                        setUserRole(response?.data?.data?.role ?? 'user');
                    } else {
                        setUserRole(null);
                    }
                    setUserRoleLoading(false);
                })
                .catch(error => {
                    if (!isMounted) return;
                    console.error("Role check failed:", error);
                    setUserRole(null);
                    setUserRoleLoading(false);
                });
        }
        return () => {
            isMounted = false;
        };
    }, [user]);

    const registerUser = async (fullName, email, password) => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(result.user, {
                displayName: fullName
            })
            setUser(result.user)
            return {
                success: true,
                message: 'Registration Successfully',
                resposne: result
            }
        } catch (error) {
            return {
                error: true,
                message: error.message,
                code: error.code
            };

        }
    }

    const loginUsingCredintial = async (email, password) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            setUser(result.user)
            return {
                success: true,
                message: 'Login Successfully',
                resposne: result
            }

        } catch (error) {
            return {
                error: true,
                message: error.message,
                code: error.code
            };
        }
    }


    const loginWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const photoURL = user.photoURL || user.providerData[0]?.photoURL || null;

            if (!user.photoURL && photoURL) {
                await updateProfile(user, { photoURL });
            }
            setUser(user);

            return {
                success: true,
                message: 'Login Successfully',
                response: result
            }
        } catch (error) {
            console.log('login with google error', error);
            return {
                error: true,
                message: error.message,
                code: error.code
            };
        }
    };

    const checkRole = async () => {
        if (!user?.accessToken) return null;

        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/role-check`, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`
                }
            });
            const data = await res.data;
            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const profileUpdate = async (name, photoURL) => {

        try {
            const result = await updateProfile(user, {
                displayName: name,
                photoURL
            })
            setUser(user);
            return {
                success: true,
                message: 'Profile update Successfully',
                response: result
            }
        } catch (error) {
            return {
                error: true,
                message: error.message,
                code: error.code
            }
        }

    }

    const logout = async () => {
        try {
            await signOut(auth);
            return {
                success: true,
                message: 'User Logout Successfully'
            }
        } catch (error) {
            return {
                error: true,
                message: error.message,
                code: error.code
            }
        }
    }

    const resetPassword = async (email) => {
        try {
            await sendPasswordResetEmail(auth, email);
            return {
                success: true,
                message: 'Send reset password link on your email. please check'
            }
        } catch (error) {
            return {
                error: true,
                message: error.message,
                code: error.code
            }
        }
    }


    const data = {
        user,
        loading,
        registerUser,
        loginUsingCredintial,
        loginWithGoogle,
        checkRole,
        logout,
        userRole,
        userRoleLoading,
        setUser,
        setUserRole,
        profileUpdate
    }
    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
}