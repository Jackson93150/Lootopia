import { Inject, Injectable } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"
import { HuntingDto } from "./dto/hunting"
import { ParticipantDto } from "./dto/participants"
import { firstValueFrom } from "rxjs"

@Injectable()
export class HuntingsService {
  constructor(@Inject("HUNTINGS_SERVICE") private readonly client: ClientProxy) {}

  async create(dto: HuntingDto) {
    return await firstValueFrom(
        this.client.send({ cmd: "create-hunting-service" }, { hunting: dto })
    )
  }

  async findByUser(userId: string) {
    return await firstValueFrom(
        this.client.send({ cmd: "get-huntings-by-user" }, { userId })
    )
  }

  async findAll() {
    return await firstValueFrom(
        this.client.send({ cmd: "get-all-huntings" }, {})
    )
  }

  async update(huntId: string, dto: HuntingDto) {
    return await firstValueFrom(
        this.client.send({ cmd: "update-hunting-service" }, { huntId, hunting: dto })
    )
  }
  async createParticipant(participant: ParticipantDto) {
    return await firstValueFrom(
        this.client.send({ cmd: "create-participant" }, { participant })
    )
  }

  async findByParticipant(userId: string) {
    return await firstValueFrom(
        this.client.send({ cmd: "get-huntings-by-participant" }, { userId })
    )
  }

}
