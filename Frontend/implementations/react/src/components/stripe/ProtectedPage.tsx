import { useState, useEffect, ReactNode } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import createCheckoutSession from "../../utils/createCheckoutSession";

const ProtectedPage = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isValidSession, setIsValidSession] = useState(false);

    useEffect(() => {
        const sessionId = new URLSearchParams(window.location.search).get('session_id');
        if (!sessionId) {
            setIsLoading(false);
            return;
        }

        fetch('http://dollgen.tplinkdns.com/verify-session', {
            method: 'POST',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sessionId }),
        })
            .then(response => response.json())
            .then(data => {
                setIsValidSession(data.isValid);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error verifying session:', error);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isValidSession) {
        createCheckoutSession()
        return <BrowserRouter><Navigate to="/create-checkout-session" /></BrowserRouter>;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={isValidSession ? children : <Navigate to="/create-checkout-session" />} />
            </Routes>
        </BrowserRouter>
    );
};

export default ProtectedPage;