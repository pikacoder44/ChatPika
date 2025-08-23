import React, { useState } from "react";

const ChatWindow = (props) => {
    let [userMessage,setuserMessage] = useState(props.user);

  return (
    <div className="w-[60%] mx-auto h-200 flex flex-col gap-3 p-3 ">
      <div className="flex flex-col gap-3 p-3 ">
        {props.sent && (
          <div className="flex justify-end">
            <div className="bg-blue-500 text-white px-4 py-2 rounded-xl max-w-[70%] break-words">
              {userMessage}
            </div>
          </div>
        )}
      </div>

      <div>
        {props.response && (
            <div className="flex justify-start">
          <div className="mt-4 p-3 w-auto h-auto rounded dark:text-white dark:bg-zinc-800">
         
             {props.response}
          </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;
