import type { ThemeConfig } from 'antd';

export const BRAND = '#4f46e5';
export const NAVY = '#0f172a';

export const theme: ThemeConfig = {
  token: {
    colorPrimary: BRAND,
    borderRadius: 10,
    colorBgLayout: '#f4f6fb',
    fontFamily:
      "'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans KR', sans-serif",
  },
  components: {
    Layout: { headerBg: '#ffffff', siderBg: NAVY, headerPadding: '0 24px' },
    Menu: {
      darkItemBg: NAVY,
      darkSubMenuItemBg: NAVY,
      darkItemSelectedBg: BRAND,
      itemBorderRadius: 8,
    },
    Card: { paddingLG: 20 },
  },
};
