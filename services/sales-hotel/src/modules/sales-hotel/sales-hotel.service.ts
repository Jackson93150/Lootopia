import { Inject, Injectable } from "@nestjs/common"

import { FirebaseService } from "../../firebase/firebase.service"
import { SaleConverter } from "./types/sale"
import { ClientProxy } from "@nestjs/microservices"
import { firstValueFrom } from "rxjs"

@Injectable()
export class SalesHotelService {
  constructor(private readonly firebaseService: FirebaseService, @Inject("ARTEFACT_SERVICE") private readonly clientArtefactService: ClientProxy) {}

  async createSale(userId, saleInfo) {
    const artefactId = saleInfo.artefact_id
    const crownPrice = saleInfo.crown_price

    try {
      await this.firebaseService.saleCollectionRef
      .withConverter(SaleConverter)
      .add({
        id_artefact: artefactId,
        id_user: userId, 
        crown_price: crownPrice,
        statut: 'en cours'
      })
    
    await firstValueFrom(this.clientArtefactService.send({ cmd: 'remove-owner-artefacts-service' }, { userId: userId, artefactId: artefactId }))

    return true
    } catch (error) {
      console.error(error)
    }
  }

  async getAllSales() {
    const snapshotSales = await this.firebaseService.saleCollectionRef.get();

    const sales = snapshotSales.docs.map(doc => ({
      id_sale: doc.id,
      ...doc.data()
    }));
  
    const artefactIds = sales.map(sale => sale.id_artefact);
  
    const artefactsOnSale = await firstValueFrom(
      this.clientArtefactService.send(
        { cmd: 'get-by-ids-artefacts-service' },
        { artefactIds }
      )
    );
  
    const artefactMap = new Map(
      artefactsOnSale.map(artefact => [artefact.id_firebase, artefact])
    );
  
    const mergedSales = sales.map(sale => ({
      ...sale,
      artefact: artefactMap.get(sale.id_artefact) || null
    }));
  
    return mergedSales;
  }

  async buySale(userId, saleInfo) {
    
  }
}
