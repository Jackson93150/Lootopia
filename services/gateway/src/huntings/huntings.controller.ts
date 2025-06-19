import {Body, Controller, Get, Param, Patch, Post} from "@nestjs/common"
import { HuntingDto } from "./dto/hunting"
import { HuntingsService } from "./huntings.service"
import {ParticipantDto} from "./dto/participants";

@Controller("/huntings")
export class HuntingsController {
  constructor(private readonly huntingsService: HuntingsService) {}

  @Post("/create")
  async create(@Body() dto: HuntingDto) {
    return await this.huntingsService.create(dto)
  }

  @Get("/user/:userId")
  async getHuntingsByUser(@Param("userId") userId: string) {
    return await this.huntingsService.findByUser(userId)
  }

  @Get("/all")
  async getAllHunts() {
    return await this.huntingsService.findAll()
    }

  @Patch("/update/:huntId")
  async updateHunt(@Param("huntId") huntId: string, @Body() dto: HuntingDto) {
    return await this.huntingsService.update(huntId, dto)
  }

  @Post("/participant/create")
  async createParticipant(@Body() dto: ParticipantDto) {
    return await this.huntingsService.createParticipant(dto)
  }

  @Get("/participant/:userId")
  async getHuntingsByParticipant(@Param("userId") userId: string) {
    return await this.huntingsService.findByParticipant(userId)
  }
}
