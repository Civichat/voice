# ボイス

Voiceは、分散型民主主義ガバナンスのためのアプリです。RadicalxChangeによって開発され、Quadratic Funding, pol.is, Quadratic Votingを活用した分散型民主主義のための新しい民主的プロセスのモデル化と実験を行っています。

## ローカルセットアップ - Docker

Dockerを使用する方法は、開発者でない人や次のような人にお勧めします。
すぐにプロジェクトを稼働させることができます。また、Dockerメソッドは
docker-compose-prod.ymlを使用し、スピンアップすることができます。
プロダクションコンテナ

- Dockerのインストール

- docker-composeのインストール（MacとWindowsのDocker Desktopに含まれています）。

- プロジェクトのクローン

```
git clone --config core.autocrlf=input https://github.com/tkgshn/voice.git
cd voice
git checkout master
```

- .envファイルを作成し、適切な環境変数を記入します。

```
cp .env-example .env
```

- rxc-voice/src/utils/urls.ts` で urls を設定します -- 本番用の urls はコメントアウトし、ローカル用の urls はアンコメントします。

- イメージをビルドし、コンテナを立ち上げます（最初にDockerが起動していることを確認してください）。
```
# コンテナの構築と立ち上げ
docker-compose -f docker-compose-voice.yml up --build
```

または

```
# コンテナを構築する
docker-compose -f docker-compose-voice.yml build
# その後、コンテナを立ち上げる
docker-compose -f docker-compose-voice.yml up
```

- 管理サイトにアクセスするためのスーパーユーザーを作成します。

```
docker exec -it voice-api-1 ./manage.py createsuperuser


これでプロジェクトは稼働しました -。

バックエンドAPI - http://127.0.0.1:8000

RxC Voice - http://localhost:4000
```

## デプロイ手順 - 仮想環境

仮想環境方式は、セットアップに少し余分な手順がかかりますが、軽量で高速な開発に最適です。プロジェクトに自明でない時間を費やしている開発者にお勧めします。

- PostgreSQL](https://www.postgresql.org/download/)をインストールし、動作することを確認します。

- このガイド](https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/#creating-a-virtual-environment)を参考に、pipとvenvをインストールしてください。

- RxC Voice のバックエンドの Python パッケージを格納するための仮想環境を作成する。
```
python3 -m venv ./venv/voice-backend
```

- プロジェクトのクローン
```
git clone https://github.com/tkgshn/voice.git
cd rxc-voice
git checkout master
```

- .envファイルを作成し、適切な環境変数を設定します。
```
cp .env-example .env
```

- rxc-voice/src/utils/urls.ts` で urls を設定します -- 本番用の urls はコメントアウトし、ローカル用の urls はアンコメントしてください。

- 仮想環境を有効にする
```
ソース ./venv/rxc-voice-backend/bin/activate
```

- 仮想環境に必要なpythonパッケージをインストールします。
```
cd backend/RxcVoiceApi
python3 -m pip install -r requirements.txt を実行します。
```

- データベースのマイグレーションを行う
```
python manage.py makemigrations メイン
```

- マイグレーションを適用する
```
python manage.py migrate
```

- 管理サイトにアクセスするためのスーパーユーザーを作成する

```
python manage.py createsuperuser
```

- バックエンドサーバを起動します。
```
python manage.py runserver
```

- 新しいターミナルウィンドウを開き、必要なフロントエンドパッケージをインストールします (venvは有効になっていないはずです)
```
cd rxc-voice/rxc-voice
npmインストール
```

- フロントエンドサーバを起動します。
```
npm スタート
```

これでプロジェクトは起動しました -。

バックエンドAPI - http://127.0.0.1:8000

RxCボイス - http://localhost:4000

## ユーザーの作成とテスト用サイトへのアクセス

- 管理者用サイト（http://127.0.0.1:8000/admin）にログインします。

- RxC Voice」という名前のグループを作成します。RxC Voice用に作成するすべてのオブジェクトは、このグループに追加する必要があります。

- ユーザーを作成します。ログインUIは`username`を使用しますが、`email`というラベルがあります。混乱を避けるために、"Email address "フィールドと "Username "フィールドの両方に同じメールアドレスを使用する必要があります。ステップ3で作成した "RxC Voice "グループに、このユーザーを追加します。

- 次に、作成したユーザのDelegateを作成します（Delegateクラスは、Userクラスの拡張/ラッパーです）。メールサービスを設定していない場合は、「Is verified」をチェックして、「Public username」フィールドに何かを入力すれば、ユーザー認証プロセスを回避することができます。

- これで、テストユーザーのメールアドレスとパスワードでサイトにログインできるはずです。

## Contribute

質問、コメント、トラブルシューティングについては、このレポにissueを作成してください。現在、私たちのチームにはフルタイムの開発者が一人しかいませんので、コミュニティからのどんな貢献も大いに歓迎します

## トラブルシューティング

### データベース「DATABASE_NAME」が存在しない。

Dockerコンテナを構築しているときに、voice-api-1がこのようにスローした場合
というエラーが出た場合、すでに別の名前のデータベースが初期化されている可能性があります。

- rxc-voice_db_1 に接続し、シェルを開いてください。

docker exec -it voice-db1 bash`を実行します。

- psqlシェルを開き、データベースをリストアップします。

`psql -U POSTGRES_USER
ポストグレス-# \l`

- 正しいデータベース名をコピーし、.envファイルのPOSTGRES_DBの値を更新してください。
