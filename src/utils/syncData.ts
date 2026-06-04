import * as XLSX from 'xlsx';
import type { SchoolData } from '../data';

// Google スプレッドシート（Webに公開 - CSV形式）のURL
// ※ここにユーザーが発行したURLを入れることで、全ユーザーのPCで同期されます。
export const GOOGLE_SHEETS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSBsqiiPH2EsNExqRbohPsDeEPfDwGd1yP-jgcQUZvH8-9sImeHEm09jZXvFzhiXdCwaX3GllNbt1eF/pub?gid=526753954&single=true&output=csv";

export const fetchAndUpdateData = async (currentData: SchoolData[], url: string): Promise<SchoolData[]> => {
  if (!url) return currentData;

  try {
    const cacheBuster = `&t=${new Date().getTime()}`;
    const response = await fetch(url + cacheBuster);
    if (!response.ok) throw new Error('データ取得に失敗しました');
    const csvText = await response.text();

    const wb = XLSX.read(csvText, { type: 'string' });
    const wsname = wb.SheetNames[0];
    const ws = wb.Sheets[wsname];
    const rows = XLSX.utils.sheet_to_json(ws, { header: 1 }) as any[][];

    const findSectionStart = (label: string) => rows.findIndex(r => r[0] && String(r[0]).includes(label));

    const examSectionStart    = findSectionStart('受験生夏期講習');
    const overallSectionStart = findSectionStart('夏期講習全体');

    // セクション内で指定ラベルの行インデックスを返す（endIdx で検索範囲を制限）
    const findRowInSection = (startIdx: number, endIdx: number, label: string) => {
      if (startIdx === -1) return -1;
      for (let i = startIdx; i < endIdx && i < rows.length; i++) {
        if (rows[i][0] && String(rows[i][0]).trim() === label) return i;
      }
      return -1;
    };

    // 受験生セクション: "受験生増コマ"(row6), "受験生目標増コマ"(row8)
    const examEnd = overallSectionStart !== -1 ? overallSectionStart : examSectionStart + 20;
    const examAchievementRowIdx = findRowInSection(examSectionStart, examEnd, '受験生増コマ');
    const examTargetRowIdx      = findRowInSection(examSectionStart, examEnd, '受験生目標増コマ');

    // 全体セクション: "増コマ"(row20), "目標増コマ"(row22)
    const overallEnd = overallSectionStart + 30;
    const overallAchievementRowIdx = findRowInSection(overallSectionStart, overallEnd, '増コマ');
    const overallTargetRowIdx      = findRowInSection(overallSectionStart, overallEnd, '目標増コマ');

    // 学校名で列インデックスを検索（完全一致優先、見つからなければ部分一致）
    const findSchoolCol = (headerRow: any[], name: string): number => {
      const exact = headerRow.findIndex(cell => cell && String(cell).trim() === name);
      if (exact !== -1) return exact;
      return headerRow.findIndex(cell => cell && String(cell).includes(name));
    };

    const updated = currentData.map(school => {
      let newData = { ...school };

      const parseAndSet = (rowIdx: number, colIdx: number, currentVal: number) => {
        if (rowIdx === -1 || colIdx === -1) return currentVal;
        const val = rows[rowIdx][colIdx];
        const num = Number(val);
        return isNaN(num) || val === "" || val === undefined ? currentVal : num;
      };

      if (examSectionStart === -1) return newData;

      // 受験生セクションと全体セクションでそれぞれ独立して列を検索
      const examSchoolCol    = findSchoolCol(rows[examSectionStart], school.name);
      const overallSchoolCol = overallSectionStart !== -1
        ? findSchoolCol(rows[overallSectionStart], school.name)
        : -1;

      if (examSchoolCol !== -1) {
        newData.examAchievement = parseAndSet(examAchievementRowIdx, examSchoolCol, school.examAchievement || 0);
        newData.examTarget      = parseAndSet(examTargetRowIdx,      examSchoolCol, school.examTarget || 0);
      }

      if (overallSchoolCol !== -1) {
        newData.achievement = parseAndSet(overallAchievementRowIdx, overallSchoolCol, school.achievement);
        newData.target      = parseAndSet(overallTargetRowIdx,      overallSchoolCol, school.target);
      }

      return newData;
    });

    return updated;
  } catch (err) {
    console.error("Fetch Error:", err);
    return currentData;
  }
};
