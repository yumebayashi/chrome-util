#!/usr/bin/env bash
# release.sh : カレントディレクトリを拡張名.zip にまとめるだけ

set -e
ZIP_NAME="extension.zip"          # 好きなファイル名に
zip -r "$ZIP_NAME" ./src/ -x "*.zip"   # 既存 ZIP があれば除外
echo "Created $ZIP_NAME"