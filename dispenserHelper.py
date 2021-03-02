#!/usr/bin/python3
# Import QRCode from pyqrcode 
import pyqrcode 
from pyqrcode import QRCode 

#Import IOTA Components
from iota import Iota
from iota import ProposedTransaction
from iota import Address
from iota import Tag
from iota import TryteString
#Import Iota from PYIOTA

#Local IOTA Setup
seed ='SEED99999999999999999999999999999999999999999999999999999999999999999999999999999'
#Connect to Local IRI
node = Iota('http://103.10.24.222:7000',seed)

#API1
def addressGen():
#Get new address for Transaction
	addresses = node.get_new_addresses()
#Extract the address
	address = addresses['addresses'][0]
#Convert the Address to QR and save to disk
	qr=pyqrcode.create(str(address))
	qr.png("myqr.png")
	return address

def sendData(address,data):
	tx = ProposedTransaction(address=Address(address),message=TryteString.from_unicode(str(data)),tag=Tag('SENDDATA'),value=0)
	tx = node.prepare_transfer(transfers=[tx])
	try:
		result = node.send_trytes(tx['trytes'], depth=3, min_weight_magnitude=9)
		return 1
	except:
		return 0

def sendMoney(address,data,amount):
	tx = ProposedTransaction(address=Address(address),message=TryteString.from_unicode(str(data)),tag=Tag('SENDMONEY'),value=amount)
	tx = node.prepare_transfer(transfers=[tx])
	try:
		result = node.send_trytes(tx['trytes'], depth=3, min_weight_magnitude=9)
		return 1
	except:
		return 0
