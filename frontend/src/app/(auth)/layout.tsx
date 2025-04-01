import React from 'react';
import './auth.css';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="auth-layout">
            <img
                src="/images/lootopiaLogo.png"
                alt="Overlay"
                className="overlay-logo"
            />
            <img
                src="/images/coffre3.png"
                alt="coffre"
                className="coffre-image"
            />
            <div className="auth-content">
                <img
                    src="/images/Shop-Card-Gems-Title.png"
                    alt="decor"
                    className="decor-image"
                />

                {children}
            </div>
        </div>
    );
}
