run:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
reset:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml down
	docker rm -f $(docker ps -a -q)
	docker volume rm $(docker volume ls -q)
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build
stop:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml down
migration_up:
	docker exec -it postgres
	cat schema.sql
	
.PHONY: run reset stop migration_up