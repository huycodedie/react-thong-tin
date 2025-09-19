import { useMessageApi } from "./MessageProvider";

export const useAppMessage = () => {
  const messageApi = useMessageApi();

  return {
    success: (msg = "Success") =>
      messageApi.open({ type: "success", content: msg }),
    error: (msg = "Error") =>
      messageApi.open({ type: "error", content: msg }),
    warning: (msg = "Warning") =>
      messageApi.open({ type: "warning", content: msg }),
  };
};
