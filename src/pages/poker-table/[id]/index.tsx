import UserForm from "@/components/user-form";
import TableDisplay from "@/components/table-display";
import { useEffect } from "react";
import { usePartyContext } from "@/hooks/usePartyContext";

const Index = () => {


    const { socket, setPlayersList } = usePartyContext()
  
    useEffect(() => {
        socket.on("join-classroom", function(data){
          console.log(data.players);
          setPlayersList(data.players)
        })
    }, [])


  return (
    <>
      <TableDisplay></TableDisplay>
      <UserForm></UserForm>
    </>
  );
};

export default Index;
