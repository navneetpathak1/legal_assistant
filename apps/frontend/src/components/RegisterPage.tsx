import { useParams } from "react-router-dom";
import RegisterForm from "./Register";

function RegisterPage() {
  const { type } = useParams<{ type: "user" | "lawyer" }>();
  return <RegisterForm type={type || "user"} />;
}

export default RegisterPage;
