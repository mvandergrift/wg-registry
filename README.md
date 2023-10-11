<div align="center">
<h1>WG Registry - The API Integration Platform</h1>
<h3>Accelerating productivity growth through improved collaboration</h3>
<hr />
</div>
<br/>

WunderGraph Cosmo is the On-Premise Platform for building, maintaining, and collaborating on GraphQL Federation. A drop-in replacement for Apollo GraphOS.
<p/>
The repository consists of the following components:

- [otel-sync](./otel-sync): otel sync is the bridge between telemetry & trace data stored in ClickHouse and the registration database that exists in Postgres. It detects APIs by finding operations, parsing their contents, and attemtping to find the top level selections in the AST.

- [registry-svc](./registry-svc): The registry service is the API used to access API registration data. It is used by the `registry-ui` to build the dashboard.

- [UI](./registry-ui): An easy to use UI showcasing the potential use of an API registraiton service, the UI serves an example of the power a dashboard interface can bring to the management of large scale API integrations.

## Getting Started

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Postgres](https://www.postgresql.org/)
- [Cosmo Demo Project](https://github.com/wundergraph/cosmo/)

Setting up 

```shell
docker compose up
```

