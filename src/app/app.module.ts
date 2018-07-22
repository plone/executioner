import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RESTAPIModule } from '@plone/restapi-angular';
import { TraversalModule } from 'angular-traversal';
import { AdminService } from './service';
import { AppComponent } from './app.component';
import { BasicAuthLoginComponent } from './views/login';
import { DatabaseView } from './views/database';
import { ApplicationView } from './views/application';
import { GenericView } from './views/view';
import { GenericAddView } from './views/add';
import { SharingView } from './views/sharing';
import { EditView } from './views/edit';
import { BehaviorsView } from './views/behaviors';
import { ButtonModule, TextFieldModule, BadgeModule, ToasterModule } from 'pastanaga-angular';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ToolbarComponent } from './components/toolbar.component';
import { ContainerView } from './views/container';
import { AddonsView } from './views/addons';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        BasicAuthLoginComponent,
        ToolbarComponent,
        DatabaseView,
        ApplicationView,
        GenericView,
        GenericAddView,
        ContainerView,
        NavigationComponent,
        SharingView,
        EditView,
        BehaviorsView,
        AddonsView,
    ],
    imports: [
        BrowserModule,
        RESTAPIModule,
        FormsModule,
        TraversalModule,

        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
        ButtonModule,
        TextFieldModule,
        BadgeModule,
        ToasterModule.forRoot(),
    ],
    entryComponents: [
        ApplicationView,
        DatabaseView,
        GenericView,
        ContainerView,
        GenericAddView,
        SharingView,
        EditView,
        BehaviorsView,
        AddonsView,
    ],
    providers: [
        AdminService,
        {
            provide: 'CONFIGURATION',
            useValue: {
                BACKEND_URL: environment.backend,
                CLIENT_TIMEOUT: 5000,
            },
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
