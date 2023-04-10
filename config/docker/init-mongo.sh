export $(grep -v '^#' ./env/mongo.env | xargs -d '\n')

set -e

mongosh -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD <<EOF
use $MONGO_INITDB_DATABASE

db.createUser({
  user: '$ME_CONFIG_BASICAUTH_USERNAME',
  pwd: '$ME_CONFIG_BASICAUTH_PASSWORD',
  roles: [{
    role: 'readWrite',
    db: '$MONGO_INITDB_DATABASE'
  }]
})

db.createUser({
  user: '$MONGO_INITDB_ROOT_USERNAME',
  pwd: '$MONGO_INITDB_ROOT_PASSWORD',
  roles: [{
    role: 'dbOwner',
    db: '$MONGO_INITDB_DATABASE'
  }]
})
EOF