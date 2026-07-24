/**
 * 日付をフォーマットする関数
 * YYYY.M.D 形式から YYYY.MM.DD 形式に変換
 */
export function formatDate(dateStr: string): string {
  // YYYY.M.D 形式をパース
  const parts = dateStr.split('.');
  if (parts.length === 3) {
    const year = parts[0];
    const month = parts[1].padStart(2, '0');
    const day = parts[2].padStart(2, '0');
    return `${year}.${month}.${day}`;
  }
  
  // 外部記事の日時は、実行環境に左右されないよう日本時間で表示
  const date = new Date(dateStr);
  const dateParts = new Intl.DateTimeFormat('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(date);
  const year = dateParts.find(part => part.type === 'year')?.value ?? '';
  const month = dateParts.find(part => part.type === 'month')?.value ?? '';
  const day = dateParts.find(part => part.type === 'day')?.value ?? '';
  return `${year}.${month}.${day}`;
}

/**
 * 概要を生成する関数
 * 本文から最初の3行を抽出
 * 「...」はCSSで表示するため、ここでは追加しない
 */
export function generateSummary(body: string): string {
  // コードブロックを除去（```で囲まれた部分）
  let plainText = body.replace(/```[\s\S]*?```/g, '');
  
  // HTMLタグを除去
  plainText = plainText.replace(/<[^>]*>/g, '');
  
  // マークダウン記法を除去
  plainText = plainText
    .replace(/^#{1,6}\s+/gm, '')  // 見出し記号
    .replace(/\*\*(.+?)\*\*/g, '$1')  // 太字
    .replace(/\*(.+?)\*/g, '$1')  // イタリック
    .replace(/~~(.+?)~~/g, '$1')  // 取り消し線
    .replace(/`(.+?)`/g, '$1')  // インラインコード
    .replace(/\[(.+?)\]\(.+?\)/g, '$1')  // リンク
    .replace(/!\[.*?\]\(.+?\)/g, '')  // 画像
    .replace(/^[-*+]\s+/gm, '')  // リスト記号
    .replace(/^\d+\.\s+/gm, '')  // 番号付きリスト
    .replace(/^>\s+/gm, '');  // 引用
  
  // 改行で分割して空行を除去
  const lines = plainText.split('\n').filter(line => line.trim() !== '');
  
  // 最初の3行を取得
  const firstThree = lines.slice(0, 3).join('\n');
  
  return firstThree;
}
