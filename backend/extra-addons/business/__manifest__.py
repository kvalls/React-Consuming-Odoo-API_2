# -*- coding: utf-8 -*-
{
    'sequence': 1,
    'name': "Business",
    'summary': 'Manage projects assigned by other companies, with different roles',
    'author': 'Kris',

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/14.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Project manager',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['base', 'project'],

    # always loaded
    'data': [
        'views/views.xml',
        'views/templates.xml',
        'security/security.xml',
        'security/ir.model.access.csv',
        'reports/business_report.xml',
        'reports/business_report_view.xml',
        'security/business_record_rules.xml',
        'data/project_tags_data.xml',
    ],
    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],

    'application': 'True',
}

