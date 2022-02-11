import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(public storage: Storage) { }
    async formOne(data){
        let dataAnswer = {
            "CWT":data.CWT,
            "TMP":data.TMP,
            "ID1":data.ID1,
            "VIL":data.VIL,
            "MOO":data.MOO,
            "A1":data.A1,
            "NAME":data.NAME,
            "ADDRESS":data.ADDRESS,
            "LAT":data.latitude,
            "LONG":data.longitude,
            "P1A":data.P1A,
            "P2A":data.P2A,
            "P3A":data.P3A,
            "P4A":data.P4A,
            "P5A":data.P5A,
        }
        await this.storage.set('public',dataAnswer);
        return "success";
    }
}
