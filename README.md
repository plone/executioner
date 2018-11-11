# Executioner

The Executioner is a simple web user interface to navigate into a Guillotina server, providing full CRUD features on any Guillotina content.

It can be accessed on any Guillotina install at http://locahost:8080/+admin/.

## Development

### Install

```
npm install -g mr-developer
npm install
mrdeveloper
```

### Run

Launch guillotina (make sure to have docker running).
```bash
docker-compose -f ./g-api/docker-compose-local.yml up
```
It will run on http://localhost:8081

Then run the executioner:
```
npm start
```

and then open http://localhost:4200

Build:

```
npm run build_prod
```
