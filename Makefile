sqlcreate:
	sequelize model:create --name $(name) --attributes name:string

sqlseedgen:
	sequelize seed:generate --name $(name)

sqlseedall:
	sequelize db:seed:all

merge:
	git add . && git commit -m "let's merge this $(curr)" && git push && git switch main && git merge $(curr)

this:
	make merge curr=$(git branch --show-current)

.PHONY: sqlcreate sqlseedgen sqlseedall merge