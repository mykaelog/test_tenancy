import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils';

export class EntityNamingStrategy
  extends DefaultNamingStrategy
  implements NamingStrategyInterface
{
  constructor(private prefix: string) {
    super();
  }

  tableName(targetName: string, userSpecifiedName: string): string {
    return `${this.prefix}${userSpecifiedName || snakeCase(targetName)}`;
  }
}
