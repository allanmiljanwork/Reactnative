import { useState, useContext } from "react";
import { Alert } from "react-native";

import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";

function SignUpScreen() {
  const [isAuthenticating, setIsAuthenticting] = useState(false);

  const authCtx = useContext(AuthContext);

  async function signUpHandler({ email, password }) {
    setIsAuthenticting(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert("Auth failed", "Can't register");
      setIsAuthenticting(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return <AuthContent onAuthenticate={signUpHandler} />;
}

export default SignUpScreen;
