# -*- coding: utf-8 -*-
# Copyright (c) 2019, mit and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class RequestPinjaman(Document):
	pass

	def on_submit(self):
		self.on_approve()

	def on_approve(self):
		# if (self.workflow_state == 'Submitted'):
		if (self.docstatus == 1):
			pinjaman = frappe.new_doc("Pinjaman")
			pinjaman.id_member = self.id_member
			pinjaman.tanggal_pinjam = self.tanggal_pinjam
			pinjaman.estimasi_tanggal_kembali = self.estimasi_tanggal_kembali
			pinjaman.lama_pinjam = self.lama_pinjam
			pinjaman.id_mobil = self.id_mobil
			pinjaman.tipe_mobil = self.tipe_mobil
			pinjaman.merk_mobil = self.merk_mobil
			pinjaman.plat_nomor = self.plat_nomor
			pinjaman.total_harga = self.total_harga
			pinjaman.tipe_pembayaran = self.tipe_pembayaran
			pinjaman.sisa_pembayaran = self.sisa_pembayaran
			pinjaman.sudah_dibayar = self.pembayaran
			pinjaman.save()
			new_pinjaman = frappe.get_doc("Pinjaman", pinjaman.name)
			frappe.msgprint("Success Create Pinjaman with doc no. {}".format(new_pinjaman.name))
			self.change_status()
	
	def change_status(self):
		if (self.request_line):
			for i in self.request_line:
				mobil = frappe.get_doc("Master Mobil",id_mobil)
				mobil.status = "Borrowed"
				mobil.save()