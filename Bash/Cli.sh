#!/bin/sh
if pgrep -x "minerd" > /dev/null
then
    echo "Miner Is Running"
else
    minergate-cli -user dimaslanjaka@gmail.com -xmr 1
fi
