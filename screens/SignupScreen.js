import { useState } from "react";

import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";

function SignUpScreen() {
  const [isAuthenticating, setIsAuthenticting] = useState(false);

  async function signUpHandler({ email, password }) {
    setIsAuthenticting(true);
    await createUser(email, password);
    setIsAuthenticting(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return <AuthContent onAuthenticate={signUpHandler} />;
}

export default SignUpScreen;
