web: java $JAVA_OPTS -Xmx256m -jar target/*.jar --spring.profiles.active=prod,heroku -Djdk.tls.client.protocols=TLSv1.2 --spring.data.mongodb.database=$(echo "$MONGODB_URI" | sed "s/^.*:[0-9]*\///g")
