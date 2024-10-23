import { Roles } from '../enums/roles.enum';

export interface UserRequestInterface {
  id: number;
  email: string;
  name: string;
  lastname: string;
  roles: Roles[];
}
