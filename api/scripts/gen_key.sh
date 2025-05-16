ssh-keygen -t rsa -b 2048 -m PEM -f jwtRS256.key
# Don't add passphrase
openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
awk 'NF {sub(/\r/, ""); printf "%s\\n",$0;}'  jwtRS256.key
awk 'NF {sub(/\r/, ""); printf "%s\\n",$0;}'  jwtRS256.key.pub