import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";

import { AuthModule } from "./modules/auth/auth.module";
import { BrokersModule } from "./modules/brokers/brokers.module";
import { ClientModule } from "./modules/clients/client.module";
import { SchedulesModule } from "./modules/schedules/schedules.module";
import { UserModule } from "./modules/user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        ttl: 1000 * 10, // 10 seconds
        limit: 20,
      },
    ]),
    ClientModule,
    AuthModule,
    UserModule,
    SchedulesModule,
    BrokersModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
