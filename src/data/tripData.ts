// 行程数据类型定义
export interface Trip {
  id: string;
  name: string;
  departure: string;
  startDate: string;
  endDate: string;
  travelers: number;
  budgetPerPerson: number;
  style: string[];
  highlights: string[];
  route: string[];
}

export interface Spot {
  id: string;
  name: string;
  description: string;
  suggestedDuration: string;
  imageUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  tags: string[];
}

export interface Activity {
  time: string;
  title: string;
  spotId?: string;
  description: string;
  type: 'travel' | 'scenic' | 'meal' | 'rest' | 'photo';
  isMustStop?: boolean;
}

export interface Accommodation {
  name: string;
  address: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface DaySchedule {
  id: string;
  day: number;
  date: string;
  title: string;
  subtitle: string;
  routeDescription: string;
  activities: Activity[];
  accommodation: Accommodation;
  coverImage: string;
}

// 图片资源导入
import day1Duku from '@/assets/day1-duku.jpg';
import day2Nalati from '@/assets/day2-nalati.jpg';
import day3Bayinbuluk from '@/assets/day3-bayinbuluk.jpg';
import day4Canyon from '@/assets/day4-canyon.jpg';
import day5Urumqi from '@/assets/day5-urumqi.jpg';
import spotGlacier from '@/assets/spot-glacier.jpg';
import spotNalati from '@/assets/spot-nalati.jpg';
import spotSwanLake from '@/assets/spot-swan-lake.jpg';
import spotKuche from '@/assets/spot-kuche.jpg';
import spotKongzhong from '@/assets/spot-kongzhong.jpg';

// 景点数据
export const spots: Record<string, Spot> = {
  'duku-start': {
    id: 'duku-start',
    name: '独库公路起点',
    description: '独库公路北起独山子，是连接南北疆的公路奇迹。在这里标志着您穿越天山之旅的开始。',
    suggestedDuration: '20分钟',
    imageUrl: day1Duku,
    coordinates: { lat: 44.3277, lng: 84.8871 },
    tags: ['地标', '打卡点'],
  },
  'qiaerma': {
    id: 'qiaerma',
    name: '乔尔玛烈士陵园',
    description: '为纪念修建独库公路而牺牲的168名解放军战士而建。这里铭刻着筑路英雄的不朽功勋。',
    suggestedDuration: '40分钟',
    imageUrl: day1Duku,
    coordinates: { lat: 43.5892, lng: 84.1234 },
    tags: ['纪念地', '历史'],
  },
  'qiaerma-glacier': {
    id: 'qiaerma-glacier',
    name: '乔尔玛冰川',
    description: '独库公路沿线最壮观的冰川之一，终年积雪，在阳光下闪耀着银白色的光芒。可停车拍照，感受大自然的鬼斧神工。',
    suggestedDuration: '30分钟',
    imageUrl: spotGlacier,
    coordinates: { lat: 43.5678, lng: 84.2345 },
    tags: ['冰川', '摄影', '自然奇观'],
  },
  'nalati': {
    id: 'nalati',
    name: '那拉提草原',
    description: '世界四大草原之一的亚高山草甸植物区，被誉为"空中草原"。夏季草原翠绿如毯，野花遍地，牛羊成群。',
    suggestedDuration: '3-4小时',
    imageUrl: spotNalati,
    coordinates: { lat: 43.2567, lng: 84.0123 },
    tags: ['草原', '摄影', '骑马'],
  },
  'kongzhong-caoyuan': {
    id: 'kongzhong-caoyuan',
    name: '空中草原',
    description: '那拉提草原的精华所在，海拔2000米以上的高山草甸。日落时分，金色阳光洒满草原，美不胜收。',
    suggestedDuration: '2-3小时',
    imageUrl: spotKongzhong,
    coordinates: { lat: 43.2890, lng: 84.0456 },
    tags: ['草原', '日落', '摄影'],
  },
  'bayinbuluke': {
    id: 'bayinbuluke',
    name: '巴音布鲁克草原',
    description: '中国第二大草原，天鹅的故乡。九曲十八弯的开都河在这里蜿蜒流淌，日落时可见"九个太阳"的奇景。',
    suggestedDuration: '4-5小时',
    imageUrl: spotSwanLake,
    coordinates: { lat: 42.9876, lng: 84.1567 },
    tags: ['草原', '天鹅湖', '九曲十八弯'],
  },
  'jiuqu-shibaWan': {
    id: 'jiuqu-shibaWan',
    name: '九曲十八弯',
    description: '开都河在巴音布鲁克草原上蜿蜒曲折，形成壮观的九曲十八弯。日落时分，河面倒映出多个太阳，是摄影爱好者的天堂。',
    suggestedDuration: '2-3小时',
    imageUrl: day3Bayinbuluk,
    coordinates: { lat: 42.9654, lng: 84.1789 },
    tags: ['河流', '日落', '摄影圣地'],
  },
  'tianshen-canyon': {
    id: 'tianshen-canyon',
    name: '天山神秘大峡谷',
    description: '又称库车大峡谷，红褐色的山体在阳光下变幻出层次丰富的色彩。峡谷幽深，鬼斧神工。',
    suggestedDuration: '2-3小时',
    imageUrl: day4Canyon,
    coordinates: { lat: 41.7890, lng: 83.2345 },
    tags: ['峡谷', '地质奇观', '摄影'],
  },
  'kuche-wangfu': {
    id: 'kuche-wangfu',
    name: '库车王府',
    description: '清代库车回部亲王府邸，是新疆保存最完整的王府建筑群。了解西域历史文化的绝佳去处。',
    suggestedDuration: '1.5小时',
    imageUrl: spotKuche,
    coordinates: { lat: 41.7178, lng: 82.9627 },
    tags: ['历史', '建筑', '文化'],
  },
};

// 行程基本信息
export const tripInfo: Trip = {
  id: 'xinjiang-5days',
  name: '新疆五日自驾游',
  departure: '独山子',
  startDate: '2025-07-10',
  endDate: '2025-07-14',
  travelers: 2,
  budgetPerPerson: 8000,
  style: ['深度摄影', '家庭出游', '轻松休闲', '挑战极限'],
  highlights: ['独库公路', '那拉提草原', '巴音布鲁克', '九曲十八弯'],
  route: ['独山子', '那拉提', '巴音布鲁克', '库车', '乌鲁木齐'],
};

// 每日行程
export const daySchedules: DaySchedule[] = [
  {
    id: 'day-1',
    day: 1,
    date: '2025-07-10',
    title: '穿越独库公路北段',
    subtitle: '抵达空中草原',
    routeDescription: '独山子 → 乔尔玛 → 那拉提',
    coverImage: day1Duku,
    activities: [
      {
        time: '09:00',
        title: '从独山子出发',
        spotId: 'duku-start',
        description: '进入独库公路，开启天山穿越之旅',
        type: 'travel',
      },
      {
        time: '11:00',
        title: '乔尔玛冰川',
        spotId: 'qiaerma-glacier',
        description: '途经壮观的冰川，可停车拍照（建议停留30分钟）',
        type: 'photo',
        isMustStop: true,
      },
      {
        time: '12:00',
        title: '乔尔玛烈士陵园',
        spotId: 'qiaerma',
        description: '缅怀筑路英雄，了解独库公路的建设历史',
        type: 'scenic',
      },
      {
        time: '13:30',
        title: '午餐',
        description: '路边毡房简餐，体验当地风味',
        type: 'meal',
      },
      {
        time: '16:00',
        title: '抵达那拉提草原',
        spotId: 'nalati',
        description: '办理酒店入住，稍作休整',
        type: 'rest',
      },
      {
        time: '17:00',
        title: '空中草原日落',
        spotId: 'kongzhong-caoyuan',
        description: '游玩空中草原，观赏绝美日落',
        type: 'scenic',
        isMustStop: true,
      },
    ],
    accommodation: {
      name: '那拉提镇云上草原酒店',
      address: '那拉提镇中心区域',
      coordinates: { lat: 43.2567, lng: 84.0123 },
    },
  },
  {
    id: 'day-2',
    day: 2,
    date: '2025-07-11',
    title: '那拉提深度游',
    subtitle: '草原风光尽收眼底',
    routeDescription: '那拉提草原全天游览',
    coverImage: day2Nalati,
    activities: [
      {
        time: '08:00',
        title: '酒店早餐',
        description: '享用酒店自助早餐，补充能量',
        type: 'meal',
      },
      {
        time: '09:30',
        title: '那拉提河谷草原',
        spotId: 'nalati',
        description: '乘坐区间车深入草原腹地，体验牧民生活',
        type: 'scenic',
        isMustStop: true,
      },
      {
        time: '12:00',
        title: '草原午餐',
        description: '品尝正宗哈萨克风味手抓肉',
        type: 'meal',
      },
      {
        time: '14:00',
        title: '骑马体验',
        description: '在草原上策马奔腾，感受游牧民族的豪迈',
        type: 'scenic',
      },
      {
        time: '16:30',
        title: '出发前往巴音布鲁克',
        description: '沿独库公路继续南行',
        type: 'travel',
      },
      {
        time: '18:30',
        title: '抵达巴音布鲁克',
        spotId: 'bayinbuluke',
        description: '入住酒店，准备观赏九曲十八弯日落',
        type: 'rest',
      },
    ],
    accommodation: {
      name: '巴音布鲁克天鹅湖大酒店',
      address: '巴音布鲁克镇天鹅湖路',
      coordinates: { lat: 42.9876, lng: 84.1567 },
    },
  },
  {
    id: 'day-3',
    day: 3,
    date: '2025-07-12',
    title: '九曲十八弯奇景',
    subtitle: '邂逅九个太阳',
    routeDescription: '巴音布鲁克草原 → 九曲十八弯',
    coverImage: day3Bayinbuluk,
    activities: [
      {
        time: '08:30',
        title: '酒店早餐',
        description: '享用早餐后稍作休整',
        type: 'meal',
      },
      {
        time: '10:00',
        title: '天鹅湖景区',
        spotId: 'bayinbuluke',
        description: '观赏优雅的天鹅在湖面嬉戏',
        type: 'scenic',
        isMustStop: true,
      },
      {
        time: '12:30',
        title: '午餐',
        description: '景区餐厅用餐',
        type: 'meal',
      },
      {
        time: '14:00',
        title: '草原骑行',
        description: '租用自行车环湖骑行，亲近自然',
        type: 'scenic',
      },
      {
        time: '17:00',
        title: '九曲十八弯观景台',
        spotId: 'jiuqu-shibaWan',
        description: '提前占据最佳拍摄位置，等待日落奇景',
        type: 'photo',
        isMustStop: true,
      },
      {
        time: '20:30',
        title: '返回酒店',
        description: '日落后返回酒店休息',
        type: 'rest',
      },
    ],
    accommodation: {
      name: '巴音布鲁克天鹅湖大酒店',
      address: '巴音布鲁克镇天鹅湖路',
      coordinates: { lat: 42.9876, lng: 84.1567 },
    },
  },
  {
    id: 'day-4',
    day: 4,
    date: '2025-07-13',
    title: '独库公路南段',
    subtitle: '峡谷风光',
    routeDescription: '巴音布鲁克 → 天山大峡谷 → 库车',
    coverImage: day4Canyon,
    activities: [
      {
        time: '08:00',
        title: '出发前往库车',
        description: '沿独库公路南段继续行驶',
        type: 'travel',
      },
      {
        time: '11:00',
        title: '大小龙池',
        description: '高山湖泊，湖水碧绿如玉',
        type: 'scenic',
      },
      {
        time: '12:30',
        title: '午餐',
        description: '路边简餐',
        type: 'meal',
      },
      {
        time: '14:30',
        title: '天山神秘大峡谷',
        spotId: 'tianshen-canyon',
        description: '探索红色峡谷的神秘之美',
        type: 'scenic',
        isMustStop: true,
      },
      {
        time: '17:30',
        title: '抵达库车',
        description: '入住酒店，游览老城区',
        type: 'rest',
      },
      {
        time: '19:00',
        title: '库车王府',
        spotId: 'kuche-wangfu',
        description: '参观清代王府，品味西域文化',
        type: 'scenic',
      },
    ],
    accommodation: {
      name: '库车饭店',
      address: '库车市天山路',
      coordinates: { lat: 41.7178, lng: 82.9627 },
    },
  },
  {
    id: 'day-5',
    day: 5,
    date: '2025-07-14',
    title: '返程乌鲁木齐',
    subtitle: '圆满归途',
    routeDescription: '库车 → 乌鲁木齐',
    coverImage: day5Urumqi,
    activities: [
      {
        time: '08:00',
        title: '酒店早餐',
        description: '享用早餐后退房',
        type: 'meal',
      },
      {
        time: '09:00',
        title: '出发返程',
        description: '沿G314国道返回乌鲁木齐',
        type: 'travel',
      },
      {
        time: '12:30',
        title: '午餐',
        description: '途中服务区用餐',
        type: 'meal',
      },
      {
        time: '17:00',
        title: '抵达乌鲁木齐',
        description: '结束愉快的新疆自驾之旅',
        type: 'rest',
      },
    ],
    accommodation: {
      name: '乌鲁木齐',
      address: '行程结束',
    },
  },
];

// 获取景点详情
export const getSpotById = (id: string): Spot | undefined => {
  return spots[id];
};

// 获取日程详情
export const getDayScheduleById = (id: string): DaySchedule | undefined => {
  return daySchedules.find(day => day.id === id);
};

// 获取日程详情（通过天数）
export const getDayScheduleByDay = (day: number): DaySchedule | undefined => {
  return daySchedules.find(schedule => schedule.day === day);
};
