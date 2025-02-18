import { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
function useSignup() {
    
    const [isLoading, setIsLoading] = useState(false)
    const { setAuthUser } = useAuthContext()
    async function signup({fullName, username, password, confirmPassword, gender}) {
        const success = handleInputErrors({fullName, username, password, confirmPassword, gender})

        if (!success) return;
        
        setIsLoading(true)

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName, username, password, confirmPassword, gender}),
            })

            const data = await res.json();
            if(data.error) {
                throw new Error (data.error);
            }
            localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data);
        } catch (error) {
            toast.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }   

    return { isLoading, signup}
}

export default useSignup

function handleInputErrors({fullName, username, password, confirmPassword, gender}) {
    if (!fullName || !username || !password || !confirmPassword || !gender) {
        toast.error('Please fill in all the details')
        return false   
    }
    
    if (password !== confirmPassword) {
        toast.error("Password didn't match!")
        return false
    }

    if (password.length < 6) {
        toast.error('Password must be atleast 6 characters')
        return false
    }
    
    return true
}
