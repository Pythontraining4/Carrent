# -*- coding: utf-8 -*-
# Copyright (c) 2019, mit and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class Pengembalian(Document):
	pass

	def on_submit(self):
		self.change_status_buku()

	def change_status_buku(self):
		
		mobil = frappe.get_doc("Master Mobil",id_mobil)
		mobil.status = 'Available'
		mobil.save()
			
		pinjaman = frappe.get_doc("Pinjaman",self.id_pinjaman)
		pinjaman.status = 'Close'
		pinjaman.save()
		pinjaman.submit()