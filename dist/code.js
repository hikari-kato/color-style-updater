"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// 色スタイルの更新を行うメイン関数
figma.showUI(__html__);
function updateColorStyles() {
    return __awaiter(this, void 0, void 0, function* () {
        // すべてのローカルスタイルを取得
        const styles = figma.getLocalPaintStyles();
        // 指定された色スタイルを名前で検索して更新
        for (const style of styles) {
            switch (style.name) {
                case 'M3/sys/light/outline':
                    yield updateStyleFromReference(style, 'M3/ref/neutral/neutral90');
                    break;
                case 'M3/sys/light/surface-variant':
                    yield updateStyleFromReference(style, 'M3/ref/neutral-variant/neutral-variant95');
                    break;
                case 'M3/sys/light/surface-container-highest':
                    yield updateStyleFromReference(style, 'M3/sys/light/surface-variant');
                    break;
                case 'M3/surfaces/light/surface1':
                    yield updateSurfaceStyle(style, 'M3/sys/light/primary', 'M3/sys/light/surface', 0.05);
                    break;
                case 'M3/surfaces/light/surface2':
                    yield updateSurfaceStyle(style, 'M3/sys/light/primary', 'M3/sys/light/surface', 0.08);
                    break;
                case 'M3/surfaces/light/surface3':
                    yield updateSurfaceStyle(style, 'M3/sys/light/primary', 'M3/sys/light/surface', 0.11);
                    break;
                case 'M3/surfaces/light/surface4':
                    yield updateSurfaceStyle(style, 'M3/sys/light/primary', 'M3/sys/light/surface', 0.12);
                    break;
                case 'M3/surfaces/light/surface5':
                    yield updateSurfaceStyle(style, 'M3/sys/light/primary', 'M3/sys/light/surface', 0.14);
                    break;
            }
        }
        figma.notify('色スタイルの更新が完了しました！');
        figma.closePlugin();
    });
}
// 参照スタイルの値で対象スタイルを更新する関数
function updateStyleFromReference(targetStyle, referenceStyleName) {
    return __awaiter(this, void 0, void 0, function* () {
        const referenceStyle = figma.getLocalPaintStyles().find(s => s.name === referenceStyleName);
        if (!referenceStyle) {
            console.error(`参照スタイル ${referenceStyleName} が見つかりません`);
            return;
        }
        const referencePaint = referenceStyle.paints[0];
        targetStyle.paints = [Object.assign({}, referencePaint)];
    });
}
// サーフェススタイルを更新する関数
function updateSurfaceStyle(targetStyle, primaryStyleName, surfaceStyleName, opacity) {
    return __awaiter(this, void 0, void 0, function* () {
        const primaryStyle = figma.getLocalPaintStyles().find(s => s.name === primaryStyleName);
        const surfaceStyle = figma.getLocalPaintStyles().find(s => s.name === surfaceStyleName);
        if (!primaryStyle || !surfaceStyle) {
            console.error('必要なスタイルが見つかりません');
            return;
        }
        const primaryPaint = Object.assign({}, primaryStyle.paints[0]);
        const surfacePaint = Object.assign({}, surfaceStyle.paints[0]);
        if ('opacity' in primaryPaint) {
            primaryPaint.opacity = opacity;
        }
        targetStyle.paints = [primaryPaint, surfacePaint];
    });
}
// プラグインの実行
updateColorStyles();
