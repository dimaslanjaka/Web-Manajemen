#!/bin/sh
if pgrep -x "miner" > /dev/null
then
    echo "Miner Is Running..."
else
    minergate-cli -user candrarisky1922@gmail.com -xmr 1
fi
