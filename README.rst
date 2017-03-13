datavetenskap.nu
################

Installation
============

.. code-block:: bash

   $ git clone git@github.com:uppsaladatavetare/datavetenskap.nu.git
   $ cd datavetenskap.nu
   $ virtualenv -p /usr/local/bin/python3.6 env
   $ . env/bin/activate
   $ pip install -r requirements.txt

Recompile upon modification:

.. code-block:: bash

    $ make regenerate

Serve locally:

.. code-block:: bash

    $ make serve
