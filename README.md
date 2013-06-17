### Google App Engine
# Launch local develompment server:
```bash
dev_appserver.py --clear_datastore .
dev_appserver.py . # there's no --debug param (probably removed)
dev_appserver.py --debug --clear_datastore --blobstore_path=~/gae/blobstore_dir --datastore_path=~/gae/datastore_file .
dev_appserver.py --clear_datastore --blobstore_path=~/gae/blobstore_dir --datastore_path=~/gae/datastore_file .
```

# Launch local develompment server with emailing:
```bash
dev_appserver.py --enable_sendmail .
```

# Deploy to google:
```bash
appcfg.py update .
```

### Compojure
This is an example web application that uses [Ring][1] and
[Compojure][2]. It demonstrates basic routing and embedded resources.

To play around with this example project, you will first need
[Leiningen][3] installed.

Download the project dependencies with:

    lein deps

Now you can start a development web server with:

    lein ring server

Or you can compile the project into a war-file ready for deployment to
a servlet container like [Tomcat][4] or [Jetty][5]:

    lein ring uberwar

[1]: https://github.com/mmcgrana/ring
[2]: https://github.com/weavejester/compojure
[3]: https://github.com/technomancy/leiningen
[4]: http://tomcat.apache.org
[5]: http://jetty.codehaus.org/jetty
