import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

// Simple guard stub that reads role from request.body.role or query param for demo
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private requiredRole: 'ADMIN' | 'CUSTOMER') {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    // For this assignment we don't implement auth. We accept role in the body or query.
    const role = req.body?.role || req.query?.role;
    if (!role) return false;
    return role === this.requiredRole;
  }
}
