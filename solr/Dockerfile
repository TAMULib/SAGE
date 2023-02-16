FROM solr:7.7.2-slim

ARG SOLR_USER="solr"
ARG MAIN_CORE="sage-discovery"
ARG EXTRA_CORES=""

RUN mkdir -p /tmp/properties/ /opt/solr/server/solr/mycores/${MAIN_CORE}/

COPY solr.xml /opt/solr/server/solr/
COPY *.properties /tmp/properties/
COPY core.properties /opt/solr/server/solr/mycores/${MAIN_CORE}/
COPY configsets /opt/solr/server/solr/configsets/

USER root

RUN if [ "$EXTRA_CORES" != "" ] ; then \
      for core in $EXTRA_CORES ; do \
        mkdir -vp /opt/solr/server/solr/mycores/${core}/ || exit 1 ; \
        if [ -f /tmp/properties/${core}.properties ] ; then \
          cp -v /tmp/properties/${core}.properties /opt/solr/server/solr/mycores/${core}/core.properties || exit 1 ; \
        else \
          cp -v /tmp/properties/core.properties /opt/solr/server/solr/mycores/${core}/ || exit 1 ; \
        fi \
      done \
    fi

RUN chown -R $SOLR_USER:$SOLR_USER /opt/solr/server/solr/solr.xml /opt/solr/server/solr/mycores/ /opt/solr/server/solr/configsets/
RUN chmod -R ug+rwX,o-rwX /opt/solr/server/solr/solr.xml /opt/solr/server/solr /opt/solr/server/logs/ /opt/solr/server/solr/configsets/

RUN rm -Rf /tmp/properties/

USER $SOLR_USER
