DB_NAME=transit_view
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432
DB_CONTAINER=postgres

define EXEC_SQL
	PGPASSWORD=$(DB_PASSWORD) psql -U $(DB_USER) -h $(DB_HOST) -p $(DB_PORT) -d $(DB_NAME) -f $(1)
endef

define DOCKER_EXEC_SQL
	docker cp $(1) $(DB_CONTAINER):/tmp/$(notdir $(1))
	docker exec -i -e PGPASSWORD=$(DB_PASSWORD) $(DB_CONTAINER) psql -U $(DB_USER) -d $(DB_NAME) -f /tmp/$(notdir $(1))
	docker exec $(DB_CONTAINER) rm /tmp/$(notdir $(1))
endef

all:create-db init-db execute-sql init-project

create-db:
	docker exec -e PGPASSWORD=$(DB_PASSWORD) $(DB_CONTAINER) psql -U $(DB_USER) -tc \
	"SELECT 1 FROM pg_database WHERE datname = '$(DB_NAME)';" | findstr 1 || \
	docker exec -e PGPASSWORD=$(DB_PASSWORD) $(DB_CONTAINER) psql -U $(DB_USER) -c \
	"CREATE DATABASE \"$(DB_NAME)\";"

init-db:
	cd server && npx prisma migrate dev --name init

execute-sql:
	$(call EXEC_SQL,sql/cctv.sql)
	$(call EXEC_SQL,sql/device.sql)
	$(call EXEC_SQL,sql/road.sql)
	$(call EXEC_SQL,sql/travel_segments.sql)
	$(call EXEC_SQL,sql/user.sql)

init-project:
	cd server && npm i
	cd web && npm i
	cd test && npm i