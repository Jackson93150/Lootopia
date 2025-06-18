import { ApiProperty } from '@nestjs/swagger';

export class Bid {
  @ApiProperty()
  bid_price: number;

  @ApiProperty()
  auction_id: string;

  @ApiProperty()
  user_email: string;
}
