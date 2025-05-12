import { Module } from '@nestjs/common';
import { ArtefactModule } from './modules/artefact/artefact.module';
import { TrophyModule } from './modules/trophy/trophy.module';
import { SuccessModule } from './modules/success/success.module';

@Module({
  imports: [
    ArtefactModule,
    TrophyModule,
    SuccessModule
  ],
})
export class AppModule {}