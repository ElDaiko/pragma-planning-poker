import UserForm from "@/components/user-form";
import TableDisplay from "@/components/table-display";
import { useEffect } from "react";
import { Classroom } from "@/types/classroom";
import { Player } from "@/types/player";
import { usePartyContext } from "@/hooks/usePartyContext";
import { useUserContext } from "@/hooks/useUserContext";

const Index = () => {

  const {setPartyContext} = useUserContext()
    const { socket, /* setAmountOfVotes, setAverageVotes, */ setGlobalTypeOfScores, setOwners, setClassroomName, setPlayersList/* , setFullMatch */ } = usePartyContext()
  
    useEffect(() => {
        socket.on("join-classroom", function ({ classroom, players }: { classroom: Classroom, players: Player[] }) {
            setPartyContext(classroom.name)
            /* setOwners(classroom.owners)
            setClassroomName(classroom.name)
            setPlayersList(players)
            setGlobalTypeOfScores(classroom.typeOfScores) */
            console.log(classroom, players);
            
        })
  
        return () => {
            socket.disconnect();
        };
    }, [])


  return (
    <>
      <TableDisplay></TableDisplay>
      <UserForm></UserForm>
    </>
  );
};

export default Index;
