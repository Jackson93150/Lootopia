import { Module } from "@nestjs/common"
import { ArtefactModule } from "./modules/artefact/artefact.module"
import { SuccessModule } from "./modules/success/success.module"
import { TrophyModule } from "./modules/trophy/trophy.module"

@Module({
  imports: [ArtefactModule, TrophyModule, SuccessModule],
})
export class AppModule {}
