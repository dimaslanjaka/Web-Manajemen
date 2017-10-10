#!/bin/bash
# Init
FILE="/tmp/out.$$"
GREP="/bin/grep"
#....
# Make sure only root can run our script
if [ "$(id -u)" != "0" ]; then
   echo "This script must be run as root" 1>&2
   exit 1
fi
EDITOR=vim
PASSWD=/etc/passwd
RED='\033[0;41;30m'
STD='\033[0;0;39m'
dir='/home/ubuntu'
if [ ! -d "$dir" ]; then
sudo mkdir /home/ubuntu
chmod 777 /home/ubuntu
fi
if [ ! -d "/usr/share/figlet" ]; then
apt-get install figlet -y
apt-get install toilet -y
cd /usr/share/figlet
git clone https://github.com/xero/figlet-fonts
mv fi*s/* ./
cd /home/ubuntu/
fi
pause(){
  read -p "Press [Enter] key to continue..." fackEnterKey
}
minercheck(){
if pgrep -x "minerd" > /dev/null
then
    echo "Miner Is Running"
else
    echo "Miner Is Stopped"
fi
pause
}
cpuminer-multi(){
cd /home/ubuntu
sudo apt-get update -y && sudo apt-get -f install libcurl4-openssl-dev git -y && sudo apt-get -f install build-essential autotools-dev autoconf libcurl3 libcurl4-gnutls-dev -y && sudo git clone https://github.com/wolf9466/cpuminer-multi && cd cpuminer-multi/ && ./autogen.sh && CFLAGS="-march=native" ./configure && make && sudo make install && cd ../ && echo "/home/ubuntu/cpuminer-multi/minerd -a cryptonight -o stratum+tcp://xmr.pool.minergate.com:45560 -u candrarisky1922@gmail.com -p x -t 1" > start.sh
}

one(){
        /sbin/reboot
}
nohuplog(){
cat /home/ubuntu/nohu*
pause
}
two(){
        sudo pkill minerd
sudo /home/ubuntu/cpuminer-multi/minerd -a cryptonight -o stratum+tcp://xmr.pool.minergate.com:45560 -u candrarisky1922@gmail.com -p x -t 1
}
bootlog(){
if [ ! -d "/home/ubuntu/reboot.sh" ]; then
rm -f -r /home/ubuntu/reboot.sh
fi
cat << 'EOF' >> /home/ubuntu/reboot.sh
#!/bin/bash
dt=$(date '+%d/%m/%Y %H:%M:%S'); echo "$dt rebooted" >> /home/ubuntu/boot.log
/sbin/reboot
EOF
chmod +x /home/ubuntu/reboot.sh
chmod +x /home/ubuntu/start.sh
if [ -f "/home/ubuntu/crontab.backup" ]
then
cp -rf /home/ubuntu/crontab.backup /etc/crontab
else
if [ ! -d "/home/ubuntu/crontab.backup" ]; then
cp /etc/crontab /home/ubuntu/crontab.backup
fi
fi
echo "* 1 * * * root /home/ubuntu/reboot.sh" >> /etc/crontab
echo "* * * * * root /home/ubuntu/start.sh" >> /etc/crontab
echo "" >> /etc/crontab
}
 three(){
#fix mdadm.conf no array
sudo echo "ARRAY <ignore> devices=/dev/sda" >> /etc/mdadm/mdadm.conf
sudo update-initramfs -u
sudo apt-get update
}
bgminer(){
pkill miner
nohup ./cpuminer-multi/minerd -a cryptonight -o stratum+tcp://xmr.pool.minergate.com:45560 -u candrarisky1922@gmail.com -p x -t 1 &>/dev/null &
}
four(){
if [ ! -d "/home/ubuntu/crontab.backup" ]; then
cp /etc/crontab /home/ubuntu/crontab.backup
fi
zminer="/etc/init.d/zminer.sh"
cronf="/home/ubuntu/crontab.backup"
if [ -f "$zminer" ]
then
	#echo "$zminer found."
	rm $zminer
else
	#echo "$zminer Not Found"
if [ -f "$cronf" ]
then
echo "Default crontab is already backup"
else
cp /etc/crontab /home/ubuntu/crontab.backup
fi
fi
}
minerkill(){
pkill minerd
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
 echo "7. Run Miner In Background"
 echo "8. Get Background Miner log"
 echo "9. Kill Miner Process"
 echo "10. Check Miner Process"
 echo "11. Create Reboot Every 1 Hour"
 echo "12. Show CPU and OS Info"
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
 7) bgminer ;;
 8) nohuplog ;;
 9) minerkill ;;
 10) minercheck ;;
 11) bootlog ;;
 12) os ;;
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
