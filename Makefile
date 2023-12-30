sqlcreate:
	sequelize model:create --name $(name) --attributes name:string

sqlseedgen:
	sequelize seed:generate --name $(name)

sqlseedall:
	sequelize db:seed:all

merge:
	git add . && git commit -m "$(curr)" && git push && git switch main && git merge $(curr) && git push

staging:
	NODE_ENV=staging node index.js

.PHONY: sqlcreate sqlseedgen sqlseedall merge