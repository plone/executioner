import { Injectable } from '@angular/core';
import { Services } from '@plone/restapi-angular';
import {filter, concatMap, take} from 'rxjs/operators';

@Injectable()
export class AdminService {

    constructor(public services: Services) {}

    doLogin(login: string, password: string) {
        // Application or Database objects do not provide JWT, we use basic auth at first
        this.services.authentication.setBasicCredentials(login, password, true);
        // as soon as we traverse in a richer object, we try JWT auth
        this.services.traverser.target.pipe(
            filter(target => target.context['@type'] &&
                ['Database', 'Application'].indexOf(target.context['@type']) === -1),
            concatMap(target => this.services.authentication.login(login, password, target.contextPath)),
            take(1)
        ).subscribe();
        this.services.traverser.traverseHere();
    }

    doTokenLogin(token: string) {
        this.services.authentication.setAuthToken(token);
        this.services.traverser.traverseHere();
    }
}
