# CiffiDesign Frontend Generator #

##installare globalmente tramite npm##

```

npm install -g github:ciffi/ciffi-frontend-generator.git

```

##utilizzo##

* dalla linea di comando posizionarsi nella root del nuovo progetto ed eseguire il comando ciffi setup nomeprogetto (il nome del progetto definirà anche le url di base del configuratore)

```

ciffi setup projectName

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

ciffi dev

```
e collegarsi all'indirizzo http://localhost:8080

##build##

```

ciffi build

```