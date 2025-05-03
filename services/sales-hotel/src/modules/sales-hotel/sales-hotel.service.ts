import { ConflictException, Injectable, NotFoundException, Response } from "@nestjs/common"

import { FirebaseService } from "../../firebase/firebase.service"

@Injectable()
export class SalesHotelService {
  constructor(private readonly firebaseService: FirebaseService) {}

}
