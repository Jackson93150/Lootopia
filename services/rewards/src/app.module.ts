import { Module } from "@nestjs/common"
import { ScheduleModule } from "@nestjs/schedule"
import { ArtefactModule } from "./modules/artefact/artefact.module"
import { SuccessModule } from "./modules/success/success.module"
import { TrophyModule } from "./modules/trophy/trophy.module"
import { XpModule } from "./modules/xp/xp.module"

@Module({
  imports: [ScheduleModule.forRoot(), ArtefactModule, TrophyModule, SuccessModule, XpModule],
})
export class AppModule {}
