datavetenskap.nu_
================

Welcome to the repository for Uppsala University's Computer Scientists web page.

What is acting behind this?
===========================

Our website is built with Pelican_ which is a static site generator, written in Python_.

Can I contribute?
-----------------

Yes, anyone is welcome to contribute.

How do I contribute?
--------------------

**Note:** Installation instructions can be found a bit further down

1. Fork this repositry.
2. Clone your fork: ``git clone git@github.com:YOUR_USERNAME/datavetenskap.nu.git``
3. Create a new branch: ``git checkout -b some-improvement``
4. Create a reStructuredText_ file with your own content.
5. Commit the changes. 
6. Push the changes to your fork.
7. Create a pull request and set the target branch to ``origin/master``.
8. Await approval from one of the members of `@uppsaladatavetare/website-managers`_.

Easy!

As soon the managers have reviewed, accepted and merged your content it'll appear on our website.
They can also request some changes, where they fit appropriate, which you would have to fix, if
you want your content to end up on the site.

Installation
============

.. code-block:: bash

   $ git clone git@github.com:uppsaladatavetare/datavetenskap.nu.git
   $ cd datavetenskap.nu
   $ virtualenv -p /usr/local/bin/python3.6 env
   $ . env/bin/activate
   $ pip install -r requirements.txt

Recompile upon modification and serve locally:

.. code-block:: bash

    $ make devserver


.. _Pelican: http://docs.getpelican.com/en/stable/
.. _Python: http://www.python.org/
.. _datavetenskap.nu: http://www.datavetenskap.nu/
.. _reStructuredText: http://docutils.sourceforge.net/rst.html
.. _`@uppsaladatavetare/website-managers`: https://github.com/orgs/uppsaladatavetare/teams/website-managers
