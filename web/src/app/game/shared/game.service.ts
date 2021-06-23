import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {PokerEnvironmentService} from "../../shared/services/environmant.service";

@Injectable()
export class PokerGameService {

    constructor(
        private http: HttpClient,
        private env: PokerEnvironmentService
    ) {
    }
}