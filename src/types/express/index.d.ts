import { UserRequestInterface } from '../../shared/interfaces/user-request.interface';

declare global {
  namespace Express {
    export interface Request {
      user?: UserRequestInterface;
      tenantId: string;
    }
  }
}
