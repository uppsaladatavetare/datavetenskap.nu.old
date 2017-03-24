datavetenskap.nu_
################

Welcome to the repository for Uppsala University's Computer Scientists web page.

How do I contribute?
====================

**Note:** Installation instructions can be found a bit further down

1. Fork this repositry.
2. Clone your fork: ``git clone git@github.com:YOUR_USERNAME/datavetenskap.nu.git``
3. Create a new branch: ``git checkout -b some-improvement``
4. Create a reStructuredText_ file with your own content:
    - Blog posts at ``content/blog/YEAR/MONTH/DAY-SLUG.rst``
    - Articles at ``content/article/SLUG.rst``
5. Commit the changes. 
6. Push the changes to your fork.
7. Create a pull request and set the target branch to ``origin/master``.
8. Await approval from one of the members of `@uppsaladatavetare/website-managers`_.

Easy!

As soon the managers have reviewed, accepted and merged your contribution it'll
appear on our website. They can also request some changes, where they fit
appropriate, which you would have to fix, if you want your content to end up on
the site.

Installation
============

.. code-block:: bash

    $ git clone git@github.com:uppsaladatavetare/datavetenskap.nu.git
    $ cd datavetenskap.nu
    $ virtualenv env
    $ . env/bin/activate
    $ pip install -r requirements.txt

Recompile upon modification and serve locally:

.. code-block:: bash

    $ make devserver

The site should be available at http://localhost:8000.

Why not just use WordPress?
===========================

WordPress is a cool piece of software, but is a bit of an overkill for our
simple site that is basically static. What we do here instead is to store all
the content in form of text files (in reStructuredText_) and transform them
into a static webpage using Pelican_. The main advantage of this approach is
that we now get a site that anyone can contribute to in a controllable manner
(contributions are done using pull requests that need to be merged by us). 


.. _Pelican: http://docs.getpelican.com/en/stable/
.. _Python: http://www.python.org/
.. _datavetenskap.nu: http://www.datavetenskap.nu/
.. _reStructuredText: http://docutils.sourceforge.net/rst.html
.. _`@uppsaladatavetare/website-managers`: https://github.com/orgs/uppsaladatavetare/teams/website-managers
