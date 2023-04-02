import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const submitHandler = async (value) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/sendOTP",
        {
          phone: value,
        }
      );
      const data = await response.data;
      console.log(data.otp);
      if (data.otp) {
        navigate("/otp", { replace: true, state: { phone: value } });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return <>Hello{/* <LoginForm submitHandler={submitHandler} /> */}</>;
};
export default LoginPage;

