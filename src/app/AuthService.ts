import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private loggedIn = new BehaviorSubject<boolean>(false);

    constructor(private storage: Storage) {
    }

    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }

    public setLogged(user) {
        if (!!user) {
            this.storage.set('storage_xxx',user); // store session data
            this.loggedIn.next(true);
        }
    }

    logout() {
        this.loggedIn.next(false);
    }
}