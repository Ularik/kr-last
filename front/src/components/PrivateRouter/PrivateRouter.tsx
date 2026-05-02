import { type PropsWithChildren } from "react";
import { Navigate } from "react-router";
import { useAppSelector } from "../../app/hooks.ts";
import { selectUser } from "../../features/users/usersSelectors.ts";

interface Props extends PropsWithChildren {
  isAllowed: boolean | null;
}

const PrivateRouter: React.FC<Props> = ({ isAllowed, children }) => {
  const user = useAppSelector(selectUser);
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAllowed) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PrivateRouter;
