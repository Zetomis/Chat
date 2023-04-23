import { useState } from 'react'
import {auth} from '../firebase-config'
import {createUserWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth'
import { provider } from '../firebase-config'

export const Auth = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
        } catch (err) {
            console.log(err)
        }
        console.log(auth?.currentUser?.email)
    }

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, provider)
        } catch (err) {
            console.log(err)
        }
        console.log(auth?.currentUser?.email)
    }

    const logOut = async () => {
        try {
            await signOut(auth)
        } catch (err) {
            console.log(err)
        }
        console.log(auth?.currentUser?.email)
    }
    return (
        <div className="auth">
            <input placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)}/>
            <input placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)}/>
            
            <button onClick={signIn}>Sign In</button>
            <button onClick={signInWithGoogle}>Sign In With Google</button>
            <button onClick={logOut}>Log Out</button>
        </div>
    )
}