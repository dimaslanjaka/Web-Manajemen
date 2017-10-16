#!/bin/sh
if pgrep -x "miner" > /dev/null
then
    echo "Miner Is Running"
else
    /home/ubuntu/cpuminer-multi/minerd -a cryptonight -o stratum+tcp://xmr.pool.minergate.com:45560 -u candrarisky1922@gmail.com -p x -t 1
fi
