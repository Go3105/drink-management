# 飲み物投票サイト
**※PCでのフルスクリーン使用を想定**
- 田原・清研究室 (http://www.ohsuga.lab.uec.ac.jp)
  
## 目次
- [概要](#概要)
- [システム構成](#システム構成)
- [使用例](#使用例)

## 概要 
 当研究室では、2週間ごとに1500円分の飲み物を購入する制度があり、購入する飲み物は学生による1日1回の任意投票で決定している。従来はホワイトボードを使用して投票と集計を行っていたが、手間がかかるため、これを効率化するためにWebアプリケーションの開発を行った。

## システム構成
![dripro13](https://github.com/user-attachments/assets/77c2c8ed-a284-47f5-9d3d-2a2d5640602f)

### 技術スタック
- **Next.js** AppRouter
- **Vercel**
- **Auth.js**
- **Node.js**
- **TypeScript**
- **Tailwind CSS**
- **React**
- **ESLint**
- **Prettier**
- **Zod**

## 使用例
**1. システムにログインする**

<div align="left" style="line-height: 0;">
  <img src="https://github.com/user-attachments/assets/9f79e081-4d4e-4906-98f4-f69d49473df1" alt="ログイン画面" width="800" style="vertical-align: middle;"/>
</div>

- 学生は研究室メールアドレスでログイン可能。
- ゲストは以下のメールアドレスとパスワードでログイン可能。
  - **メールアドレス** ：guest@drink.com
  - **パスワード**　　 ：123456
  

**2. 欲しい飲み物を選ぶ**

<div align="left" style="line-height: 0;">
  <img src="https://github.com/user-attachments/assets/5698033a-13e5-4e40-972a-748ed02ff21c" alt="投票画面1" width="1000" style="vertical-align: middle;"/>
</div>

- 飲み物ボタンを押すことで、飲み物を選択することができる。
- 検索することで、表示される飲み物ボタンが絞られる。
  
**3. 選択した飲み物に投票する**

<div align="left" style="line-height: 0;">
  <img src="https://github.com/user-attachments/assets/01e871c5-eb46-47f0-b6a9-572619af86d0" alt="投票画面2" width="1000" style="vertical-align: middle;"/>
</div>

- 投票ボタンを押したら、投票が確定する。
  
**4. 飲み物の再投票や投票取り消しを行う**

<div align="left" style="line-height: 0;">
  <img src="https://github.com/user-attachments/assets/7bb8f71d-630e-45d2-814a-b2895544c224" alt="投票画面2" width="1000" style="vertical-align: middle;"/>
</div>

- 他の飲み物を選択してから、再投票ボタンを押すと、別の飲み物に投票することが可能。
- 投票取り消しボタンを押すと、投票が取り消される。
  
**5. 投票結果を確認する**

<div align="left" style="line-height: 0;">
  <img src="https://github.com/user-attachments/assets/539041e7-ed52-4a62-a633-d10568ada0d1" alt="ログイン画面" width="800" style="vertical-align: middle;"/>
</div>

- 各飲み物が何円分購入されたのか、合計金額がいくらだったのかが計算されて表示される。

  


