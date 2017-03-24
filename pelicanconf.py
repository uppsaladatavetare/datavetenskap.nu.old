#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = 'Uppsala Datavetare'
SITENAME = 'Datavetenskap.nu'
SITEURL = ''

PLUGINS = ['pelican_edit_url']

PATH = 'content'
STATIC_PATHS = ['images']

TIMEZONE = 'Europe/Stockholm'

DEFAULT_LANG = 'sv_SE'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True
DEFAULT_DATE_FORMAT = '%d %b, %Y'

ARTICLE_URL = 'posts/{date:%Y}/{date:%b}/{date:%d}/{slug}'
ARTICLE_SAVE_AS = 'posts/{date:%Y}/{date:%b}/{date:%d}/{slug}/index.html'
AUTHOR_URL = 'author/{slug}'
AUTHOR_SAVE_AS = 'author/{slug}/index.html'
PAGE_URL = '{slug}'
PAGE_SAVE_AS = '{slug}/index.html'
TAG_URL = 'event/category/{slug}'
TAG_SAVE_AS = 'event/category/{slug}/index.html'
CATEGORY_URL = '_category/{slug}'
CATEGORY_SAVE_AS = '_category/{slug}/index.html'

PAGINATION_PATTERNS = (
    (1, '{name}/', '{name}.html'),
    (2, '{name}/page/{number}/', '{base_name}/page/{number}/index.html'),
)

THEME = 'theme'

EDIT_CONTENT_URL = 'https://github.com/uppsaladatavetare/datavetenskap.nu/blob/master/{file_path}'
