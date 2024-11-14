import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';

import { ProfileModule } from './profile/profile.module';
import { ProfileService } from './profile/profile.service';
import { ProfileController } from './profile/profile.controller';

import { PropertiesModule } from './properties/properties.module';
import { PropertiesService } from './properties/properties.service';
import { PropertiesController } from './properties/properties.controller';

import { ExploreModule } from './explore/explore.module';
import { ExploreService } from './explore/explore.service';
import { ExploreController } from './explore/explore.controller';

import { BookingsModule } from './bookings/bookings.module';
import { BookingsService } from './bookings/bookings.service';
import { BookingsController } from './bookings/bookings.controller';

import { ReviewsModule } from './reviews/reviews.module';
import { ReviewsService } from './reviews/reviews.service';
import { ReviewsController } from './reviews/reviews.controller';

import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';

@Module({
  imports: [AuthModule, BookingsModule, ExploreModule, ProfileModule, PropertiesModule, ReviewsModule, UsersModule],
  providers: [AuthService, ProfileService, PropertiesService, ExploreService, BookingsService, ReviewsService, UsersService],
  controllers: [AuthController, ProfileController, PropertiesController, ExploreController, BookingsController, ReviewsController, UsersController],
})
export class AppModule {}
