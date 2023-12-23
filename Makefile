sqlcreate:
	sequelize model:create --name $(name) --attributes name:string

sqlseedgen:
	sequelize seed:generate --name $(name)

sqlseedall:
	sequelize db:seed:all

merge:
	export curr=$(git branch --show-current) && git add . && git commit -m $curr && git push

.PHONY: sqlcreate sqlseedgen sqlseedall