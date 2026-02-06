import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest() as Request;

    const token = req.headers["authorization"];

    if (!token || !token.startsWith("Bearer")) {
      throw new UnauthorizedException("Прокинь токен придурок");
    }

    return true;
  }
}
