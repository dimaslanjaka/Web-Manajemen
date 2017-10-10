if pgrep -x "minerd" > /dev/null
then
    echo "Miner Is Running"
else
    echo "Miner Is Stopped"
fi
