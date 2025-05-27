const config = JSON.parse(process.env.LOGIN_OPTIONS || "{}");

console.log("Login Config = ", config);

export const LOGIN_METHODS = {
  USER: config.loginWithUser,
  POLICY_ID: config.loginWithPolicyId,
  WALLET: config.loginWithWallet,
  REGISTER: config.register,
  REFRESH_SESSION: config.refreshSession,
};
