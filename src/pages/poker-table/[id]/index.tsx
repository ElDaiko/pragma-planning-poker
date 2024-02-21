import UserForm from "@/pages/poker-table/[id]/components/user-form";
import TableDisplay from "@/pages/poker-table/[id]/components/table-display";
import { useEffect } from "react";
import { usePartyContext } from "@/hooks/usePartyContext";
import { Player } from "@/types/player";
import { Classroom } from "@/types/classroom";

const Index = () => {
  const { socket, setPlayersList, setClassroomName, setOwners ,setAverageVotes, setAmountOfVotes, setRevealCards, setContextCard} = usePartyContext();

  useEffect(() => {
    socket.on("join-classroom", function (data) {
      setOwners(data.classroom.owners)
      setPlayersList(data.players);
      setClassroomName(data.classroom.name);
    });

    socket.on(
      "update-classroom",
      function ({ players }: { players: Player[] }) {
        setPlayersList(players);
      }
    );

/*     socket.on(
      "add-admin", 
      function ({ players, classroom }: { classroom: Classroom, players: Player[] }) {
      setPlayersList(players)
      setOwners(classroom.owners)
  }) */

  socket.on("player-disconnected", function ({ players, classroom }: { classroom: Classroom, players: Player[] }) {
    setOwners(classroom.owners)
    setPlayersList(players)
})

  socket.on("reveal-cards", function ({ average, amountOfVotes }: { average: string, amountOfVotes: { label: string; times: number }[] }) {
    setAverageVotes(average)
    setAmountOfVotes(amountOfVotes)
    setRevealCards(true);
  })

  socket.on("reset-classroom", function ({ players }: { players: Player[] }) {
    setAverageVotes(null)
    setAmountOfVotes(null)
    setPlayersList(players)
    setContextCard(null)
})

  }, []);

  return (
    <>
      <TableDisplay></TableDisplay>
      <UserForm></UserForm>
    </>
  );
};

export default Index;