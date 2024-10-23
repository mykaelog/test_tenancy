import { Module } from '@nestjs/common';

import { CommonModule } from './common/common.module';
import { SharedModule } from './shared/shared.module';
import { RatingModule } from './modules/rating/rating.module';

@Module({
  imports: [CommonModule, SharedModule, RatingModule],
})
export class AppModule {}
