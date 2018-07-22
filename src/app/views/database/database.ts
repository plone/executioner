import { Component } from '@angular/core';
import { ViewView } from '@plone/restapi-angular';

@Component({
  selector: 'g-database-view',
  templateUrl: './database.html',
})
export class DatabaseView extends ViewView {
    name: string;

    onTraverse(target) {
        this.name = target.contextPath.split('/').pop();
    }
}
