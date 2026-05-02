import { Routes, Route } from "react-router";
import Home from "./containers/Home/Home";
import Register from "./containers/User/Register";
import Login from "./containers/User/Login";
import Header from "./components/Header/Header";
import { useAppSelector } from "./app/hooks";
import { selectUser } from "./features/users/usersSelectors";
import { Container } from "@mui/material";


const App = () => {
  const user = useAppSelector(selectUser);
  return (
    <>
      <Header user={user} />
      <Container maxWidth="xl">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
