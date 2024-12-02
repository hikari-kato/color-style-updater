// 色スタイルの更新を行うメイン関数
figma.showUI(__html__);

async function updateColorStyles() {
  // すべてのローカルスタイルを取得
  const styles = figma.getLocalPaintStyles();

  // 指定された色スタイルを名前で検索して更新
  for (const style of styles) {
    switch (style.name) {
      case 'M3/sys/light/outline':
        await updateStyleFromReference(style, 'M3/ref/neutral/neutral90');
        break;
      
      case 'M3/sys/light/surface-variant':
        await updateStyleFromReference(style, 'M3/ref/neutral-variant/neutral-variant95');
        break;
      
      case 'M3/sys/light/surface-container-highest':
        await updateStyleFromReference(style, 'M3/sys/light/surface-variant');
        break;
      
      case 'M3/surfaces/light/surface1':
        await updateSurfaceStyle(style, 'M3/sys/light/primary', 'M3/sys/light/surface', 0.05);
        break;
      
      case 'M3/surfaces/light/surface2':
        await updateSurfaceStyle(style, 'M3/sys/light/primary', 'M3/sys/light/surface', 0.08);
        break;
      
      case 'M3/surfaces/light/surface3':
        await updateSurfaceStyle(style, 'M3/sys/light/primary', 'M3/sys/light/surface', 0.11);
        break;
      
      case 'M3/surfaces/light/surface4':
        await updateSurfaceStyle(style, 'M3/sys/light/primary', 'M3/sys/light/surface', 0.12);
        break;
      
      case 'M3/surfaces/light/surface5':
        await updateSurfaceStyle(style, 'M3/sys/light/primary', 'M3/sys/light/surface', 0.14);
        break;
    }
  }
  
  figma.notify('色スタイルの更新が完了しました！');
  figma.closePlugin();
}

// 参照スタイルの値で対象スタイルを更新する関数
async function updateStyleFromReference(targetStyle: PaintStyle, referenceStyleName: string) {
  const referenceStyle = figma.getLocalPaintStyles().find(s => s.name === referenceStyleName);
  
  if (!referenceStyle) {
    console.error(`参照スタイル ${referenceStyleName} が見つかりません`);
    return;
  }

  const referencePaint = referenceStyle.paints[0];
  targetStyle.paints = [{ ...referencePaint }];
}

// サーフェススタイルを更新する関数
async function updateSurfaceStyle(
  targetStyle: PaintStyle,
  primaryStyleName: string,
  surfaceStyleName: string,
  opacity: number
) {
  const primaryStyle = figma.getLocalPaintStyles().find(s => s.name === primaryStyleName);
  const surfaceStyle = figma.getLocalPaintStyles().find(s => s.name === surfaceStyleName);
  
  if (!primaryStyle || !surfaceStyle) {
    console.error('必要なスタイルが見つかりません');
    return;
  }

  const primaryPaint = { ...primaryStyle.paints[0] };
  const surfacePaint = { ...surfaceStyle.paints[0] };
  
  if ('opacity' in primaryPaint) {
    primaryPaint.opacity = opacity;
  }

  targetStyle.paints = [primaryPaint, surfacePaint];
}

// プラグインの実行
updateColorStyles();