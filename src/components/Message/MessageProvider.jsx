import React, { createContext, useContext } from "react";
import { message } from "antd";

// Tạo Context
const MessageContext = createContext(null);

export const MessageProvider = ({ children }) => {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <MessageContext.Provider value={messageApi}>
      {contextHolder}
      {children}
    </MessageContext.Provider>
  );
};

// Hook để lấy messageApi ở bất cứ đâu
export const useMessageApi = () => {
  const ctx = useContext(MessageContext);
  if (!ctx) {
    throw new Error("useMessageApi phải được dùng trong <MessageProvider>");
  }
  return ctx;
};
