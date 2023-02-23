# -*- coding: utf-8 -*-

from odoo import models, fields, api, _


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

class business_project(models.Model):
    _name = 'project.project'
    _inherit = 'project.project'

    @api.model
    def create(self, vals):
        project = super(business_project, self).create(vals)
        task_vals = [{
            'name': 'Analysis',
            'user_id': 1,'create_uid': 1,'write_uid': 1,
            'project_id': project.id,
        }, {
            'name': 'E/R Diagram',
            'user_id': 2,'create_uid': 2,'write_uid': 2,
            'project_id': project.id,
        }, {
            'name': 'Use cases',
            'user_id': 3,'create_uid': 3,'write_uid': 3,
            'project_id': project.id,
        }, {
            'name': 'Mockups',
            'user_id': 4,'create_uid': 4,'write_uid': 4,
            'project_id': project.id,
        }, {
            'name': 'Deployment',
            'user_id': 5,'create_uid': 5,'write_uid': 5,
            'project_id': project.id,
        }, {
            'name': 'User manual',
            'user_id': 6,'create_uid': 6,'write_uid': 6,
            'project_id': project.id,
        }]
        self.env['project.task'].create(task_vals)
        return project

    def _get_default(self):
        ids = self.env["project.task.type"].search([("active", "=", True)])
        return ids
    
    type_ids = fields.Many2many(default=lambda self: self._get_default())

    companies = fields.Many2one("business.business", string="Company", ondelete="cascade")

class business_task(models.Model):
    _name = 'project.task'
    _inherit = 'project.task'
    # _description = "Task"
    # _order = "priority desc, sequence, id desc"
    # _check_company_auto = True    

    # def _get_default_stage_id(self):
    #     """ Gives default stage_id """
    #     project_id = self.env.context.get('default_project_id')
    #     if not project_id:
    #         return False
    #     return self.stage_find(project_id, [('fold', '=', False), ('is_closed', '=', False)])

    # @api.model
    # def _default_company_id(self):
    #     if self._context.get('default_project_id'):
    #         return self.env['project.project'].browse(self._context['default_project_id']).company_id
    #     return self.env.company

    # @api.model
    # def _read_group_stage_ids(self, stages, domain, order):
    #     search_domain = [('id', 'in', stages.ids)]
    #     if 'default_project_id' in self.env.context:
    #         search_domain = ['|', ('project_ids', '=', self.env.context['default_project_id'])] + search_domain

    #     stage_ids = stages._search(search_domain, order=order, access_rights_uid=SUPERUSER_ID)
    #     return stages.browse(stage_ids)

    # active = fields.Boolean(default=True)
    # name = fields.Char(string='Title', tracking=True, required=True, index=True)
    # description = fields.Html(string='Description')
    # priority = fields.Selection([
    #     ('0', 'Normal'),
    #     ('1', 'Important'),
    # ], default='0', index=True, string="Priority")
    # sequence = fields.Integer(string='Sequence', index=True, default=10,
    #     help="Gives the sequence order when displaying a list of tasks.")
    # stage_id = fields.Many2one('project.task.type', string='Stage', compute='_compute_stage_id',
    #     store=True, readonly=False, ondelete='restrict', tracking=True, index=True,
    #     default=_get_default_stage_id, group_expand='_read_group_stage_ids',
    #     domain="[('project_ids', '=', project_id)]", copy=False)
    # tag_ids = fields.Many2many('project.tags', string='Tags')
    kanban_state = fields.Selection([
        ('unassigned', 'Unassigned'),
        ('normal', 'In Progress'),
        ('done', 'Ready'),
        ('blocked', 'Blocked'),
        ('delayed','Delayed')], string='Kanban State',
        copy=False, default='unassigned', required=True) 


class business_task_type(models.Model):
    _name = 'project.task.type'
    _inherit = 'project.task.type'
    # _description = 'Task Stage'
    # _order = 'sequence, id'

    # def _get_default_project_ids(self):
    #     default_project_id = self.env.context.get('default_project_id')
    #     return [default_project_id] if default_project_id else None

    # active = fields.Boolean('Active', default=True)
    # name = fields.Char(string='Stage Name', required=True, translate=True)
    # description = fields.Text(translate=True)
    # sequence = fields.Integer(default=1)
    # project_ids = fields.Many2many('project.project', 'project_task_type_rel', 'type_id', 'project_id', string='Projects',
    #     default=_get_default_project_ids)
    name = fields.Char(string="Name", required=True)
    legend_delayed = fields.Char(
        'Orange Kanban Label', default=lambda s: _('Delayed'), translate=True, required=True,
        help='Override the default value displayed for the delayed state for kanban selection, when the task or issue is in that stage.')
    legend_blocked = fields.Char(
        'Red Kanban Label', default=lambda s: _('Blocked'), translate=True, required=True,
        help='Override the default value displayed for the blocked state for kanban selection, when the task or issue is in that stage.')
    legend_done = fields.Char(
        'Green Kanban Label', default=lambda s: _('Ready'), translate=True, required=True,
        help='Override the default value displayed for the done state for kanban selection, when the task or issue is in that stage.')
    legend_normal = fields.Char(
        'Blue Kanban Label', default=lambda s: _('In Progress'), translate=True, required=True,
        help='Override the default value displayed for the normal state for kanban selection, when the task or issue is in that stage.')
    legend_unassigned = fields.Char(
        'Grey Kanban Label', default=lambda s: _('Unassigned'), translate=True, required=True,
        help='Override the default value displayed for the unassigned state for kanban selection, when the task or issue is in that stage.')

    