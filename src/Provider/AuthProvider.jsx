import { createContext, useEffect, useState } from "react"
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/Firebase.config";
// import app from '../firebase/Firebase.config/app'

export const AuthContext = createContext(null)

const auth = getAuth(app)
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // login User
  const loginUser = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  // logout user
  const logoutUser = () => {
    return signOut(auth)
  }
  // create user account
  const signUpUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  // update profile
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoUrl: photo
    })
  }
  // auth state change
  useEffect(() => {
    const unsubsCribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false)
      setUser(currentUser)
      if (currentUser) {
        console.log(currentUser);
      } else {
        // console.error(error);

      }
    })
    return () => {
      return unsubsCribe()
    }
  }, [])
  const authInfo = {
    user,
    loading,
    signUpUser,
    updateUserProfile,
    loginUser,
    logoutUser,
  }
  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider