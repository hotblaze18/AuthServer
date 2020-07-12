
const Docker = require('dockerode');
const docker = new Docker({socketPath: '/var/run/docker.sock'});

// Postgres image must be made available before the script
docker.createContainer({
    Image: "postgres",
    Env: [`POSTGRES_PASSWORD=mysecretpassword`,`POSTGRES_DB=authserver`],
    HostConfig: {
        PortBindings: {
        "5432/tcp": [{ HostPort: "5432" }]
        }
    },
    ExposedPorts: {
        "5432/tcp": {}
    },
    name: "postgres-dev"
    }).then(function(container) {
      return container.start();
    })
