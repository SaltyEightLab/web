# Postgresの公式イメージをベースイメージとして使用
FROM postgres:15

# initdb.dディレクトリ内にSQLスクリプトをコピー
# Postgresイメージは、このディレクトリ内のスクリプトを自動的に実行します
COPY ./initdb /docker-entrypoint-initdb.d

# コンテナの起動プロセスを継続
CMD ["postgres"]
