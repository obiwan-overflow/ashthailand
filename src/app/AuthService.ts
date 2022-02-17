import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private storage: Storage) {
        
    }
    titlePublic(){
        const title = "สังเกตสถานที่สาธารณะ";
        return title;
    }
    titleShop(){
        const title = "สังเกตร้านค้า";
        return title;
    }
}