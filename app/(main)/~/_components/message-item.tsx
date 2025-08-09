export const MessageItem = ({ message }: { message: any }) => {
  const isUser = message.sender === "USER";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] sm:max-w-[75%] md:max-w-[70%] rounded-lg p-2 md:p-3 ${
          isUser
            ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700"
            : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        }`}
      >
        <div className="flex items-center gap-1 md:gap-2 mb-1">
          <span
            className={`text-xs font-medium ${
              isUser
                ? "text-gray-600 dark:text-gray-400"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {isUser ? "USER" : "CAFE"}
          </span>
        </div>
        <p className="text-xs md:text-sm leading-relaxed">{message.content}</p>
        {message.imageUrl && (
          <img
            src={message.imageUrl}
            alt="Message attachment"
            className="mt-2 rounded max-w-full h-auto"
          />
        )}
        <div
          className={`text-xs mt-1 ${
            isUser
              ? "text-gray-500 dark:text-gray-400"
              : "text-gray-400 dark:text-gray-500"
          }`}
        >
          {new Date(message.createdAt).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};
