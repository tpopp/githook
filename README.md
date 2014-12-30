githook
=======

Automatically pull and deploy github repos

Include, in config.json's array, objects of the form `{"name": "tpopp/githook", "path": "path/to/local/repo", "make": "make run"}`

The server will listen on port 3420, and when github hooks are triggered, will cd to the path and run the make command after pulling.
