sqlcreate:
	sequelize model:create --name $(name) --attributes name:string

sqlseedgen:
	sequelize seed:generate --name $(name)

sqlseedall:
	sequelize db:seed:all

.PHONY: sqlcreate sqlseedgen sqlseedall