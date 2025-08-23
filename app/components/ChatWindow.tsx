import React from "react";

const ChatWindow = (props) => {
  return (
    <div>
      <div className=" w-full h-200">
        <div className="bg-gray-700 w-70 h-10 rounded-md text-center flex justify-center items-center"> {props.message}</div>
      </div>
    </div>
  );
};

export default ChatWindow;
