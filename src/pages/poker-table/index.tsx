import React from 'react';
import { useRouter } from "next/router";



const Index = () => {

    const router = useRouter();
    const { partyName } = router.query;
    
    return (
        <div>
            <p>Party Name: {partyName}</p>
        </div>
    );
}

export default Index;
