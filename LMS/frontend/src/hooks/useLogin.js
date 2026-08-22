import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import toast from "react-hot-toast";

export const useLogin = () => {
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginUser(email, password),
    onSuccess: (userData) => {
      const user = userData.user;
      console.log("User data after login:", user);
      console.log("User role:", user.role);
      if (user.role === "super-admin") {
        navigate("/super-admin");
      } else if (user.role === "admin") {
        navigate("/dashboard");
      } else if (user.role === "student") {
        navigate(`/${user.tenant_id}`);
      } else {
        toast.error("Role not recognized!");
      }

      toast.success("Welcome back!");
    },
    onError: (err) => {
      toast.error(err.message || "Invalid email or password");
    },
  });

  return { login, isPending };
};
