// Copyright (c) 2019, mit and contributors
// For license information, please see license.txt

frappe.ui.form.on('Pengembalian', {
	tanggal_kembali: function (frm) {
		frappe.call({
			method: "frappe.client.get",
                args: {
					doctype: "Pinjaman",
					name: frm.doc.id_pinjaman
				},
			callback: function(r) {
				if (r.message) {
					if(frm.doc.tanggal_kembali > frm.doc.estimasi_tanggal_kembali) {
						var tanggal_kembali = new Date(frm.doc.tanggal_kembali)
						var estimasi_tanggal_kembali = new Date(frm.doc.estimasi_tanggal_kembali)
						var selisih = tanggal_kembali.getDate() - estimasi_tanggal_kembali.getDate()
						var denda = selisih *  50000
						frm.set_value('denda', denda)
					}
					else if(frm.doc.tanggal_kembali < frm.doc.estimasi_tanggal_kembali) {
						frm.set_value("tanggal_kembali","")
						frappe.throw('Anda tidak bisa memilih tanggal terdahulu')
					}
				}
			}
		})
	},
	pinalti: function(frm){
		var pinalti= frm.doc.pinalti;
		var denda=frm.doc.denda;
		var total= denda+pinalti;
		frm.set_value('denda',total);
	}
});
