FROM solr:6.6.6-slim

ARG SOLR_USER="solr"
ARG MAIN_CORE="sage-discovery"
ARG EXTRA_CORES=""

RUN precreate-core $MAIN_CORE

COPY config /opt/solr/server/solr/mycores/${MAIN_CORE}/conf

USER root

RUN if [ "$EXTRA_CORES" != "" ] ; then \
      for core in $EXTRA_CORES ; do \
        precreate-core $core && \
        cp -r /opt/solr/server/solr/mycores/${MAIN_CORE}/conf /opt/solr/server/solr/mycores/${core}/ || exit 1 ; \
      done \
    fi

RUN chown -R $SOLR_USER:$SOLR_USER /opt/solr/server/solr/mycores/
RUN chmod -R ugo+w /opt/solr/server/solr /opt/solr/server/logs/

USER $SOLR_USER
