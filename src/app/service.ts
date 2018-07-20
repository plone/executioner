import { Injectable } from '@angular/core';
import { Services } from '@plone/restapi-angular';
import { filter, concatMap, tap } from 'rxjs/operators';
import { take } from 'rxjs-compat/operator/take';

@Injectable()
export class AdminService {

    constructor(public services: Services) {

    }

    doLogin(login: string, password: string) {
        // Database object does not provide JWT, we use basic auth
        this.services.authentication.setBasicCredentials(login, password);
        // as soon we enter a richer object, we perform the JWT auth
        this.services.traverser.target.pipe(
            filter(target => target.context['@type'] && target.context['@type'] !== 'Database'),
            concatMap(target => this.services.authentication.login(login, password, target.contextPath))
        ).take(1).subscribe();
        this.services.traverser.traverse(this.services.traverser.target.getValue().contextPath);
    }


}
