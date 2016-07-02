# CiffiDesign Frontend Generator #

##installare globalmente tramite npm##

```
#!javascript

npm install -g bitbucket:purplenetwork/frontend-webpack-build.git

```

##utilizzo##

* dalla linea di comando posizionarsi nella root del nuovo progetto ed eseguire il comando ciffidesign:setup

```
#!javascript

ciffidesign:setup

```

##setup e configurazione##

* rispondere alle domande per genereare i file di configurazione dell'app

###verranno modificati i file scss:###
* dev/styles/config/config-dev.scss
* dev/styles/config/config-local.scss
* dev/styles/config/config-stage.scss
* dev/styles/config/config-prod.scss

###verrà generato il file javascipt:###
* dev/scripts/config/config.js

##sviluppo locale##

```
#!javascript

npm run dev

```
e collegarsi all'indirizzo http://localhost:8080

##build##

```
#!javascript

npm run dev

```