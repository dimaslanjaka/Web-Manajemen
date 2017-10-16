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
menuclone='/home/ubuntu/menu.sh'
if [ -f "$dir" ]
then
cd $dir
else
if [ ! -d "$dir" ]; then
sudo mkdir /home/ubuntu
chmod 777 /home/ubuntu
fi
if [ -f "/home/ubuntu/start.sh" ]
then
rm -rf /home/ubuntu/start.sh
curl --output /home/ubuntu/start.sh --insecure "https://raw.githubusercontent.com/dimaslanjaka/Web-Manajemen/master/Bash/miner.sh"
chmod 777 /home/ubuntu/start.sh
else
curl --output /home/ubuntu/start.sh --insecure "https://raw.githubusercontent.com/dimaslanjaka/Web-Manajemen/master/Bash/miner.sh"
chmod 777 /home/ubuntu/start.sh
fi
fi
if [ ! -d "/usr/share/figlet" ]; then
apt-get install figlet -y
apt-get install toilet -y
fi
if [ ! -d "/usr/share/figlet/figlet-fonts" ]; then
cd /usr/share/figlet
git clone https://github.com/xero/figlet-fonts
mv -rf fi*s/* ./
cd /home/ubuntu/
fi
clone(){
echo "Cloning $menuclone..."
curl --insecure -o $menuclone "https://raw.githubusercontent.com/dimaslanjaka/Web-Manajemen/master/Bash/Menu.sh"
chmod 755 $menuclone
}
pause(){
  read -p "Press [Enter] key to continue..." fackEnterKey
}
miner250_64bit(){
apt-get install libpcre3 libpcre3-dev -y
sudo apt-get install make libcurl4-openssl-dev -y
curl --insecure --output cpuminer250_64bit.tar.gz "https://github.com/pooler/cpuminer/releases/download/v2.5.0/pooler-cpuminer-2.5.0-linux-x86_64.tar.gz" #wget https://github.com/pooler/cpuminer/releases/download/v2.5.0/pooler-cpuminer-2.5.0-linux-x86_64.tar.gz
tar xzf  cp*64*z
}
miner250_32bit(){
apt-get install libpcre3 libpcre3-dev -y
sudo apt-get install make libcurl4-openssl-dev -y
curl --insecure --output cpuminer250_32bit.tar.gz "https://github.com/pooler/cpuminer/releases/download/v2.5.0/pooler-cpuminer-2.5.0-linux-x86.tar.gz" #wget https://github.com/pooler/cpuminer/releases/download/v2.5.0/pooler-cpuminer-2.5.0-linux-x86.tar.gz
tar xzf cpu*32*gz
}
runscrypt(){
pkill minerd
./cpu*0/minerd -a scrypt -t 1 -s 4 -o stratum+tcp://217.115.116.95:3333 -u candra22.x -p x
}
runscriptbg(){
pkill minerd
./cpu*0/minerd -a scrypt -t 1 -s 4 -o stratum+tcp://217.115.116.95:3333 -u candra22.x -p x 2> /home/ubuntu/scryptlog.txt
}
universalscrypt(){
apt-get install libpcre3 libpcre3-dev -y
sudo apt-get install make libcurl4-openssl-dev -y
wget https://github.com/pooler/cpuminer/releases/download/v2.5.0/pooler-cpuminer-2.5.0.tar.gz
tar xzf pooler-cpuminer-*.tar.gz
cd cpuminer-*
./configure CFLAGS="-O3"
make
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
sudo apt-get update -y && sudo apt-get -f install libcurl4-openssl-dev git -y 
apt-get -f install build-essential autotools-dev autoconf libcurl3 libcurl4-gnutls-dev -y 
sudo git clone https://github.com/wolf9466/cpuminer-multi 
cd cpuminer-multi/ 
./autogen.sh && CFLAGS="-march=native" ./configure 
make && sudo make install 
cd /home/ubuntu/
curl --insecure -o /ubuntu/home/start.sh "https://raw.githubusercontent.com/dimaslanjaka/Web-Manajemen/master/Bash/miner.sh"
chmod 755 start.sh
}

one(){
        /sbin/reboot
}
nohuplog(){
cat /home/ubuntu/nohu*
pause
}
two(){
      pkill minerd
sudo /home/ubuntu/cpuminer-multi/minerd -a cryptonight -o stratum+tcp://xmr.pool.minergate.com:45560 -u candrarisky1922@gmail.com -p x -t 1
}
bootlog(){
if [ -f "/etc/init.d/zminer.sh" ]
then
rm -f /etc/init.d/zminer.sh
else
curl --output /home/ubuntu/start.sh --insecure "https://raw.githubusercontent.com/dimaslanjaka/Web-Manajemen/master/Bash/miner.sh"
chmod 777 /home/ubuntu/start.sh
fi
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
echo "0 */4 * * * root /sbin/shutdown -r now" >> /etc/crontab
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
pkill minerd
nohup ./cpuminer-multi/minerd -a cryptonight -o stratum+tcp://xmr.pool.minergate.com:45560 -u candrarisky1922@gmail.com -p x -t 1 &>/home/ubuntu/minerlog.txt &
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
sudo apt-get update -y 
apt-get install libpcre3 libpcre3-dev -y
wget https://minergate.com/download/deb-cli -O minergate-cli.deb 
dpkg -i minergate-cli.deb -y 
curl -o /home/ubuntu/cli.sh --insecure "https://raw.githubusercontent.com/dimaslanjaka/Web-Manajemen/master/Bash/Cli.sh"
chmod 755 /home/ubuntu/cli.sh
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
 ps aux | grep miner
 figlet -f digital "Dimas Lanjaka Menus"
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
 echo "0. Clone This Menu To $menuclone"
}

read_options(){
	local choice
	read -p "Choose Options : " choice
	case $choice in
 0) clone ;;
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
