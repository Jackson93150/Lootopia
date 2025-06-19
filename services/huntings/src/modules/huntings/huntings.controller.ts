import { Controller } from "@nestjs/common"
import { MessagePattern, Payload } from "@nestjs/microservices"
import { HuntService } from "./huntings.service"
import { HuntingDto } from "./dto/hunting.dto"
import { plainToInstance } from "class-transformer"
import { validateOrReject } from "class-validator"
import {ParticipantDocument} from "./types/participants";

@Controller()
export class HuntController {
  constructor(private readonly huntService: HuntService) {}

  @MessagePattern({ cmd: "create-hunting-service" })
  async create(@Payload() data: { hunting: HuntingDto }) {
    const dto = plainToInstance(HuntingDto, data.hunting)
    await validateOrReject(dto)

    return await this.huntService.createHunt(dto)
  }

  @MessagePattern({ cmd: "get-huntings-by-user" })
  async getByUser(@Payload() data: { userId: string }) {
    return await this.huntService.findByUser(data.userId)
  }

  @MessagePattern({ cmd: "get-all-huntings" })
async getAll() {
    return await this.huntService.findAll()
  }

  @MessagePattern({ cmd: "update-hunting-service" })
  async update(@Payload() data: { huntId: string; hunting: HuntingDto }) {
    const dto = plainToInstance(HuntingDto, data.hunting)
    await validateOrReject(dto)

    return await this.huntService.updateHunt(data.huntId, dto)
  }

  @MessagePattern({ cmd: "create-participant" })
  async createParticipant(@Payload() data: { participant: ParticipantDocument }) {
    const dto = plainToInstance(ParticipantDocument, data.participant)
    await validateOrReject(dto)
    return await this.huntService.createParticipant(dto)
  }

  @MessagePattern({ cmd: "get-huntings-by-participant" })
  async getHuntingsByParticipant(@Payload() data: { userId: string }) {
    return await this.huntService.findHuntingsByParticipant(data.userId)
  }

}
