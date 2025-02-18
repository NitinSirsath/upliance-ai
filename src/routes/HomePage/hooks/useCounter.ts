import { useState } from "react";
import { useAppStore } from "../../../services/store/counter/appStore";

const useCounter = () => {
  const {
    users,
    selectedUserId,
    setSelectedUser,
    increment,
    decrement,
    reset,
  } = useAppStore();
  const selectedUser = users.find((user) => user.userId === selectedUserId);

  // Dialog state
  const [openUserForm, setOpenUserForm] = useState<boolean>(false);
  return {
    users,
    setSelectedUser,
    increment,
    decrement,
    reset,
    openUserForm,
    setOpenUserForm,
    selectedUser,
  };
};

export default useCounter;
