export interface SchoolData {
  id: string;
  name: string;
  region: 'Kyoto' | 'Shiga' | 'Nara';
  target: number;
  achievement: number;
  rate: number;
  stage: number;
  lastRate?: number;
  team?: string;
  area?: string;
  examTarget?: number;
  examAchievement?: number;
  examRate?: number;
  examStage?: number;
}

export const INITIAL_DATA: SchoolData[] = [
  // 京都エリア (24)
  { id: 'kyoto-01', name: '大宮', region: 'Kyoto', target: 705, achievement: 0, rate: 0, stage: 1, team: '木下チーム', area: '木下課長+山崎チーフ+西向日', examTarget: 400, examAchievement: 0, examRate: 0, examStage: 1 },
  { id: 'kyoto-02', name: '帷子ノ辻', region: 'Kyoto', target: 635, achievement: 0, rate: 0, stage: 1, team: '木下チーム', area: '葛本チーフ', examTarget: 418, examAchievement: 0, examRate: 0, examStage: 1 },
  { id: 'kyoto-03', name: '北野', region: 'Kyoto', target: 484, achievement: 0, rate: 0, stage: 1, team: '木下チーム', area: '葛本チーフ', examTarget: 346, examAchievement: 0, examRate: 0, examStage: 1 },
  { id: 'kyoto-04', name: '北山', region: 'Kyoto', target: 370, achievement: 0, rate: 0, stage: 1, team: '木下チーム', area: '木下課長+山崎チーフ+西向日', examTarget: 280, examAchievement: 0, examRate: 0, examStage: 1 },
  { id: 'kyoto-05', name: '西賀茂', region: 'Kyoto', target: 298, achievement: 0, rate: 0, stage: 1, team: '木下チーム', area: '葛本チーフ', examTarget: 236, examAchievement: 0, examRate: 0, examStage: 1 },
  { id: 'kyoto-06', name: '烏丸御池', region: 'Kyoto', target: 633, achievement: 0, rate: 0, stage: 1, team: '木下チーム', area: '木下課長+山崎チーフ+西向日', examTarget: 548, examAchievement: 0, examRate: 0, examStage: 1 },
  { id: 'kyoto-07', name: '桂', region: 'Kyoto', target: 552, achievement: 0, rate: 0, stage: 1, team: '横尾チーム', area: '大下チーフ+洛西', examTarget: 430, examAchievement: 0, examRate: 0, examStage: 1 },
  { id: 'kyoto-08', name: '洛西', region: 'Kyoto', target: 491, achievement: 0, rate: 0, stage: 1, team: '横尾チーム', area: '大下チーフ+洛西', examTarget: 310, examAchievement: 0, examRate: 0, examStage: 1 },
  { id: 'kyoto-09', name: '西京極', region: 'Kyoto', target: 307, achievement: 0, rate: 0, stage: 1, team: '横尾チーム', area: '大下チーフ+洛西', examTarget: 210, examAchievement: 0, examRate: 0, examStage: 1 },
  { id: 'kyoto-10', name: '西院', region: 'Kyoto', target: 604, achievement: 0, rate: 0, stage: 1, team: '横尾チーム', area: '宮下チーフ', examTarget: 470, examAchievement: 0, examRate: 0, examStage: 1 },
  { id: 'kyoto-11', name: '東向日', region: 'Kyoto', target: 895, achievement: 0, rate: 0, stage: 1, team: '木下チーム', area: '葛本チーフ', examTarget: 676, examAchievement: 0, examRate: 0, examStage: 1 },
  { id: 'kyoto-12', name: '西向日', region: 'Kyoto', target: 1013, achievement: 0, rate: 0, stage: 1, team: '木下チーム', area: '木下課長+山崎チーフ+西向日', examTarget: 784, examAchievement: 0, examRate: 0, examStage: 1 },
  { id: 'kyoto-13', name: '長岡天神', region: 'Kyoto', target: 1705, achievement: 0, rate: 0, stage: 1, area: '長岡天神', examTarget: 1119, examAchievement: 0, examRate: 0, examStage: 1 },
  { id: 'kyoto-14', name: '山科', region: 'Kyoto', target: 412, achievement: 0, rate: 0, stage: 1, team: '横尾チーム', area: '大下チーフ+洛西', examTarget: 284, examAchievement: 0, examRate: 0, examStage: 1 },
  { id: 'kyoto-15', name: '墨染', region: 'Kyoto', target: 571, achievement: 0, rate: 0, stage: 1, team: '木下チーム', area: '木下課長+山崎チーフ+西向日', examTarget: 344, examAchievement: 0, examRate: 0, examStage: 1 },
  { id: 'kyoto-16', name: '伏見桃山', region: 'Kyoto', target: 541, achievement: 0, rate: 0, stage: 1, team: '横尾チーム', area: '大下チーフ+洛西', examTarget: 384, examAchievement: 0, examRate: 0, examStage: 1 },
  { id: 'kyoto-17', name: '醍醐', region: 'Kyoto', target: 356, achievement: 0, rate: 0, stage: 1, team: '横尾チーム', area: '宮下チーフ', examTarget: 246, examAchievement: 0, examRate: 0, examStage: 1 },
  { id: 'kyoto-18', name: '淀', region: 'Kyoto', target: 732, achievement: 0, rate: 0, stage: 1, team: '稲野チーム', area: '木村チーフ', examTarget: 490, examAchievement: 0, examRate: 0, examStage: 1 },
  { id: 'kyoto-19', name: '小倉', region: 'Kyoto', target: 612, achievement: 0, rate: 0, stage: 1, team: '横尾チーム', area: '宮下チーフ', examTarget: 392, examAchievement: 0, examRate: 0, examStage: 1 },
  { id: 'kyoto-20', name: '大久保', region: 'Kyoto', target: 872, achievement: 0, rate: 0, stage: 1, team: '稲野チーム', area: '坂田チーフ', examTarget: 727, examAchievement: 0, examRate: 0, examStage: 1 },
  { id: 'kyoto-21', name: '松井山手', region: 'Kyoto', target: 533, achievement: 0, rate: 0, stage: 1, team: '横尾チーム', area: '宮下チーフ', examTarget: 372, examAchievement: 0, examRate: 0, examStage: 1 },
  { id: 'kyoto-22', name: '祝園', region: 'Kyoto', target: 550, achievement: 0, rate: 0, stage: 1, team: '稲野チーム', area: '坂田チーフ', examTarget: 326, examAchievement: 0, examRate: 0, examStage: 1 },
  { id: 'kyoto-23', name: '久我', region: 'Kyoto', target: 660, achievement: 0, rate: 0, stage: 1, team: '木下チーム', area: '葛本チーフ', examTarget: 480, examAchievement: 0, examRate: 0, examStage: 1 },
  { id: 'kyoto-24', name: '洛南', region: 'Kyoto', target: 585, achievement: 0, rate: 0, stage: 1, team: '稲野チーム', area: '坂田チーフ', examTarget: 326, examAchievement: 0, examRate: 0, examStage: 1 },

  // 滋賀エリア (10)
  { id: 'shiga-01', name: '南草津', region: 'Shiga', target: 211, achievement: 0, rate: 0, stage: 1, team: '柴田チーム', area: '原口チーフ', examTarget: 188, examAchievement: 0, examRate: 0, examStage: 1 },
  { id: 'shiga-02', name: '甲西', region: 'Shiga', target: 1032, achievement: 0, rate: 0, stage: 1, team: '柴田チーム', area: '松浦チーフ', examTarget: 829, examAchievement: 0, examRate: 0, examStage: 1 },
  { id: 'shiga-03', name: '貴生川', region: 'Shiga', target: 784, achievement: 0, rate: 0, stage: 1, team: '奥田チーム', area: '三輪エリアマネージャー', examTarget: 646, examAchievement: 0, examRate: 0, examStage: 1 },
  { id: 'shiga-04', name: '守山', region: 'Shiga', target: 445, achievement: 0, rate: 0, stage: 1, team: '柴田チーム', area: '原口チーフ', examTarget: 294, examAchievement: 0, examRate: 0, examStage: 1 },
  { id: 'shiga-05', name: '近江八幡', region: 'Shiga', target: 497, achievement: 0, rate: 0, stage: 1, team: '奥田チーム', area: '三輪エリアマネージャー', examTarget: 336, examAchievement: 0, examRate: 0, examStage: 1 },
  { id: 'shiga-06', name: '八日市', region: 'Shiga', target: 1010, achievement: 0, rate: 0, stage: 1, team: '奥田チーム', area: '三輪エリアマネージャー', examTarget: 740, examAchievement: 0, examRate: 0, examStage: 1 },
  { id: 'shiga-07', name: '稲枝', region: 'Shiga', target: 532, achievement: 0, rate: 0, stage: 1, team: '奥田チーム', area: '三輪エリアマネージャー', examTarget: 356, examAchievement: 0, examRate: 0, examStage: 1 },
  { id: 'shiga-08', name: '南彦根', region: 'Shiga', target: 430, achievement: 0, rate: 0, stage: 1, team: '柴田チーム', area: '松浦チーフ', examTarget: 316, examAchievement: 0, examRate: 0, examStage: 1 },
  { id: 'shiga-09', name: '米原', region: 'Shiga', target: 577, achievement: 0, rate: 0, stage: 1, team: '奥田チーム', area: '三輪エリアマネージャー', examTarget: 384, examAchievement: 0, examRate: 0, examStage: 1 },
  { id: 'shiga-10', name: '長浜', region: 'Shiga', target: 759, achievement: 0, rate: 0, stage: 1, team: '柴田チーム', area: '原口チーフ', examTarget: 634, examAchievement: 0, examRate: 0, examStage: 1 },

  // 奈良エリア (6)
  { id: 'nara-01', name: '高の原', region: 'Nara', target: 338, achievement: 0, rate: 0, stage: 1, team: '稲野チーム', area: '木村チーフ', examTarget: 200, examAchievement: 0, examRate: 0, examStage: 1 },
  { id: 'nara-02', name: '西大寺', region: 'Nara', target: 325, achievement: 0, rate: 0, stage: 1, team: '稲野チーム', area: '坂田チーフ', examTarget: 264, examAchievement: 0, examRate: 0, examStage: 1 },
  { id: 'nara-03', name: '学園前', region: 'Nara', target: 661, achievement: 0, rate: 0, stage: 1, team: '稲野チーム', area: '木村チーフ', examTarget: 484, examAchievement: 0, examRate: 0, examStage: 1 },
  { id: 'nara-04', name: '富雄', region: 'Nara', target: 1116, achievement: 0, rate: 0, stage: 1, team: '稲野チーム', area: '木村チーフ', examTarget: 866, examAchievement: 0, examRate: 0, examStage: 1 },
  { id: 'nara-05', name: '登美ヶ丘', region: 'Nara', target: 385, achievement: 0, rate: 0, stage: 1, team: '稲野チーム', area: '坂田チーフ', examTarget: 230, examAchievement: 0, examRate: 0, examStage: 1 },
  { id: 'nara-06', name: '南生駒', region: 'Nara', target: 2187, achievement: 0, rate: 0, stage: 1, area: '南生駒', examTarget: 1580, examAchievement: 0, examRate: 0, examStage: 1 },
];

export const calculateStage = (rate: number): number => {
  if (rate >= 100) return 20;
  if (rate <= 0) return 1; 
  // 100%未満は最大でもステージ19（満開目前）までに抑える
  const stage = Math.floor(rate / 5) + 1;
  return Math.min(stage, 19);
};

