dev:
	cd misc/bin && ./deploy.sh dev up

dev-down:
	cd misc/bin && ./deploy.sh dev down

dev-build:
	cd misc/bin && ./deploy.sh dev build

prod:
	cd misc/bin && ./deploy.sh prod up

prod-down:
	cd misc/bin && ./deploy.sh prod down

prod-build:
	cd misc/bin && ./deploy.sh prod build

db-push:
	cd misc/bin && ./pushDb.sh
