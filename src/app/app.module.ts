import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RESTAPIModule } from '@plone/restapi-angular';
import { AdminService } from './service';
import { AppComponent } from './app.component';
import { BasicAuthLoginComponent } from './views/login';
import { DatabaseView } from './views/database';
import { GenericView } from './views/view';
import { GenericAddView } from './views/add';
import { ButtonModule, TextFieldModule } from 'pastanaga-angular';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        BasicAuthLoginComponent,
        DatabaseView,
        GenericView,
        GenericAddView,
    ],
    imports: [
        BrowserModule,
        RESTAPIModule,
        FormsModule,

        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
        ButtonModule,
        TextFieldModule,
    ],
    entryComponents: [DatabaseView, GenericView, GenericAddView],
    providers: [
        AdminService,
        {
            provide: 'CONFIGURATION',
            useValue: {
                BACKEND_URL: 'http://127.0.0.1:8080/db',
                CLIENT_TIMEOUT: 5000,
            },
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
