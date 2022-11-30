# Photoshopスクリプト Add Wip Ps

- Work in progress [ WIP ] の文字挿入を手軽に
- お手元のフォントをランダムに選択し描画
- ランダムに選択したフォントで３つの候補を描画
- 作品サイズは問いません
- ルーラーの単位、% では作動しません
- 特殊なカラーモード（モノクロ２階調、インデックスカラー、マルチチャンネル）では作動しません
- 作業中と思われる不明なレイヤー、グループ、またはアートボードがある場合は作動しません
- ファイルの保存や書き出しはしません

### *大切な制作データには直接作動させず、png、jpegなどの統合画像へのご利用をおすすめします。*

---

![gh-1](https://user-images.githubusercontent.com/77219005/204752653-b7a12aeb-f7bc-434c-bce1-7c1022f324c5.png)
![gh-2-3](https://user-images.githubusercontent.com/77219005/204752707-87d61f5f-5cde-4f16-95fd-d114777af494.png)
![gh-4](https://user-images.githubusercontent.com/77219005/204752742-48941c23-11a8-45bf-8207-43d309a523b2.png)


---

動作確認：Photoshop 2023, CC2019, CS3　全てmacOS用

---

## 解決済みの不具合 2022-11-30現在

### アートボードが存在する場合にエラーになる
- 解決：作業中と思われる不明なレイヤー、グループ、またはアートボードがある場合にはアラートで告知、作動しないようにしました。書き出し統合画像などレイヤーが１つのみ（背景のみ）のファイルで作動します。

### CC2019では挙動が不安定　レイヤーパネル、描画した文字が見えない等
- 解決：任意の繰り返しは中止し３つの候補を出力して終了するようにしました。終了するまではレイヤーが表示されない場合もあります。

### CS3では認識されない関数が使われておりエラーになる
- 解決：CC未満では未対応の関数は無効にして作動するようにしました。

---

Type: Photoshop Script  
Name: Add Wip Ps  
File Name: add-wip-ps.jsx  
Version: 1.0  
Release: 2022-11-27

## How to use

Script for Adobe Photoshop.

File > Script > reference (Other Script)


## License

Copyright (C) 2022 Katsushi Nakamura

This program is free software; you can redistribute it and/or modifyit under the terms of the GNU General Public License as published bythe Free Software Foundation; either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty ofMERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public Licensealong with this program. If not, see <https://www.gnu.org/licenses/>.
