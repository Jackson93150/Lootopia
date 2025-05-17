import { Injectable} from "@nestjs/common"
import { FirebaseService } from "../../firebase/firebase.service"

@Injectable()
export class HuntingsService {
  constructor(private readonly firebaseService: FirebaseService) {}
}
