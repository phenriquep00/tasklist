import { useContext } from "react";
import { UserContext } from "./hooks/UserContext";
import { AuthPage } from "./pages/AuthPage";
import { TodoPage } from "./pages/TodoPage";

function App() {
  const { user, setUser } = useContext(UserContext);

  return (
    <div>{user !== undefined && user !== "" ? <TodoPage /> : <AuthPage />}</div>
  );
}

export default App;
