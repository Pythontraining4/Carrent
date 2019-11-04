// Copyright (c) 2019, mit and contributors
// For license information, please see license.txt

frappe.ui.form.on('Request Pinjaman', {
	tanggal_pinjam: function(frm) {
		if (frm.doc.tanggal_pinjam < get_today()) {
			frm.set_value('tanggal_pinjam','');
			frappe.throw('Anda tidak bisa memilih tanggal terdahulu');
			}
	},
	lama_pinjam: function(frm){
		frm.set_value('estimasi_tanggal_kembali',
					frappe.datetime.add_days(frm.doc.tanggal_pinjam,frm.doc.lama_pinjam));
	},
	tambahan: function(frm){
		var harga= frm.doc.total_harga;
		if (frm.doc.tambahan == 'Pakai Supir')
		{
			
			var supir= 150000;
			var total= frm.doc.total_harga + supir;
			frm.set_value('total_harga','');
			frm.set_value('total_harga',total);
		}
		else if(frm.doc.tambahan == 'Tidak Pakai Supir') {
			frm.set_value('total_harga','');
			frm.set_value('total_harga',harga);
		}
	},

	id_mobil: function(frm){
		frappe.call({
			method : "frappe.client.get",
			args:{
				doctype : "Master Mobil",
				name : frm.doc.id_mobil
			},
			callback:function (r){
				var harga= r.message.harga;
				frm.set_value('total_harga','')
				frm.set_value('total_harga',harga)
					
				
			
			}	
		})	
	},

	pembayaran: function(frm){
		
		
			if(frm.doc.total_harga == '')
			{
				frm.set_value('pembayaran','');
				frappe.throw('Anda tidak bisa mengisi pembayaran karena belum ada harga yang harus dibayar');
			}
			else
			{
				if(frm.doc.tipe_pembayaran == 'Lunas')
				{
					var bayar = frm.doc.pembayaran;
					var harga = frm.doc.harga;
					if (bayar < harga)
					{
						frm.set_value('pembayaran','');
						frappe.throw('Uang yang dibayarkan Kurang');
					}
				}
				else
				{
					var bayar = frm.doc.pembayaran;
					var harga = frm.doc.total_harga;
				
					if (bayar < harga)
					{
						var sisa= harga - bayar;
						frm.set_value('sisa_pembayaran',sisa);
					}
				}
		}
	}
});
