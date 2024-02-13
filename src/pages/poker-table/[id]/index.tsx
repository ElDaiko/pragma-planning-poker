import UserForm from "@/components/user-form";
import TableDisplay from "@/components/table-display";
import { useEffect } from "react";
import { usePartyContext } from "@/hooks/usePartyContext";
import { Player } from "@/types/player";

const Index = () => {
  const { socket, setPlayersList, setClassroomName, classroomName } =
    usePartyContext();

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
  }, []);

  return (
    <>
      <TableDisplay></TableDisplay>
      <UserForm></UserForm>
    </>
  );
};

export default Index;
