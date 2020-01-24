GA_ID:=UA-29701804-1
JQUERY_VERSION:=1.12.4
FOTORAMA_VERSION:=4.6.4

vendor/ga:
	mkdir -p vendor/ga
	curl -s https://www.googletagmanager.com/gtag/js?id=${GA_ID} -o vendor/ga/gtag.js
	curl -s https://www.google-analytics.com/analytics.js -o vendor/ga/analytics.js

vendor/jquery:
	mkdir -p vendor/jquery
	curl -s https://ajax.googleapis.com/ajax/libs/jquery/${JQUERY_VERSION}/jquery.js -o vendor/jquery/jquery.js

vendor/fotorama:
	mkdir -p vendor/fotorama
	curl -s https://cdnjs.cloudflare.com/ajax/libs/fotorama/${FOTORAMA_VERSION}/fotorama.js -o vendor/fotorama/fotorama.js
	curl -s https://cdnjs.cloudflare.com/ajax/libs/fotorama/${FOTORAMA_VERSION}/fotorama.css -o vendor/fotorama/fotorama.css
	curl -s https://cdnjs.cloudflare.com/ajax/libs/fotorama/${FOTORAMA_VERSION}/fotorama.png -o vendor/fotorama/fotorama.png
	curl -s https://cdnjs.cloudflare.com/ajax/libs/fotorama/${FOTORAMA_VERSION}/fotorama@2x.png -o vendor/fotorama/fotorama@2x.png

fetch-vendor: vendor/ga vendor/jquery vendor/fotorama

js: fetch-vendor
	cat vendor/jquery/jquery.js > asset/script.js
	cat vendor/fotorama/fotorama.js >> asset/script.js
	cat src/script.js >> asset/script.js
	uglifyjs asset/script.js --compress --mangle --output asset/script.js

css:
	csso --input vendor/fotorama/fotorama.css --source-map none > asset/stylesheet.css
	csso --input src/legasy/legasy.css --source-map none >> asset/stylesheet.css
	csso --input src/contact/contact.css --source-map none >> asset/stylesheet.css
	csso --input src/link/link.css --source-map none >> asset/stylesheet.css
	csso --input src/list/list.css --source-map none >> asset/stylesheet.css
	cp vendor/fotorama/*.png asset/

build: js css

deps:
	npm install -g uglify-js
	npm install -g csso-cli
