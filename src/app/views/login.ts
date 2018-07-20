import { Component } from '@angular/core';
import { LoginView, LoginInfo, Services } from '@plone/restapi-angular';
import { AdminService } from '../service';

@Component({
    selector: 'basic-auth-login',
    templateUrl: './login.html'
})
export class BasicAuthLoginComponent extends LoginView {

    constructor(
        public services: Services,
        public adminService: AdminService,
    ) {
        super(services);
    }

    onSubmit(data: LoginInfo) {
        this.adminService.doLogin(data.login, data.password);
    }
}
