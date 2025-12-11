
export type Language = 'en' | 'zh';

export type AppView = 'dashboard' | 'game' | 'settings' | 'model-config';

export type GameMode = 'custom' | 'adventure';

export type AIProvider = 'openai' | 'google' | 'deepseek' | 'ollama' | 'other';

export interface AIConfig {
    id: string;
    name: string;
    provider: AIProvider;
    apiKey: string;
    baseUrl?: string;
    modelName: string;
}

export interface Card {
    id: string;
    content: string;
    type: 'text' | 'emoji';
    pairId: string;
    isFlipped: boolean;
    isMatched: boolean;
    color: string;
}

export interface GameStats {
    gamesPlayed: number;
    totalWins: number;
    bestScore: number;
    totalMoves: number;
    adventureLevel: number; // Max level unlocked
}

export interface AIPair {
    word: string;
    emoji: string;
}

export interface StaticLevelData {
    level: number;
    topicEn: string;
    topicZh: string;
    pairsCount: number;
    content: { wordEn: string; wordZh: string; emoji: string }[];
}

export interface GameConfig {
    mode: GameMode;
    // Session specific settings
    sessionTopic?: string;
    sessionPairCount: number;
    // Adventure state
    currentLevel: number;
    // Global settings
    language: Language;
    activeModelConfigId: string;
}

export const STATIC_LEVELS: StaticLevelData[] = [
    {
        level: 1, topicEn: "Fruit Basket", topicZh: "水果篮子", pairsCount: 4,
        content: [
            { wordEn: "Apple", wordZh: "苹果", emoji: "🍎" },
            { wordEn: "Banana", wordZh: "香蕉", emoji: "🍌" },
            { wordEn: "Grape", wordZh: "葡萄", emoji: "🍇" },
            { wordEn: "Watermelon", wordZh: "西瓜", emoji: "🍉" }
        ]
    },
    {
        level: 2, topicEn: "Cute Animals", topicZh: "可爱的动物", pairsCount: 6,
        content: [
            { wordEn: "Dog", wordZh: "小狗", emoji: "🐶" },
            { wordEn: "Cat", wordZh: "小猫", emoji: "🐱" },
            { wordEn: "Pig", wordZh: "小猪", emoji: "🐷" },
            { wordEn: "Monkey", wordZh: "猴子", emoji: "🐵" },
            { wordEn: "Rabbit", wordZh: "兔子", emoji: "🐰" },
            { wordEn: "Panda", wordZh: "熊猫", emoji: "🐼" }
        ]
    },
    {
        level: 3, topicEn: "Weather", topicZh: "天气变化", pairsCount: 8,
        content: [
            { wordEn: "Sun", wordZh: "太阳", emoji: "☀️" },
            { wordEn: "Rain", wordZh: "下雨", emoji: "🌧️" },
            { wordEn: "Snow", wordZh: "下雪", emoji: "❄️" },
            { wordEn: "Lightning", wordZh: "闪电", emoji: "⚡" },
            { wordEn: "Cloud", wordZh: "云朵", emoji: "☁️" },
            { wordEn: "Rainbow", wordZh: "彩虹", emoji: "🌈" },
            { wordEn: "Wind", wordZh: "微风", emoji: "💨" },
            { wordEn: "Umbrella", wordZh: "雨伞", emoji: "☂️" }
        ]
    },
    {
        level: 4, topicEn: "Sports", topicZh: "体育运动", pairsCount: 8,
        content: [
            { wordEn: "Soccer", wordZh: "足球", emoji: "⚽" },
            { wordEn: "Basketball", wordZh: "篮球", emoji: "🏀" },
            { wordEn: "Tennis", wordZh: "网球", emoji: "🎾" },
            { wordEn: "Swimming", wordZh: "游泳", emoji: "🏊" },
            { wordEn: "Cycling", wordZh: "骑行", emoji: "🚴" },
            { wordEn: "Running", wordZh: "跑步", emoji: "🏃" },
            { wordEn: "Medal", wordZh: "奖牌", emoji: "🥇" },
            { wordEn: "Trophy", wordZh: "奖杯", emoji: "🏆" }
        ]
    },
    {
        level: 5, topicEn: "Transportation", topicZh: "交通工具", pairsCount: 10,
        content: [
            { wordEn: "Car", wordZh: "汽车", emoji: "🚗" },
            { wordEn: "Bus", wordZh: "公交车", emoji: "🚌" },
            { wordEn: "Train", wordZh: "火车", emoji: "🚆" },
            { wordEn: "Airplane", wordZh: "飞机", emoji: "✈️" },
            { wordEn: "Ship", wordZh: "轮船", emoji: "🚢" },
            { wordEn: "Rocket", wordZh: "火箭", emoji: "🚀" },
            { wordEn: "Bicycle", wordZh: "自行车", emoji: "🚲" },
            { wordEn: "Police Car", wordZh: "警车", emoji: "🚓" },
            { wordEn: "Ambulance", wordZh: "救护车", emoji: "🚑" },
            { wordEn: "Fire Truck", wordZh: "消防车", emoji: "🚒" }
        ]
    },
    {
        level: 6, topicEn: "Space & Science", topicZh: "太空与科学", pairsCount: 12,
        content: [
            { wordEn: "Alien", wordZh: "外星人", emoji: "👽" },
            { wordEn: "Astronaut", wordZh: "宇航员", emoji: "👨‍🚀" },
            { wordEn: "Planet", wordZh: "行星", emoji: "🪐" },
            { wordEn: "Telescope", wordZh: "望远镜", emoji: "🔭" },
            { wordEn: "Microscope", wordZh: "显微镜", emoji: "🔬" },
            { wordEn: "DNA", wordZh: "DNA", emoji: "🧬" },
            { wordEn: "Atom", wordZh: "原子", emoji: "⚛️" },
            { wordEn: "Robot", wordZh: "机器人", emoji: "🤖" },
            { wordEn: "Satellite", wordZh: "卫星", emoji: "🛰️" },
            { wordEn: "Star", wordZh: "星星", emoji: "⭐" },
            { wordEn: "Meteor", wordZh: "流星", emoji: "☄️" },
            { wordEn: "Earth", wordZh: "地球", emoji: "🌍" }
        ]
    }
];

export const DICTIONARY = {
    en: {
        appTitle: "Emoji Link",
        subtitle: "Semantic Memory",
        dashboard: "Home",
        play: "Start Game",
        settings: "Settings",
        stats: "Statistics",
        gamesPlayed: "Games",
        winRate: "Win Rate",
        bestScore: "Best Moves",
        moves: "Moves",
        time: "Time",
        gameTitle: "Emoji Link",
        restart: "Restart",
        back: "Exit",
        loading: "Generating Content...",
        match: "Match!",
        gameOver: "Completed!",
        playAgain: "Next Level",
        configTitle: "Settings",
        modelConfigTitle: "AI Models",
        difficulty: "Grid Size",
        topic: "Topic",
        topicPlaceholder: "e.g., Marvel Heroes, Food, Japan...",
        language: "Language",
        save: "Save Settings",
        adventureMode: "Adventure",
        customMode: "Custom Game",
        level: "Level",
        provider: "Provider",
        apiKey: "API Key",
        baseUrl: "API Base URL",
        modelName: "Model Name",
        addConfig: "Add Config",
        saveConfig: "Save",
        delete: "Delete",
        defaultEnv: "Optional (Use defaults)",
        enterKey: "sk-...",
        confirmDelete: "Delete this config?",
        adventureIntro: "Classic levels. No AI required.",
        customIntro: "Pick a topic, choose a size.",
        pairs: "Pairs",
        startCustom: "Create Game",
        setupCustom: "Custom Game Setup",
        enterTopic: "Enter a topic to generate cards",
        selectSize: "Select Grid Size",
        fallbackMessage: "AI request failed. Loaded fallback data.",
    },
    zh: {
        appTitle: "表情连连看",
        subtitle: "语义记忆游戏",
        dashboard: "首页",
        play: "开始游戏",
        settings: "设置",
        stats: "统计数据",
        gamesPlayed: "总场次",
        winRate: "胜率",
        bestScore: "最佳步数",
        moves: "步数",
        time: "时间",
        gameTitle: "表情连连看",
        restart: "重开",
        back: "退出",
        loading: "正在生成内容...",
        match: "配对成功！",
        gameOver: "挑战完成！",
        playAgain: "下一关",
        configTitle: "全局设置",
        modelConfigTitle: "AI 模型配置",
        difficulty: "网格大小",
        topic: "游戏主题",
        topicPlaceholder: "例如：漫威英雄、美食、日本...",
        language: "语言 / Language",
        save: "保存设置",
        adventureMode: "闯关模式",
        customMode: "自定义模式",
        level: "第",
        provider: "服务商",
        apiKey: "API 密钥",
        baseUrl: "API 地址",
        modelName: "模型名称",
        addConfig: "添加配置",
        saveConfig: "保存",
        delete: "删除",
        defaultEnv: "选填 (使用默认)",
        enterKey: "请输入 Key",
        confirmDelete: "确定删除吗？",
        adventureIntro: "经典关卡，无需联网。",
        customIntro: "自定义主题和难度，AI 生成。",
        pairs: "对",
        startCustom: "生成游戏",
        setupCustom: "自定义游戏设置",
        enterTopic: "输入主题，AI 将为你生成卡片",
        selectSize: "选择网格大小 (难度)",
        fallbackMessage: "AI 请求失败，已加载备用数据。",
    }
};
