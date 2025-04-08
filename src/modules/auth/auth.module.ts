import { Module } from "@nestjs/common";

// @Module({
//     imports: [
//       UsersModule,
//       PassportModule,
//       JwtModule.register({
//         secret: process.env.JWT_SECRET,
//         signOptions: { expiresIn: '1h' },
//       }),
//     ],
//     providers: [AuthService, JwtStrategy],
//     exports: [AuthService],
//   })
//   export class AuthModule {}