# Syngenta

## Running Server

Run `make dev` for development server or `make prod` for production

> Alternatively you can `cd` to `bin` and run `.deploy.sh [up / down] [dev / prod] ...` for more control

---

Instructions for development workflow for specific services are declared in the folders themselves. 

---

Backend Steps:

- Get all documents in the backend and group by Type

- Extract Key User Information - most valuable key points and relevance
	- Maybe we can provide some context so it understands which content would be relevant to extract
