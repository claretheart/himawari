import * as XLSX from 'xlsx';
import type { SchoolData } from '../data';

// Google スプレッドシート（Webに公開 - CSV形式）のURL
// ※ここにユーザーが発行したURLを入れることで、全ユーザーのPCで同期されます。
export const GOOGLE_SHEETS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSBsqiiPH2EsNExqRbohPsDeEPfDwGd1yP-jgcQUZvH8-9sImeHEm09jZXvFzhiXdCwaX3GllNbt1eF/pub?gid=526753954&single=true&output=csv";

export const fetchAndUpdateData = async (currentData: SchoolData[], url: string): Promise<SchoolData[]> => {
  if (!url) return currentData;
  
  try {
    // キャッシュを回避するためにタイムスタンプを付与
    const cacheBuster = `&t=${new Date().getTime()}`;
    const response = await fetch(url + cacheBuster);
    if (!response.ok) throw new Error('データ取得に失敗しました');
    const csvText = await response.text();
    
    // デバッグ用：取得したデータの内容をコンソールに表示
    console.log("Fetched Data Snippet:", csvText.substring(0, 200));
    
    // XLSXでパース（header: 1 で配列の配列として取得）
    const wb = XLSX.read(csvText, { type: 'string' });
    const wsname = wb.SheetNames[0];
    const ws = wb.Sheets[wsname];
    const rows = XLSX.utils.sheet_to_json(ws, { header: 1 }) as any[][];

    // セクションの開始行を見つける
    const findSectionStart = (label: string) => rows.findIndex(r => r[0] && String(r[0]).includes(label));
    
    const examSectionStart = findSectionStart('受験生夏期講習');
    const overallSectionStart = findSectionStart('夏期講習全体');

    // セクション内の特定ラベルの行を見つける（相対位置ではなくラベル一致で検索）
    const findRowInSection = (startIdx: number, label: string) => {
      if (startIdx === -1) return -1;
      for (let i = startIdx; i < startIdx + 20 && i < rows.length; i++) {
        if (rows[i][0] && String(rows[i][0]).trim() === label) return i;
      }
      return -1;
    };

    const updated = currentData.map(school => {
      let newData = { ...school };

      // 数値変換・反映用ヘルパー
      const parseAndSet = (rowIdx: number, colIdx: number, currentVal: number) => {
        if (rowIdx === -1 || colIdx === -1) return currentVal;
        const val = rows[rowIdx][colIdx];
        const num = Number(val);
        // 空文字や計算エラーを考慮し、有効な数値のみ反映
        return isNaN(num) || val === "" || val === undefined ? currentVal : num;
      };

      // 共通の列インデックスを探す（すべての教室名が揃っている「受験生」行をマスターとする）
      if (examSectionStart === -1) return newData;
      const schoolCol = rows[examSectionStart].findIndex(cell => cell && String(cell).includes(school.name));
      
      if (schoolCol !== -1) {
        // --- 受験生データの抽出 ---
        const examAchievementRow = findRowInSection(examSectionStart, '増コマ');
        const examTargetRow = findRowInSection(examSectionStart, '目標増コマ');
        
        newData.examAchievement = parseAndSet(examAchievementRow, schoolCol, school.examAchievement || 0);
        newData.examTarget = parseAndSet(examTargetRow, schoolCol, school.examTarget || 0);

        // --- 全体データの抽出 ---
        if (overallSectionStart !== -1) {
          // 全体セクション内でも同じ列インデックスを使用してデータを取得
          const overallAchievementRow = findRowInSection(overallSectionStart, '増コマ');
          const overallTargetRow = findRowInSection(overallSectionStart, '目標増コマ');
          
          newData.achievement = parseAndSet(overallAchievementRow, schoolCol, school.achievement);
          newData.target = parseAndSet(overallTargetRow, schoolCol, school.target);
        }
      }

      return newData;
    });


    return updated;
  } catch (err) {
    console.error("Fetch Error:", err);
    return currentData;
  }
};


