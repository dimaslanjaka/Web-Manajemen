#!/bin/bash
if [ "$EUID" -ne 0 ] then
 echo "Please Run As Root"
 exit
fi
EDITOR=vim
PASSWD=/etc/passwd
RED='\033[0;41;30m'
STD='\033[0;0;39m'
 
pause(){
  read -p "Press [Enter] key to continue..." fackEnterKey
}

cpuminer-multi(){
sudo mkdir /home/ubuntu
cd /home/ubuntu
sudo apt-get update -y && sudo apt-get -f install libcurl4-openssl-dev git -y && sudo apt-get -f install build-essential autotools-dev autoconf libcurl3 libcurl4-gnutls-dev -y && sudo git clone https://github.com/wolf9466/cpuminer-multi && cd cpuminer-multi/ && ./autogen.sh && CFLAGS="-march=native" ./configure && make && sudo make install && cd ../ && echo "/home/ubuntu/cpuminer-multi/minerd -a cryptonight -o stratum+tcp://xmr.pool.minergate.com:45560 -u candrarisky1922@gmail.com -p x -t 1" > start.sh
}

one(){
        sudo reboot
}

two(){
        sudo pkill miner && sudo /home/ubuntu/cpuminer-multi/minerd -a cryptonight -o stratum+tcp://xmr.pool.minergate.com:45560 -u candrarisky1922@gmail.com -p x -t 1
}

 three(){
#fix mdadm.conf no array
sudo echo "ARRAY <ignore> devices=/dev/sda" >> /etc/mdadm/mdadm.conf
sudo update-initramfs -u
sudo apt-get update
}

four(){
sudo echo "/home/ubuntu/cpuminer-multi/minerd -a cryptonight -o stratum+tcp://xmr.pool.minergate.com:45560 -u candrarisky1922@gmail.com -p x -t 1" > /etc/init.d/zminer.sh
sudo chmod +x /etc/init.d/zminer.sh
sudo chmod ugo+x /etc/init.d/zminer.sh
sudo update-rc.d zminer.sh defaults
}

cli(){
	sudo apt-get update -y && wget https://minergate.com/download/deb-cli -O minergate-cli.deb && sudo dpkg -i minergate-cli.deb -y && sudo minergate-cli -user dimaslanjaka@gmail.com -xmr 2
	}
	os(){
		echo "OS Name :"
		uname -a
		echo "CPU Model :"
		cat /proc/cpuinfo | grep 'model name' | uniq
		echo "CPUs Count :"
		cat /proc/cpuinfo | grep processor 
echo "Number Of Cores :"
cat /proc/cpuinfo | grep 'core id'
echo "Full CPU Information :"
sudo lshw | grep -i cpu
pause 
		}

# function to display menus
show_menus() {
	clear
	echo "~~~~~~~~~~~~~~~~~~~~~"	
	echo " Dimas Lanjaka Menus "
	echo "~~~~~~~~~~~~~~~~~~~~~"
	echo "1. Reboot System"
	echo "2. Start Miner"
	echo "3. Fix mdadm.conf No Array"
	echo "4. Install Miner Every Boot"
 echo "5. Install cpuminer-multi"
 echo "6. Install minergate-cli"
 echo "99. Exit"
}

read_options(){
	local choice
	read -p "Choose Options : " choice
	case $choice in
 1) one ;;
 2) two ;;
 3) three ;;
 4) four ;;
 5) cpuminer-multi ;;
 6) cli ;;
 99) exit 0;;
 *) echo -e "${RED}Error...${STD}" && sleep 1
	esac
}
 
trap '' SIGINT SIGQUIT SIGTSTP

while true
do
	show_menus
	read_options
done
