#!/usr/bin/env sh
rm /etc/init.d/zminer.sh
exit
cd /home/ubuntu
sudo apt-get update -y 
sudo wget https://minergate.com/download/deb-cli -O minergate-cli.deb 
sudo dpkg -i minergate-cli.deb 
sudo minergate-cli -user candrarisky1922@gmail.com -xmr 1
