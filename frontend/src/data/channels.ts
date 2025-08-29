type Channel = { 
  id: number,
  title: string;
  link: string;
  description: string;
  language: string;
  copyright: string;
  channelManager: string;
  publishedDate: string;
  category: string;
  articles: Article[]
};


type Article = {
    title: string;
    link: string;
    description: string;
    author: string;
    category: string;
    commentsLink: string;
    guid: string;
    publishedDate: string;
    source: string;
    content: string;
};

const mockChannels: Channel[] = [
  {
    id: 1,
    title: "Tech News Daily",
    link: "https://technewsdaily.com/rss",
    description: "Latest technology news and updates from around the world",
    language: "en-us",
    copyright: "© 2024 Tech News Daily. All rights reserved.",
    channelManager: "tech@technewsdaily.com",
    publishedDate: "2024-01-15T10:30:00Z",
    category: "Technology",
    articles: [
      {
        title: "New AI Model Breaks Performance Records",
        link: "https://technewsdaily.com/articles/ai-model-breaks-records",
        description: "Researchers develop groundbreaking AI model that outperforms all previous benchmarks in natural language processing",
        author: "Sarah Chen",
        category: "Artificial Intelligence",
        commentsLink: "https://technewsdaily.com/articles/ai-model-breaks-records#comments",
        guid: "technewsdaily-ai-model-2024-001",
        publishedDate: "2024-01-14T08:45:00Z",
        source: "Tech News Daily",
        content: "A team of researchers from Stanford University has developed a new AI model called NeuroNet that has set unprecedented performance records..."
      },
      {
        title: "Quantum Computing Milestone Achieved",
        link: "https://technewsdaily.com/articles/quantum-milestone",
        description: "Scientists achieve quantum supremacy with 128-qubit processor, opening new possibilities for complex computations",
        author: "Michael Rodriguez",
        category: "Quantum Computing",
        commentsLink: "https://technewsdaily.com/articles/quantum-milestone#comments",
        guid: "technewsdaily-quantum-2024-002",
        publishedDate: "2024-01-13T14:20:00Z",
        source: "Tech News Daily",
        content: "In a groundbreaking achievement, researchers at MIT have successfully demonstrated quantum supremacy using a 128-qubit quantum processor..."
      }
    ]
  },
  {
    id: 2,
    title: "Health & Wellness Insights",
    link: "https://healthinsights.org/feed",
    description: "Expert advice and latest research on health, nutrition, and wellness",
    language: "en-gb",
    copyright: "© 2024 Health Insights Ltd.",
    channelManager: "editor@healthinsights.org",
    publishedDate: "2024-01-15T09:15:00Z",
    category: "Health",
    articles: [
      {
        title: "Mediterranean Diet Linked to Longer Lifespan",
        link: "https://healthinsights.org/articles/mediterranean-diet-longevity",
        description: "New study shows significant correlation between Mediterranean diet and increased life expectancy",
        author: "Dr. Emily Watson",
        category: "Nutrition",
        commentsLink: "https://healthinsights.org/articles/mediterranean-diet-longevity#comments",
        guid: "healthinsights-diet-2024-001",
        publishedDate: "2024-01-14T11:30:00Z",
        source: "Health Insights",
        content: "A comprehensive 10-year study involving over 10,000 participants has found that adherence to the Mediterranean diet is strongly associated with..."
      },
      {
        title: "Breakthrough in Cancer Immunotherapy",
        link: "https://healthinsights.org/articles/cancer-immunotherapy",
        description: "Novel immunotherapy approach shows promising results in treating aggressive cancers",
        author: "Dr. James Thompson",
        category: "Medical Research",
        commentsLink: "https://healthinsights.org/articles/cancer-immunotherapy#comments",
        guid: "healthinsights-cancer-2024-002",
        publishedDate: "2024-01-13T16:45:00Z",
        source: "Health Insights",
        content: "Researchers at Johns Hopkins University have developed a new immunotherapy technique that has shown remarkable success in clinical trials..."
      }
    ]
  },
  {
    id: 3,
    title: "Climate Watch",
    link: "https://climatewatch.org/rss.xml",
    description: "Environmental news and climate change updates from around the globe",
    language: "en",
    copyright: "© 2024 Climate Watch Foundation",
    channelManager: "info@climatewatch.org",
    publishedDate: "2024-01-15T08:00:00Z",
    category: "Environment",
    articles: [
      {
        title: "Record Low Arctic Sea Ice Observed",
        link: "https://climatewatch.org/articles/arctic-sea-ice",
        description: "Satellite data shows unprecedented decline in Arctic sea ice coverage this winter",
        author: "Lisa Zhang",
        category: "Climate Change",
        commentsLink: "https://climatewatch.org/articles/arctic-sea-ice#comments",
        guid: "climatewatch-arctic-2024-001",
        publishedDate: "2024-01-14T13:15:00Z",
        source: "Climate Watch",
        content: "NASA's latest satellite observations reveal that Arctic sea ice has reached a record low for this time of year, raising concerns among climate scientists..."
      },
      {
        title: "Renewable Energy Adoption Hits All-Time High",
        link: "https://climatewatch.org/articles/renewable-energy",
        description: "Global renewable energy capacity grows by 15% as countries accelerate green transition",
        author: "Robert Kim",
        category: "Renewable Energy",
        commentsLink: "https://climatewatch.org/articles/renewable-energy#comments",
        guid: "climatewatch-renewable-2024-002",
        publishedDate: "2024-01-13T10:00:00Z",
        source: "Climate Watch",
        content: "The International Energy Agency reports that global renewable energy capacity increased by 15% in the past year, marking the fastest growth rate ever recorded..."
      }
    ]
  }
];

function findChannel(channelId: number) {
  return mockChannels.findIndex(channel => channel.id === channelId);
}

async function getChannels() {
    return mockChannels;
}

async function getChannel(channelId: number) {
    return mockChannels[findChannel(channelId)];
}

async function createChannel(channel: Omit<Omit<Channel, 'id'>, 'articles'>) {
    const data: Channel = {
      ...channel,
      id: mockChannels[mockChannels.length-1].id+1,
      articles: []
    };
    mockChannels.push(data);

    return data;
}

async function updateChannel(channelId: number, newData: Partial<Channel>) {
    const channelIdx = findChannel(channelId);
    const oldData = mockChannels[channelIdx];
    mockChannels[channelIdx] = {
       ...oldData,  
      ...newData
    };

    return mockChannels[channelIdx];
}

async function addArticle(channelId: number, article: Article) {
    const channel = await getChannel(channelId);

    return await updateChannel(channelId, { articles: [...channel.articles, article] });
}

export { getChannels, getChannel, createChannel, updateChannel, addArticle };
export type { Channel, Article };