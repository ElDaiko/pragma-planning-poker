import React from 'react';
import styles from "../../../../styles/components/type-modal.module.scss"
import { usePartyContext } from '@/hooks/usePartyContext';

const SocoreTypeModal = () => {

    const { socket } = usePartyContext();

    function handleUpdateScore(score: any) {
        socket.emit("change-type-of-score", { typeOfScores: score.type })
      }

    return (
        <div>
            
        </div>
    );
}

export default SocoreTypeModal;
