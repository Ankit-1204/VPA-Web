import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await axios.get('http://localhost:8000/auth/profile');
                if (data) {
                    setUserInfo(data);
                } else {
                    setUserInfo(null);
                }
            } catch (error) {
                console.log(error);
                setUserInfo(null);
            } finally {
                console.log(3);
                setLoading(false);
            }
        };

        if (userInfo==null) {
            fetchProfile();
        } else {
            console.log(2);
            setLoading(false);
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser, userInfo, setUserInfo, loading }}>
            {children}
        </UserContext.Provider>
    );
}
