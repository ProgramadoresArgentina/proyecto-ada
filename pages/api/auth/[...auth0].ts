import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

export default handleAuth({
    login: handleLogin({
        returnTo: '/api/auth/login?returnTo=/user'
    })
});


//This creates the following routes:

// - /api/auth/login    -to login
// - /api/auth/logout   -to logout
// - /api/auth/callback  -to redirect
// - /api/auth/me     -to check logged user

