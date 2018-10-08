import { Component } from '@angular/core';
import { TraversingComponent, Services, EditView as Base } from '@plone/restapi-angular';
import { Toaster } from 'pastanaga-angular';
import { Target } from 'angular-traversal';

const FIELDS_EXCLUDE = [
    'type_name',
    'uuid',
    'creation_date',
    'modification_date',
    'history',
    'tiles',
    'tiles_layout',
];

@Component({
    selector: 'g-edit-view',
    templateUrl: './edit.html',
    styleUrls: ['./edit.scss'],
})
export class EditView extends Base {
    json: string;
    error = false;
    schema: any;
    editModel: any;
    useSchemaForm = true;
    richTextFields: string[] = [];

    constructor(services: Services, private toaster: Toaster) {
        super(services);
    }

    onTraverse(target: Target) {
        super.onTraverse(target);
        const model = target.context;
        this.services.resource
            .type(target.context['@type'], target.path.split('/').splice(0, 3).join('/'))
            .subscribe(mainSchema => {
                // define main fieldset
                mainSchema.fieldsets = [{
                    id: 'fieldset-main',
                    title: 'Default',
                    fields: [],
                }];

                // move behavior fields in main schema
                mainSchema = this.flattenSchema(mainSchema);

                // filter and fix fields
                mainSchema = this.processSchema(mainSchema);

                // set main fieldset fields
                mainSchema.fieldsets[0].fields = Object.keys(mainSchema.properties)
                .filter(prop => prop.indexOf('.') === -1);

                this.schema = mainSchema;
                this.model = model;
                this.editModel = this.flattenModel(JSON.parse(JSON.stringify(model)));
            });
    }

    processSchema(schema: any): any {
        if (!schema.properties) {
            return;
        }
        Object.keys(schema.properties).forEach(prop => {
            if (!schema.properties[prop] || prop.startsWith('__') || FIELDS_EXCLUDE.includes(prop) || schema.properties[prop].readonly) {
                delete schema.properties[prop];
                return;
            }
            if (schema.properties[prop].type === 'array' && !schema.properties[prop].items) {
                schema.properties[prop].widget = 'select';
                schema.properties[prop].items = {
                    type: 'string',
                    oneOf: []
                };
            }
            if (schema.properties[prop].type === 'datetime') {
                // FIX ME: add a datetime widget on our form lib
                schema.properties[prop].type = 'string';
            }
            if (schema.properties[prop].type === 'integer') {
                schema.properties[prop].type = 'string';
            }
            if (schema.properties[prop].widget && (
                schema.properties[prop].widget === 'richtext'
                || schema.properties[prop].widget.id === 'richtext')) {
                schema.properties[prop].type = 'string';
                this.richTextFields.push(prop);
                delete schema.properties[prop].fieldsets;
                delete schema.properties[prop].properties;
            }
        });
        return schema;
    }

    flattenSchema(schema: any): any {
        Object.keys(schema.definitions).forEach(behavior => {
            if (!schema.properties[behavior]) {
                return;
            }
            const behaviorSchema = this.processSchema(schema.definitions[behavior]);
            delete schema.properties[behavior];
            const fields: string[] = [];
            Object.keys(behaviorSchema.properties).forEach(field => {
                schema.properties[behavior + '.' + field] = schema.definitions[behavior].properties[field];
                fields.push(behavior + '.' + field);
            });
            if (fields.length > 0) {
                schema.fieldsets.push({
                    id: 'fieldset-' + behavior,
                    title: behaviorSchema.title,
                    fields: fields,
                });
            }
        });
        return schema;
    }

    flattenModel(model: any): any {
        Object.keys(model).forEach(key => {
            if (key.includes('.')) {
                Object.keys(model[key]).forEach(subKey => {
                    const flatKey = key + '.' + subKey;
                    model[flatKey] = model[key][subKey];
                    if (this.richTextFields.includes(flatKey) && model[flatKey].data) {
                        model[flatKey] = model[flatKey].data;
                    }
                });
                delete model[key];
            }
        });
        return model;
    }

    updateModel(model: any, flatModel: any): any {
        Object.keys(flatModel).forEach(key => {
            if (this.richTextFields.includes(key)) {
                flatModel[key] = {
                    content_type: 'text/html',
                    encoding: 'utf-8',
                    data: flatModel[key],
                };
            }
            if (key.includes('.')) {
                const behavior = key.split('.').slice(0, -1).join('.');
                const subKey = key.split('.').slice(-1)[0];
                model[behavior][subKey] = flatModel[key];
            } else {
                model[key] = flatModel[key];
            }
        });

        return model;
    }

    update(value) {
        this.json = value;
    }

    save() {
        let model: any;
        if (this.useSchemaForm) {
            model = this.updateModel(this.model, this.editModel);
        } else {
            try {
                model = JSON.parse(this.json);
                this.error = false;
            } catch (SyntaxError) {
                this.error = true;
            }
        }
        if (!this.error) {
            this.services.resource
                .save(this.context['@id'], model)
                .subscribe(
                    () => this.toaster.open('Updated'),
                    () => this.toaster.open('Error when updating'),
                );
        }
    }

    toggleMode() {
        this.useSchemaForm = !this.useSchemaForm;
    }
}
