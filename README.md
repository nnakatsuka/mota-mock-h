# MOTA UIモック プロトタイプ

求職者側（スマホWebアプリ・16画面）と企業側（PC管理画面・19画面）のインタラクティブモックです。

## ローカルで動かす

```bash
npm install
npm run dev
```

ブラウザで `http://localhost:5173/mota-mock/` を開きます。

## GitHub Pagesにデプロイする

### 1. GitHubにリポジトリを作成

リポジトリ名を `mota-mock` にしてください（vite.config.jsのbaseと一致させる必要があります）。

### 2. プッシュ

```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/mota-mock.git
git push -u origin main
```

### 3. GitHub Pages を有効化

1. リポジトリの **Settings** → **Pages**
2. **Source** を **GitHub Actions** に変更
3. 自動でデプロイが始まります

### 4. アクセス

`https://YOUR_USERNAME.github.io/mota-mock/` でアクセスできます。

## リポジトリ名を変える場合

`vite.config.js` の `base` をリポジトリ名に合わせて変更してください：

```js
export default defineConfig({
  plugins: [react()],
  base: '/YOUR_REPO_NAME/',
})
```

## 画面一覧

### 求職者側（16画面）
- SMS認証、基本情報入力、写真/動画、Q&A、AI敬語変換確認、登録完了
- ホーム（スカウトフリック）、スカウト詳細、求人詳細
- AIビデオ面談、面談完了
- スカウト履歴、面接日程調整
- 新着求人一覧、やりとり、マイページ

### 企業側（19画面）
- ログイン、企業情報登録、求人情報登録
- ダッシュボード
- 求職者検索、求職者詳細、スカウト送信、スカウト管理（リスト/カンバン）
- 応募管理、応募者詳細、AI面談結果、選考日程登録、選考結果報告
- メッセージ一覧、チャット画面
- 求人管理、求人編集、設定
- 

