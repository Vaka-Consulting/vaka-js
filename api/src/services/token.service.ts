import JWT from "jsonwebtoken";
import { User } from "../entities/index.js";
import { v4 as uuidv4 } from "uuid";

export class TokenService {
  private privateKey: string = process.env.JWT_PRIVATE_KEY || "";

  public getPrivateKey() {
    if (this.privateKey && this.privateKey != "") {
      return atob(this.privateKey);
    }
    return "";
  }

  public getTokenUser(token: string): User | null {
    try {
      const data = JWT.verify(token, this.getPrivateKey());
      if (data) {
        const user = new User();
        user.email = data.sub ? (data.sub as string) : null;
        user.stake_address = data.sub ? (data.sub as string) : null;
        return user;
      }
    } catch (e) {
      console.log("JWT Expired");
    }

    return null;
  }

  public generateToken(user: User): string {
    let token = JWT.sign(
      {
        iat: parseInt(new Date().getTime() / 1000 + ""),
        exp: parseInt(new Date().getTime() / 1000 + 60 * 60 + ""),
        sub: user.email || user.stake_address,
        jti: uuidv4(),
      },
      this.getPrivateKey(),
      { algorithm: "RS256" }
    );
    return token;
  }
}
