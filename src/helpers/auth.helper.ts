import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
dotenv.config();

export class AuthHelper {
  private static instance: AuthHelper;
  static getInstance(): AuthHelper {
    AuthHelper.instance = AuthHelper.instance || new AuthHelper();
    return AuthHelper.instance;
  }
  async generateHash(value: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(value, salt);
    return hash;
  }
  async compareHash(value: string, hash: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(value, hash);
    return isMatch;
  }
  async generateTokens(user:any, jwt: JwtService): Promise<any> {
    return {
      accessToken: await this.generateAccessToken(user, jwt),
      refreshToken: await this.generateRefreshToken(user, jwt),
    };
  }

  async generateAccessToken(user:any, jwt: JwtService): Promise<string> {
    let body = {
      email: user.email,
      id: user._id,
      userType: user?.userType??"admin",
    };
    const accessToken = await this.generateToken(
      body,
      jwt,
      10*1000,
    );
    return accessToken;
  }
  async generateRefreshToken(user: any, jwt: JwtService) {
    let body = {
      email: user.email,
      id: user.id,
      userType: user.userType,
    };
    const refreshToken = await this.generateToken(
      body,
      jwt,
      process.env.ACCESS_TOKEN_VALIDITY,
    );
    return refreshToken;
  }

  async generateToken(
    body: any,
    jwt: JwtService,
    expireTime: any,
  ): Promise<string> {
    const token = jwt.sign(body, { expiresIn: expireTime });
    return token;
  }
  async verify(
    user:any,
    jwt: JwtService,
  ): Promise<any> {    
      const secretKey = String(process.env.JWT_SECRET);
      try {
        const decodedToken = jwt.verify(user.refreshToken, {
          secret: secretKey,
        });
        
      } catch (error) {
        user = null;
      }
    }

  
}
