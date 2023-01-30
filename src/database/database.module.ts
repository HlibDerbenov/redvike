import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb+srv://redvike_admin:MCMMdvzSou3BnvpQ@redvike.xtaywas.mongodb.net/?retryWrites=true&w=majority',
      }),
    }),
  ],
})
export class DatabaseModule {}
