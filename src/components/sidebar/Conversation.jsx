import { useSocketContext } from "../../context/SocketContext.jsx";
import useConversation from "../../zustand/useConversation.js"


function Conversation({conversation, lastIdx, emoji}) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;
  const {onlineUsers} = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id)

  return (
    <>
        <div className={`flex gap-2 items-center hover:bg-sky-500 rounded px-2 py-1 cursor-pointer
        ${isSelected ? 'bg-sky-500' : ""}`}
        onClick={() => setSelectedConversation(conversation)}>
            <div className={`avatar ${isOnline ? "online" : ""}`}>
                <div className="w-12 rounded-full ">
                  <img src={conversation.profilePic} alt="user avatar"/>
                </div>
            </div>

            <div className="flex flex-col flex-1">
                <div className="flex gap-3 justify-between">
                    <p className="font-bold text-white">{conversation.fullName}</p>
                    <span className="text-xl">{emoji}</span>
                </div>
            </div>
        </div>
        {!lastIdx && <div className="divider my-0 py-0 h-1"/>}
    </>
  )
}

export default Conversation;


//starter code
/*function Conversation() {
  return (
    <>
        <div className="flex gap-2 items-center hover:bg-sky-500 rounded px-2 py-1 cursor-pointer">
            <div className="avatar online">
                <div className="w-12 rounded-full ">
                  <img src="" alt="user avatar"/>
                </div>
            </div>

            <div className="flex flex-col flex-1">
                <div className="flex gap-3 justify-between">
                    <p className="font-bold text-grey-200">John Doe</p>
                    <span className="text-xl">em</span>
                </div>
            </div>
        </div>
        <div className="divider my-0 py-0 h-1"/>
    </>
  )
}

export default Conversation
*/
