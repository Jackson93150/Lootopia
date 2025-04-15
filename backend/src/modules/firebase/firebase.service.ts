/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type OnModuleInit, Injectable } from '@nestjs/common';
import {
  getApps,
  initializeApp,
  cert,
  type ServiceAccount,
  type App,
} from 'firebase-admin/app';
import { type Auth, getAuth } from 'firebase-admin/auth';
import { type Firestore, getFirestore } from 'firebase-admin/firestore';
import { UserConverter } from '../users/types/user';

@Injectable()
export class FirebaseService implements OnModuleInit {
  public app: App;
  public firestore: Firestore;
  public auth: Auth;

  public usersCollectionRef;
  public workflowsCollectionRef;
  public entitiesCollectionRef;
  public tagsCollectionRef;
  public toolsCollectionRef;

  onModuleInit() {
    const serviceAccount: string | ServiceAccount = JSON.parse(
      process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string,
    );

    const credential = cert(serviceAccount);

    this.app =
      getApps()[0] ??
      initializeApp({
        credential,
      });

    this.firestore = getFirestore(this.app);
    this.auth = getAuth(this.app);

    this.usersCollectionRef = this.firestore
      .collection('users')
      .withConverter(UserConverter);
  }
}
