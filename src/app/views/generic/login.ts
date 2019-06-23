import { Component, OnInit } from '@angular/core';
import { LoginInfo, LoginView, Services } from '@plone/restapi-angular';
import { AdminService } from '../../service';
import { map, filter, tap } from 'rxjs/operators';

@Component({
    selector: 'g-basic-auth-login',
    templateUrl: './login.html',
    styleUrls: ['./login.scss'],
})
export class BasicAuthLoginComponent extends LoginView implements OnInit {
    isPending: boolean;
    useToken = false;

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

    onSubmit(data: LoginInfo | {token: string}) {
        this.error = '';
        if (!this.useToken) {
            const info = data as LoginInfo;
            this.adminService.doLogin(info.login, info.password);
        } else if (!!data['token']) {
            this.adminService.doTokenLogin(data['token']);
        }
    }
}
