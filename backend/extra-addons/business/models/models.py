# -*- coding: utf-8 -*-

from odoo import models, fields, api


class business(models.Model):
    _name = 'business.business'
    _description = 'business.business'

    company = fields.Char()
    name = fields.Char(string="Company Name")
    image = fields.Binary(string="Company Logo")
    email = fields.Char(string="Email")
    phone_number = fields.Char(string="Phone Number")
    sales = fields.Integer(string="Number of Sales")
    customers = fields.Integer(string="Number of Customers")
    conversion_rate = fields.Char(
        string="Conversion Rate",
        compute="_compute_conversion_rate",
        store=True,
    )
    project = fields.One2many("project.project", "companies" ,string="Projects")

    @api.depends('sales', 'customers')
    def _compute_conversion_rate(self):
        for record in self:
            if record.customers > 0:
                record.conversion_rate = str((record.sales / record.customers) * 100) + '%'

class business_proyecto(models.Model):
    _name = 'project.project'
    _inherit = 'project.project'

    companies = fields.Many2one("business.business", string="Company", ondelete="cascade")

class business_tasks(models.Model):
    _name = 'project.task'
    _inherit = 'project.task'
