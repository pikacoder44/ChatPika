const TypingIndicator = () => (
  <div className="flex space-x-1 items-center">
    <span className="w-2 h-2 bg-gray-500 dark:bg-gray-300 rounded-full animate-bounce"></span>
    <span className="w-2 h-2 bg-gray-500 dark:bg-gray-300 rounded-full animate-bounce [animation-delay:200ms]"></span>
    <span className="w-2 h-2 bg-gray-500 dark:bg-gray-300 rounded-full animate-bounce [animation-delay:400ms]"></span>
  </div>
);
export default TypingIndicator;
