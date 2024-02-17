import UserForm from "@/pages/poker-table/[id]/components/user-form";
import TableDisplay from "@/pages/poker-table/[id]/components/table-display";
import { useEffect } from "react";
import { usePartyContext } from "@/hooks/usePartyContext";
import { Player } from "@/types/player";
import { Classroom } from "@/types/classroom";

const Index = () => {
  const { socket, setPlayersList, setClassroomName, setOwners, isOwner } = usePartyContext();

  useEffect(() => {
    socket.on("join-classroom", function (data) {
      console.log(data);
      setPlayersList(data.players);
      setClassroomName(data.classroom.name);
    });

    socket.on( //update de data on display for the player
      "update-classroom",
      function ({ players }: { players: Player[] }) {
        setPlayersList(players);
      }
    );

    socket.on(
      "add-admin", 
      function ({ players, classroom }: { classroom: Classroom, players: Player[] }) {
      setPlayersList(players)
      setOwners(classroom.owners)
  })

  socket.on("player-disconnected", function ({ players, classroom }: { classroom: Classroom, players: Player[] }) {
    setOwners(classroom.owners)
    setPlayersList(players)
})

  /* return () => {
    socket.disconnect();
  }; */

  }, []);

  return (
    <>
      <TableDisplay></TableDisplay>
      <UserForm></UserForm>
    </>
  );
};

export default Index;