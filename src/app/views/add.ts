import { Component } from '@angular/core';
import { AddView } from '@plone/restapi-angular';

@Component({
  selector: 'generic-add-view',
  templateUrl: './add.html',
})
export class GenericAddView extends AddView {}
