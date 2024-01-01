import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { UserModule } from "../user/user.module";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./services/auth.service";
import { AuthServiceInterface } from "./services/auth.service.interface";

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_DURATION || "7d",
      },
    }),
  ],
  providers: [
    {
      provide: AuthServiceInterface,
      useClass: AuthService,
    },
  ],
  controllers: [AuthController],
  exports: [
    {
      provide: AuthServiceInterface,
      useClass: AuthService,
    },
  ],
})
export class AuthModule {}
