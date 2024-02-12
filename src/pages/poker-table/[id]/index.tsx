import UserForm from "@/components/user-form";
import TableDisplay from "@/components/table-display";
import { useEffect } from "react";
import { usePartyContext } from "@/hooks/usePartyContext";

const Index = () => {


    const { socket, setPlayersList, setClassroomName, classroomName } = usePartyContext()

  
    useEffect(() => {
        socket.on("join-classroom", function(data){
          console.log(data);
          setPlayersList(data.players)
          setClassroomName(data.classroom.name)
          
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
