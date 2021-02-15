#!/usr/bin/env bash

openssl req -config openssl.cnf -new -x509 -days 825 -out ca.crt
# Check information:
# openssl x509 -in ca.crt -text -noout
