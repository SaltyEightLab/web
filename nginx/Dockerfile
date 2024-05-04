# ベースイメージの指定
FROM nginx:latest

# Nginxの設定ファイルをコンテナにコピー
COPY default.conf /etc/nginx/conf.d/default.conf

# Nginxをフォアグラウンドで実行
CMD ["nginx", "-g", "daemon off;"]