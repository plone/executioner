export interface IContext {
    '@type': string;
    is_folderish: boolean;
}

export class Context {
    '@type': string;
    is_folderish = false;

    constructor(data: IContext) {
        this['@type'] = data['@type'];
        this.is_folderish = data.is_folderish;
    }
}

export class Container extends Context {
    '@id': string;
    '@name': string;
    '@uid': string;
    '@static_behaviors': string[];
    parent?: Container;
    title: string;
    type_name: string;
    items?: Container[];

    constructor(data) {
        super(data);
        this['@id'] = data['@id'];
        this['@name'] = data['@name'];
        this['@uid'] = data['@uid'];
        this['@static_behaviors'] = data['@static_behaviors'];
        this.parent = data.parent;
        this.title = data.title;
        this.type_name = data.type_name;
        this.items = data.items;
    }
}

export class Application extends Context {
    databases: string[];

    constructor(data) {
        super(data);
        this.databases = data.databases;
    }
}

export class Database extends Context {
    containers: string[];

    constructor(data) {
        super(data);
        this.containers = data.containers;
    }
}

export const buildContext = (data: IContext): Context => {
    switch (data['@type']) {
        case 'Application':
            return new Application(data);
        case 'Database':
            return new Database(data);
        default:
            return new Container(data);
    }
};

export class NavigationModel {
    path: string;
    title: string;
    constructor(data: {path: string, title: string}) {
        this.path = data.path;
        this.title = data.title;
    }
}

export class PaginationModel {
    total: number;
    pageSize: number;
    constructor(data: {items_count: number, page_size: number}) {
        this.total = data.items_count;
        this.pageSize = data.page_size;
    }
}
