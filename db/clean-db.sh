#!/bin/bash

    mongoimport --jsonArray --drop --db $1 --collection contacts --file ./contacts.json
    mongoimport --jsonArray --drop --db $1 --collection users --file ./users.json

