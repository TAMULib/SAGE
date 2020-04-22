FROM solr:7.7.2-slim

RUN precreate-core sage-discovery

RUN chmod -R ugo+w /opt/solr/server/solr/
RUN chmod -R ugo+w /opt/solr/server/logs/

COPY config /opt/solr/server/solr/mycores/sage-discovery/conf

USER root

RUN chown -R solr:solr /opt/solr/server/solr/mycores/

USER solr
