## API Movies

API REST para obter o produtor com maior intervalo entre dois prêmios consecutivos, e o que
obteve dois prêmios mais rápido.

### Como rodar

```
yarn dev
```

Ou:

```
docker compose up api
```

### Rotas

```
GET /movies/winners-intervals (maior/menor intervalo)
GET /movies (lista todos os filmes)
GET /movies/{id} (exibe o filme)
POST /movies (cadastra um novo filme)
PUT /movies/{id} (atualiza um filme)
DELETE /movies/{id} (deleta um filme)
```

### Tests

```
yarn test
```

Ou:

```
docker compose up test
```
