import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore'

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private angularFirestore: AngularFirestore) { }

  createDoc(data: any, pathCollect: string, id: string){
    const collection= this.angularFirestore.collection(pathCollect);
    return collection.doc(id).set(data);
  }

  getId(){
    return this.angularFirestore.createId();
  }
  
  getCollection<tipo>(path:string){
    const collection = this.angularFirestore.collection<tipo>(path);
    return collection.valueChanges();
  }

  getDoc<tipo>(path: string, id: string){
    return this.angularFirestore.collection(path).doc<tipo>(id).valueChanges();
  }
}
