import { Module } from '@nestjs/common';
import { ArtefactModule } from './modules/artefact/artefact.module';
import { TrophyModule } from './modules/trophy/trophy.module';

@Module({
  imports: [
    ArtefactModule,
    TrophyModule,
  ],
})
export class AppModule {}