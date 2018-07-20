import { Component, OnInit } from '@angular/core';
import { LoginInfo, LoginView, Services } from '@plone/restapi-angular';
import { AdminService } from '../service';
import { map, filter, tap } from 'rxjs/operators';

@Component({
    selector: 'basic-auth-login',
    templateUrl: './login.html',
    styleUrls: ['./login.scss'],
})
export class BasicAuthLoginComponent extends LoginView implements OnInit {
    isPending: boolean;

    constructor(
        public services: Services,
        public adminService: AdminService,
    ) {
        super(services);
    }

    ngOnInit () {
        super.ngOnInit();

        this.services.authentication.isAuthenticated.pipe(
            filter(auth => auth.pending),
            map(() => {
                this.isPending = true;
                this.services.resource.get('/').subscribe(
                    () => {
                        this.isPending = false;
                        return this.services.authentication.setAuthenticated(true);
                    },
                    () => {
                        this.error = 'Wrong username or password';
                        this.isPending = false;
                        this.services.authentication.setAuthenticated(false);
                    }
                );
            })
        ).subscribe();
    }

    onSubmit(data: LoginInfo) {
        this.error = '';
        this.adminService.doLogin(data.login, data.password);
    }
}
