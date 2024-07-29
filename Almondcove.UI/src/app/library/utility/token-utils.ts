import {jwtDecode} from 'jwt-decode';

export function getUserDataFromToken(token: string): any {
  try {
    const decodedToken: any = jwtDecode(token);  // Correct usage
    const now = Math.floor(Date.now() / 1000);    // Get current time in seconds

    if (decodedToken.exp && decodedToken.exp > now) {  // Check token expiration
        console.log("form token utils");
        console.log(decodedToken);
      return {
        firstName: decodedToken.FirstName,
        lastName: decodedToken.LastName,
        avatar: decodedToken.Avatar,
      };
     
    }
  } catch (error) {
    console.error('Invalid token', error);
  }
  return null;
}
