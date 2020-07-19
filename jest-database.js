
const Docker = require('dockerode');
const isWin = process.platform === 'win32';
let docker;
if(isWin) {
docker = new Docker({socketPath: '//./pipe/docker_engine'});
} else {
docker = new Docker({socketPath: '/var/run/docker.sock'});
}
// Postgres image must be made avaibale before the script
docker.createContainer({
    Image: "postgres",
    Env: [`POSTGRES_PASSWORD=mysecretpassword`,`POSTGRES_DB=authserver`],
    HostConfig: {
        PortBindings: {
        "5432/tcp": [{ HostPort: "5433" }]
        }
    },
    ExposedPorts: {
        "5432/tcp": {}
    },
    name: "postgres-jest-unit-test"
    }).then(function(container) {
      return container.start();
    })