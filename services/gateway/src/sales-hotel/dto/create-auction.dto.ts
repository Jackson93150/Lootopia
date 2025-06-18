import { ApiProperty } from '@nestjs/swagger';

export class CreateAuctionDto {
  @ApiProperty()
  user_artefact_id: string;

  @ApiProperty()
  artefact_id: string;

  @ApiProperty()
  user_email: string;

  @ApiProperty({ type: Number, nullable: true })
  fix_price: number | null;

  @ApiProperty()
  auction_price: number;

  @ApiProperty()
  direct_sale: boolean;

  @ApiProperty()
  timer: string;

  @ApiProperty()
  artefact_name: string;

  @ApiProperty()
  artefact_rarity: string;

  @ApiProperty()
  image: string;
}
