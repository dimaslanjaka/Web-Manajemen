#!/usr/bin/python
# This code is just for educational only ;)
# coder by jimmyromanticdevil
# code for tutorial Python [ Membuat Bot Auto Clicker ]
import urllib2
import urllib
import sys
import time
import random
import re
import os
proxylisttext = "proxylist.txt"
useragent = ['Mozilla/4.0 (compatible; MSIE 5.0; SunOS 5.10 sun4u; X11)',
		   'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.2.2pre) Gecko/20100207 Ubuntu/9.04 (jaunty) Namoroka/3.6.2pre',
		   'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Avant Browser;',
		   'Mozilla/4.0 (compatible; MSIE 5.5; Windows NT 5.0)',
		   'Mozilla/4.0 (compatible; MSIE 7.0b; Windows NT 5.1)',
		   'Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US; rv:1.9.0.6)',
		   'Microsoft Internet Explorer/4.0b1 (Windows 95)',
		   'Opera/8.00 (Windows NT 5.1; U; en)',
		   'amaya/9.51 libwww/5.4.0',
		   'Mozilla/4.0 (compatible; MSIE 5.0; AOL 4.0; Windows 95; c_athome)',
		   'Mozilla/4.0 (compatible; MSIE 5.5; Windows NT)',
		   'Mozilla/5.0 (compatible; Konqueror/3.5; Linux) KHTML/3.5.5 (like Gecko) (Kubuntu)',
		   'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.0; ZoomSpider.net bot; .NET CLR 1.1.4322)',
		   'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; QihooBot 1.0 qihoobot@qihoo.net)',
		'Mozilla/4.0 (compatible; MSIE 5.0; Windows ME) Opera 5.11 [en]']

referer	= ['http://google.com','http://bing.com','http://facebook.com','http://twitter.com']
link_invation= 'http://cash111.com/ref.php?page=act/ref&invcod=90386'

def Autoclicker(proxy1):
    try:
	proxy = proxy1.split(":")
        print 'Auto Click Using proxy :',proxy1
	proxy_set = urllib2.ProxyHandler({"http" : "%s:%d" % (proxy[0], int(proxy[1]))})
	opener = urllib2.build_opener(proxy_set, urllib2.HTTPHandler)
	opener.addheaders = [('User-agent', random.choice(useragent)),
						('Referer', random.choice(referer))]
	urllib2.install_opener(opener)
	f = urllib2.urlopen(link_invation)
	if "Cash111.com" in f.read():
	   print "[*] Link invation was clicked..."
	else:
	   print "[*] Link invation not clicked !"
           print "[!] Proxy failed"

    except:
           print "[!] Proxy Error "
           pass

def loadproxy():
    try:
	get_file = open(proxylisttext, "r")
	proxylist = get_file.readlines()
	count = 0
        proxy = []
	while count < len(proxylist):
	      proxy.append(proxylist[count].strip())
	      count += 1
        for i in proxy:
            Autoclicker(i)
    except IOError:
	print "\n[-] Error: Check your proxylist path\n"
	sys.exit(1)

def main():
   print """
#################################
Simulation Bot Autoclicker
coder : jimmyromanticdevil
#################################
"""
   loadproxy()
if __name__ == '__main__':
	main()
