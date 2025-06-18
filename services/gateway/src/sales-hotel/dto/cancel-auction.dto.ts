import { ApiProperty } from '@nestjs/swagger';

export class CancelAuctionDto {
  @ApiProperty()
  creator_email: string;

  @ApiProperty()
  auction_id: string;

  @ApiProperty()
  user_artefact_id: string;
}
