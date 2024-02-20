import React, { useEffect, useState } from 'react';

const InvitationModal = () => {
    const [currentUrl, setCurrentUrl] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCurrentUrl(window.location.href);
        }
    }, []);

    return (
        <div>
            {currentUrl}
        </div>
    );
};

export default InvitationModal;

