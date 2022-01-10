#!/bin/bash

# Docker containers for the below infrastructure is described here:
# https://psfoundation.cash/blog/cash-stack
# Pre-synced databases can be downloaded on the CashStrap page:
# https://fullstack.cash/cashstrap

# Which network are you using?
export NETWORK=mainnet
#export NETWORK=testnet

# Full node
export RPC_IP=127.0.0.1:2136
export RPC_BASEURL=http://$RPC_IP/
export RPC_USERNAME=bitcoin
export RPC_PASSWORD=password

# (optional) If load-balancing multiple full nodes, it's best to pick a single
# one for broadcasting transactions to the network. Prevents accidental
# double spends.
#export RPC_SENDURL=http://$RPC_IP/

# SLPDB
#export SLPDB_PASS_GP=somelongpassword
#export SLPDB_URL=http://<SLPDB IP>:12300/
# Use the same address as SLPDB_URL if you don't have a separate whitelist server.
#export SLPDB_PASS_WL=somelongpassword
#export SLPDB_WHITELIST_URL=http://<SLPDB IP>:12300/
# slp-api alternative SLP validator using slp-validate:
# https://github.com/Permissionless-Software-Foundation/slp-api
#export SLP_API_URL=http://10.0.0.5:5001/

# Mainnet Fulcrum / ElectrumX
export FULCRUM_URL=fulcrum.ergon.network
export FULCRUM_PORT=52138
export FULCRUM_API=http://fulcrum.ergon.network

# Redis DB - Used for rate limiting - customize to your own Redis installation.
export REDIS_PORT=6379
export REDIS_HOST=127.0.0.1

# JWT Token Secret
# This is used to verify JWT tokens generated with jwt-bch-api:
# https://github.com/Permissionless-Software-Foundation/jwt-bch-api
export TOKENSECRET=somelongpassword

# So that bch-api can call bch-js locally.
export LOCAL_RESTURL=http://127.0.0.1:3000/v5/

# Basic Authentication password
export PRO_PASS=somerandomepassword:someotherrandompassword:aThirdPassword

# Whitelisted domains. Automatically give pro-tier rate limit access to apps
# that originate froma domain on the whitelist.
export WHITELIST_DOMAINS=fullstack.cash,psfoundation.cash,torlist.cash

# Rate Limits. Numbers are divided into 1000. e.g. 10000 / 500 = 20 RPM for ANON.
# Requests use the ANON rate limit if they fail to pass in a JWT token.
# ANON = 20 requests per minute (RPM)
export ANON_RATE_LIMIT=500
# 10 = 1000 RPM
export WHITELIST_RATE_LIMIT=100

# Set logging parameters
#1m means no more than 1 megabyte
export LOG_MAX_SIZE=1m
#5d means store no more than 5 days
export LOG_MAX_FILES=5d

npm start
