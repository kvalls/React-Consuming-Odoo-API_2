# -*- coding: utf-8 -*-
from odoo import http
from odoo.http import request


class Business(http.Controller):

    @http.route('/api/business/getAll', type="json", auth="public", csrf=True, cors='*')
    def list(self):
        business_rec = request.env['business.business'].sudo().search([])
        businesses = []
        for rec in business_rec:
            vals = {
                'id': rec.id,
                'name': rec.name,
                'image': rec.image,
                'email': rec.email,
                'phone_number': rec.phone_number,
                'sales': rec.sales,
                'customers': rec.customers,
                'conversion_rate': rec.conversion_rate,
            }
            businesses.append(vals)
        return {'status': 200, 'response': businesses, 'message': 'Success'}

    @http.route('/api/business/get/<int:rec_id>', type='json', auth='public', csrf=True, cors='*')
    def listOne(self, rec_id):
        model_to_get = request.env['business.business']
        rec = model_to_get.browse(rec_id).sudo().ensure_one()
        vals = {
            'id': rec.id,
            'name': rec.name,
            'image': rec.image,
            'email': rec.email,
            'phone_number': rec.phone_number,
            'sales': rec.sales,
            'customers': rec.customers,
            'conversion_rate': rec.conversion_rate,
        }
        data = {'status': 200, 'response': vals, 'message': 'Success'}
        return data

    @http.route('/api/business/findByName', type="json", auth="public", csrf=True, cors='*')
    def findByName(self, **kw):
        data = kw["data"]
        reg_exp = '%' + data['name'] + '%'
        business_rec = request.env['business.business'].sudo().search([('name', '=ilike', reg_exp)])
        businesses = []
        for rec in business_rec:
            vals = {
                'id': rec.id,
                'name': rec.name,
                'image': rec.image,
                'email': rec.email,
                'phone_number': rec.phone_number,
                'sales': rec.sales,
                'customers': rec.customers,
                'conversion_rate': rec.conversion_rate,
            }
            businesses.append(vals)
        return {'status': 200, 'response': businesses, 'message': 'Success'}
    
    @http.route('/api/business/create', type='json', auth='public', csrf=True, cors='*')
    def create(self, **kw):
        data = kw["data"]
        model_to_post = request.env["business.business"]
        record = model_to_post.sudo().create(data)
        return record.id
    
    @http.route('/api/business/update/<int:rec_id>', type='json', auth='public', csrf=True, cors='*')
    def update(self, rec_id, **kw):
        data = kw["data"]
        model_to_put = request.env["business.business"]
        rec = model_to_put.browse(rec_id).sudo().ensure_one()
        record = rec.write(data)
        data = {'status': 200, 'response': record, 'message': 'Success'}
        return data

    @http.route('/api/business/remove/<int:rec_id>', type='json', auth='public', csrf=True, cors='*')
    def delete(self, rec_id):
        model_to_del_rec = request.env["business.business"]
        rec = model_to_del_rec.browse(rec_id).sudo().ensure_one()
        is_deleted = rec.unlink()
        res = {
            "result": is_deleted
        }
        data = {'status': 200, 'response': res, 'message': 'Success'}
        return data

    @http.route('/api/business/removeAll', type='json', auth='public', csrf=True, cors='*')
    def deleteAll(self):
        model_to_del = request.env["business.business"].sudo()
        
        # .with_context(active_test=False) to also find inactive records.
        all_business = model_to_del.with_context(active_test=False).search([])
        is_deleted = all_business.unlink()
        res = {
            "result": is_deleted
        }
        data = {'status': 200, 'response': res, 'message': 'Success'}
        return data