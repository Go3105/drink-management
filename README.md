# 飲み物投票サイト

田原・清研究室  [[HP]((http://www.ohsuga.lab.uec.ac.jp))]
  
## 目次
- [概要](#概要)
- [使用例](#使用例)
- [全体構成](#全体構成)
  - [ハードウェア](#ハードウェア)
  - [デザイン](#デザイン)
- [機能](#機能)
    - [接触位置センサによる演奏](#接触位置センサによる演奏)
    - [機械学習モデルによるメロディ抽出](#機械学習モデルによるメロディ抽出)
    - [振動子による演奏方法の提示](#振動子による演奏方法の提示)
- [リポジトリの説明](#リポジトリの説明)
  - [ディレクトリ](#ディレクトリ)
  - [プログラムファイル](#プログラムファイル)
        
## 概要 
[NTTドコモの調査](https://www.itmedia.co.jp/news/articles/2307/21/news109.html)によると，近年，就寝前に布団の中でスマートフォンを使用する人は全体の6割超を占めている．この寝る前スマホの悪影響として，ブルーライトによる睡眠の質の低下や近距離使用による眼精疲労が挙げられる．寝る前スマホが習慣になってしまう原因の1つは，布団に入った後に手持ち無沙汰を感じてしまうことである．そこで，目を使わずに就寝前の時間を過ごすことができる製品を考案した．それは，楽器と抱きまくらを融合したアイテムで、ユーザは寝姿勢のまま演奏することができる．目を閉じたまま演奏することを想定しており，演奏方法がわからないときは，鼻歌を入力すると演奏方法を振動で提示してくれる機能がある．被験者3人に使用してもらった結果，抱き心地と演奏のしやすさに関して高い評価が得られた．今後の展望として、本製品が睡眠の質に与える影響を詳細に評価するための実証実験を予定している．

## 使用例
__※画像をクリックするとYoutubeに移動します．__
[![使用例](https://github.com/harukana1435/Musical-Pillow/assets/167507629/3f1606ed-400d-4a34-892a-609d0109a6f2)](https://youtu.be/ACdyF-5a7Co)

## 全体構成
<div align="left" style="line-height: 0;">
  <img src="https://github.com/harukana1435/Musical-Pillow/assets/167507629/7ba6318f-c96a-4891-8905-fd069e4c9d49" alt="全体構成" width="600" style="vertical-align: middle;"/>
</div>

### ハードウェア
楽器まくらの内部には小型コンピュータであるRaspberryPieが入っており，ハードウェアの制御を行っている．上部には，ユーザが演奏する部分である**接触位置センサ**が取り付けられている．演奏した音はスピーカーから出力する．ユーザの顔付近にはマイクが取り付けられており，歌声を入力するときに用いる．歌声を解析した後，接触位置センサの裏側に取り付けられた**振動子**によって演奏方法が提示される．
### デザイン
全長1300mm．  
ユーザの寝姿勢が**横向き**であることを想定している．具体的な姿勢としては，楽器まくらの下部を足で挟み，両手を接触位置センサ上に配置する．外側の素材はリネン，ラタンが使われており，内側にはポリエステル綿が詰められている．ハードウェアから熱が発生するため，**通気性**と**耐熱性**が高い素材を選択した．



## 機能
### 接触位置センサによる演奏
接触位置センサは，可変抵抗器の一種である．押された位置によって抵抗の値が変わり，そのときの電圧を測定することで位置を特定することができる．楽器まくらでは１つの接触位置センサを**1オクターブの楽器**とみなし，押された位置に対応する音階の楽器音をスピーカーから出力している．

<div align="left" style="line-height: 0;">
  <img src="https://github.com/harukana1435/Musical-Pillow/assets/167507629/53df4658-b2a9-4f73-9c97-75f979578f35" alt="接触位置センサによる演奏" width="600" style="vertical-align: middle;"/>
</div>


### 機械学習モデルによるメロディ抽出
歌声からメロディを抽出するために[JDCNet](https://github.com/keums/melodyExtraction_JDC)を用いた．この機械学習モデルは音声から歌声がある部分を検出し，その部分の音の高さを予測することができる．しかし，0.01秒ごとに周波数単位で音の高さを予測しているため，音階のある楽器音として認識できるように，MIDIに変換する処理を行った．
<div align="left" style="line-height: 0;">
  <img src="https://github.com/harukana1435/Musical-Pillow/assets/167507629/eb142bea-1d46-4a51-8ca9-ff2352fff77f" alt="機械学習モデルによるメロディ抽出" width="600" style="vertical-align: middle;"/>
</div>


### 振動子による演奏方法の提示
目を閉じていても演奏ができるように，メロディの演奏方法を振動によって提示する機能がある．1つの接触位置センサは12個の音階を演奏できるため，それに対応して12個の振動子が取り付けられている．生成したMIDIデータを読み取り、各時間の音に対応する振動子を順に振動させる処理を行った．

<div align="left" style="line-height: 0;">
  <img src="https://github.com/harukana1435/Musical-Pillow/assets/167507629/58243504-4033-4a27-abe5-37ddcbe79cf7" alt="振動子による演奏方法の提示" width="600" style="vertical-align: middle;"/>
</div>

## リポジトリの説明
### ディレクトリ
- `jdcnet`:JDCNetのプログラムが格納されている．  
- `record`:録音したユーザの歌声が格納されている．  
### プログラムファイル
- `exemakura.sh`：Raspberry Piを起動したときに実行されるシェルスクリプト。`main.py`を実行する。
- `main.py`：起動時に実行されるプログラム。ユーザの入力に対してどのプログラムを実行するのか制御している。
- `play_snd.py`：ユーザが演奏した音を出力する。
- `snd_sensor.py`：接触位置センサを制御する。
- `play_jdc.py`：JDCNetによって歌声を解析する。
- `vibe_control.py`：MIDIデータを読み取り、各振動子を制御する。
- `vibrator.py`：振動子の作動と停止を行う。
- `audio_record.py`：ユーザの歌声を録音する。
