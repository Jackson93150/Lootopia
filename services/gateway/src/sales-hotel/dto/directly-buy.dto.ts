import { ApiProperty } from '@nestjs/swagger';

export class DirectlyBuy {
  @ApiProperty()
  fix_price: number;

  @ApiProperty()
  auction_id: string;

  @ApiProperty()
  id_user_artefact: string;

  @ApiProperty()
  id_artefact: string;

  @ApiProperty()
  creator_email: string;
}
