
if [[ $1 = "prod" || $1 = "dev" ]]; then
	cd ..

	fileEnv="docker-compose.${1}.yaml"

	envFile=".env.${1}"

	echo "Running docker compose --env-file .env --env-file $envFile -f docker-compose.yaml -f $fileEnv "${@:2}"" 

	cd ..  && docker compose --env-file .env --env-file $envFile -f docker-compose.yaml -f $fileEnv "${@:2}"
else
	echo "Need to follow format .deploy.sh prod|dev [...args]"
fi
