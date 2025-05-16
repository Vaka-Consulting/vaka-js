import { User } from "../entities/index.js";
import {
  SESv2Client,
  SendEmailCommand,
  SendEmailCommandInput,
} from "@aws-sdk/client-sesv2";
import fs from "fs";
import path from "path";

const __dirname = path.resolve();
const client = new SESv2Client({ region: "us-east-1" });

export class EmailService {
  private getFileContent(relativePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const absolutePath = path.resolve(__dirname, relativePath);

      fs.readFile(absolutePath, "utf8", (err: any, data: string) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
  private generateOTP(): string {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const otpLength = 6;
    let otp = "";

    for (let i = 0; i < otpLength; i++) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      otp += alphabet[randomIndex];
    }

    return otp;
  }

  public validateCode(code: string): User {
    console.log("VERIFICATION CODE FROM LINK= ", code);
    if (code == null) {
      throw new Error("Invalid code provided");
    }
    const plain_txt = atob(code);
    if (!plain_txt.includes("|")) {
      throw new Error("Invalid code provided");
    }

    const [email, user_code] = plain_txt.split("|");

    const user = new User();
    user.email = email;
    user.verify_code = user_code;
    return user;
  }

  public async sendVerificationCode(user: User): Promise<User> {
    user.verify_code = this.generateOTP();
    user.verify_code_expiry = new Date(new Date().getTime() + 5 * 60000);

    if (user.email == null) throw new Error("Invalid email provided");
    console.log("VERIFICATION CODE=", { code: user.verify_code.split("") });

    if (process.env.STAGE != "local") {
      const input = {
        FromEmailAddress: `no-reply@${process.env.EMAIL_DOMAIN}`, // Replace with your email address
        Destination: {
          ToAddresses: [user.email],
        },
        Content: {
          Template: {
            TemplateName: `onboarding-api-verify-code_${process.env.STAGE}`,
            TemplateData: JSON.stringify({ code: user.verify_code.split("") }),
          },
        },
      } as SendEmailCommandInput;
      const command = new SendEmailCommand(input);

      try {
        const response = await client.send(command);
      } catch (e) {
        console.error(e);
        throw e;
      }
    }

    return user;
  }

  public async sendRegistrationLink(user: User): Promise<User> {
    user.verify_code = this.generateOTP();
    user.verify_code_expiry = new Date(new Date().getTime() + 5 * 60000);
    if (user.email == null) throw new Error("Invalid email provided");
    const encoded = btoa(`${user.email}|${user.verify_code}`);
    const verification_url = process.env.VERIFICATION_URL || "";
    const link = `${verification_url}${encoded}`;
    console.log("VERIFICATION LINK = ", link);

    if (process.env.STAGE != "local") {
      const input = {
        FromEmailAddress: `no-reply@${process.env.EMAIL_DOMAIN}`, // Replace with your email address
        Destination: {
          ToAddresses: [user.email],
        },
        Content: {
          Template: {
            TemplateName: `onboarding-api-verify-email_${process.env.STAGE}`,
            TemplateData: JSON.stringify({ link }),
          },
        },
      } as SendEmailCommandInput;
      const command = new SendEmailCommand(input);

      try {
        const response = await client.send(command);
      } catch (e) {
        console.error(e);
        throw e;
      }
    }

    return user;
  }
}
