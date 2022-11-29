/*
Type: Photoshop Script
Name: Add Wip Ps
File Name: add-wip-ps.jsx
Version: 1.0.0

Copyright (C) 2022 Katsushi Nakamura

This program is free software; you can redistribute it and/or modifyit under the terms of the GNU General Public License as published bythe Free Software Foundation; either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty ofMERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public Licensealong with this program. If not, see <https://www.gnu.org/licenses/>.
*/

(function () {
  if (documents.length > 0) {
    try {
      app.activeDocument.suspendHistory("ADD-WIP-PS", "addWipPs()");
    } catch (error) {
      alert("ERROR");
    }
  } else {
    alert("Open the document. Please try again.");
  }
})();

function addWipPs() {
  //　初期設定 -----
  //　透明度　塗りの透明度
  var transparency = 50;
  // フォント候補数
  var typefacesNum = 3;
  // --------------

  // ドキュメントの横幅と縦幅を求める
  var sampleDocument = app.activeDocument;
  var docWidth = sampleDocument.width.as("px");
  var docHeight = sampleDocument.height.as("px");

  // ドキュメントの解像度を求める
  var docResolution = sampleDocument.resolution;
  // カラーモード
  var docMode = sampleDocument.mode.toString();
  // レイヤーセット数
  var docLayersetsNum = sampleDocument.layerSets.length;
  // レイヤー数
  var docLayersNum = sampleDocument.layers.length;
  // レイヤー数判定
  var kindNum = 0;
  for (var i = 0; i < sampleDocument.layers.length; i++) {
    if (sampleDocument.layers[i].kind !== LayerKind.TEXT) {
      kindNum = ++kindNum;
      docLayersNum = kindNum;
      if (docLayersNum >= 2) {
        break;
      }
    } else if (sampleDocument.layers[i].name !== "ADD-WIP-PS") {
      docLayersNum = 2;
      break;
    } else {
      docLayersNum = 0;
    }
  }

  // 単位チェック用
  var unitCheck = sampleDocument.height.toString();
  var rulerCheck = unitCheck.match(/%/i);

  // カラーモード レイヤーセット数 レイヤー数 ルーラー単位チェック
  if (docMode === "DocumentMode.BITMAP") {
    alert("Unsupported color mode");
  } else if (docMode === "DocumentMode.INDEXEDCOLOR") {
    alert("Unsupported color mode");
  } else if (docMode === "DocumentMode.MULTICHANNEL") {
    alert("Unsupported color mode");
  } else if (docLayersetsNum >= 1) {
    alert("Artboards and groups are not supported");
  } else if (docLayersNum > 1) {
    alert("Has an unknown working layer");
  } else if (rulerCheck) {
    alert('Unsupported ruler "%"');
  } else {
    // CC以上を対象にする
    var psVer = app.version;
    var psVerName = psVer.split(".");
    if (parseInt(psVerName[0]) >= 14) {
      // フォントリストを更新
      app.refreshFonts();
    }

    // 繰り返し判定用
    var repeatFlag = 0;

    // フォント描画
    do {
      // 一番上のレイヤーをアクティブにする
      sampleDocument.activeLayer = sampleDocument.layers[0];

      // フォント候補を非表示にする
      if ("ADD-WIP-PS" === sampleDocument.layers[0].name) {
        sampleDocument.layers["ADD-WIP-PS"].visible = false;
      }

      // 新規にテキストレイヤーを追加
      var textLayerObj = sampleDocument.artLayers.add();
      textLayerObj.kind = LayerKind.TEXT;

      // WIPを配置
      sampleDocument.layers[0].textItem.contents = "WIP";

      // レイヤー名を変更
      sampleDocument.layers[0].name = "ADD-WIP-PS";

      // フォント一覧よりランダムに選ぶ
      var fontList = app.fonts;
      var n = fontList.length;

      do {
        r = Math.floor(Math.random() * n);
        var writeFont = fontList[r].postScriptName;

        // font指定
        sampleDocument.activeLayer.textItem.font = writeFont;
        // フォント固有の問題の対処
        var afterFont = sampleDocument.activeLayer.textItem.font;
      } while (writeFont !== afterFont);

      // 中央揃え
      sampleDocument.activeLayer.textItem.justification = Justification.CENTER;

      // 文字カラーをフォアグラウンドカラーに変更する
      var foregroundcolor = new SolidColor();
      foregroundcolor.rgb.red = app.foregroundColor.rgb.red;
      foregroundcolor.rgb.green = app.foregroundColor.rgb.green;
      foregroundcolor.rgb.blue = app.foregroundColor.rgb.blue;
      sampleDocument.activeLayer.textItem.color = foregroundcolor;

      // 塗りの不透明度を変更する
      sampleDocument.activeLayer.fillOpacity = transparency;

      // 縦横と解像度から文字サイズを調整
      if (docWidth <= docHeight) {
        var writeFontSize = docWidth / ((docResolution / 72) * 2.4);
      } else {
        var writeFontSize = docHeight / ((docResolution / 72) * 2.4);
      }

      // 文字サイズを設定する
      sampleDocument.activeLayer.textItem.size = UnitValue(
        writeFontSize + "pt"
      );

      // 文字を中央に移動する
      var textLayer = sampleDocument.layers[0];
      var layerPointLeft = textLayer.bounds[0].as("px"); // 左座標。単位付き
      var layerPointTop = textLayer.bounds[1].as("px"); // 上座標。単位付き
      var layerPointRight = textLayer.bounds[2].as("px"); // 右座標。単位付き
      var layerPointBottom = textLayer.bounds[3].as("px"); // 下座標。単位付き

      // 座標取得
      var movePointLeft = docWidth / 2 - (layerPointRight - layerPointLeft) / 2;
      var movePointTop = docHeight / 2 - (layerPointBottom - layerPointTop) / 2;
      var x = movePointLeft + "px";
      var y = movePointTop + "px";
      var cx = textLayer.bounds[0];
      var cy = textLayer.bounds[1];

      // 原点に移動
      textLayer.translate(-cx, -cy);

      // 中央に移動
      textLayer.translate(UnitValue(x), UnitValue(y));

      // 繰り返し判定
      var repeatFlag = ++repeatFlag;
    } while (repeatFlag < typefacesNum);

    alert("Success");
  }
}
