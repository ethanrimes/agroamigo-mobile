# Complete Directory Structure for Expo Router React Native Project

```
.
├── app/
│   ├── _layout.tsx                # Main layout with bottom navigator
│   ├── index.tsx                  # Home page screen
│   ├── products.tsx               # Products selection page screen
│   ├── markets.tsx                # Markets selection page screen
│   ├── insumos.tsx                # Insumos selection page screen
│   └── (detail)/                  # Consolidated detail routing group
│       ├── _layout.tsx            # Shared detail layout
│       ├── [producto].tsx         # Product detail page with dynamic route
│       ├── [mercado].tsx          # Market detail page with dynamic route
│       └── [insumo].tsx           # Insumo detail page with dynamic route
│
├── assets/
│   ├── fonts/                     # Custom font files
│   ├── images/                    # Image assets
│   │   └── logo.png               # App logo
│   └── icons/                     # Icon assets
│       ├── pin.svg                # Location pin icon
│       ├── category-icons/        # Category-specific icons
│       └── trend-icons/           # Trend indicator icons
│
├── src/
│   ├── theme/
│   │   ├── index.ts               # Export theme features
│   │   ├── base/
│   │   │   ├── colors.ts          # Color palette definitions
│   │   │   ├── typography.ts      # Font families, sizes, weights
│   │   │   ├── spacing.ts         # Spacing system
│   │   │   └── index.ts           # Exports all base theme elements
│   │   ├── adapters/
│   │   │   ├── gluestack.ts       # Adapter for Gluestack UI
│   │   │   ├── react-native-elements.ts # Adapter for RNE
│   │   │   └── index.ts           # Exports all adapters
│   │   └── providers/
│   │       ├── ThemeProvider.tsx  # Root theme provider
│   │       └── index.ts           # Exports providers
│   │
│   ├── hooks/
│   │   ├── index.ts               # Export all app-wide hooks
│   │   ├── useQuery.ts            # Generic data fetching hook
│   │   ├── useMutation.ts         # Generic data mutation hook
│   │   ├── useSupabase.ts         # Hook to access Supabase client
│   │   └── useTheme.ts            # Hook to access theme values
│   │
│   ├── components/
│   │   ├── index.ts               # Export all reusable components
│   │   ├── ui/
│   │   │   ├── buttons/
│   │   │   │   ├── BackButton.tsx
│   │   │   │   ├── FilterButton.tsx
│   │   │   │   ├── InformationButton.tsx
│   │   │   │   └── index.ts
│   │   │   ├── navigation/
│   │   │   │   ├── TabNavigator.tsx
│   │   │   │   └── index.ts
│   │   │   ├── typography/
│   │   │   │   ├── Text.tsx
│   │   │   │   └── index.ts
│   │   │   ├── layout/
│   │   │   │   ├── Separator.tsx
│   │   │   │   └── index.ts
│   │   │   ├── search/
│   │   │   │   ├── SearchBar.tsx
│   │   │   │   └── index.ts
│   │   │   ├── icons/
│   │   │   │   ├── Logo.tsx
│   │   │   │   ├── Pin.tsx
│   │   │   │   ├── CategoryIcon.tsx
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── charts/
│   │   │   ├── HistoricalPriceLineGraph.tsx
│   │   │   ├── MarketPriceDistribution.tsx
│   │   │   └── index.ts
│   │   └── animations/
│   │       ├── CarouselScrolling.tsx
│   │       ├── NewsBulletTransition.tsx
│   │       └── index.ts
│   │
│   ├── features/
│   │   ├── home/
│   │   │   ├── index.ts           # Export feature components
│   │   │   ├── screens/
│   │   │   │   └── HomeScreen.tsx
│   │   │   ├── components/
│   │   │   │   ├── index.ts       # Export all components
│   │   │   │   ├── HomeScreen.tsx # High level component
│   │   │   │   ├── header/
│   │   │   │   │   ├── index.ts   # Export header components
│   │   │   │   │   ├── HomeHeader.tsx
│   │   │   │   │   ├── ThinHeaderStrip.tsx
│   │   │   │   │   └── SearchLocationContainer.tsx
│   │   │   │   └── body/
│   │   │   │       ├── index.ts   # Export body components
│   │   │   │       ├── HomePageContentSpace.tsx
│   │   │   │       ├── HomePageContentElement.tsx
│   │   │   │       ├── SharedPricesCarousel.tsx
│   │   │   │       ├── SavedPriceTile.tsx
│   │   │   │       ├── TrendTicker.tsx
│   │   │   │       ├── HomeNewsSection.tsx
│   │   │   │       └── NewsBullet.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useHomeData.ts
│   │   │   │   ├── useHomeActions.ts
│   │   │   │   └── index.ts
│   │   │   └── api/
│   │   │       ├── queries.ts
│   │   │       ├── mutations.ts
│   │   │       └── index.ts
│   │   │
│   │   ├── selection/
│   │   │   ├── index.ts
│   │   │   ├── screens/
│   │   │   │   ├── ProductsSelectionScreen.tsx
│   │   │   │   ├── MarketsSelectionScreen.tsx
│   │   │   │   ├── InsumosSelectionScreen.tsx
│   │   │   │   └── index.ts
│   │   │   ├── components/
│   │   │   │   ├── index.ts       # Export all components
│   │   │   │   ├── SelectionScreen.tsx          # High level component
│   │   │   │   ├── ProductoInsumoBody.tsx       # High level component
│   │   │   │   ├── SlidingSideDrawer.tsx        # High level component
│   │   │   │   ├── header/
│   │   │   │   │   ├── index.ts   # Export header components
│   │   │   │   │   ├── SelectionHeader.tsx
│   │   │   │   │   ├── ThinHeaderStrip.tsx
│   │   │   │   │   └── FilterButton.tsx
│   │   │   │   ├── body/
│   │   │   │   │   ├── index.ts   # Export body components
│   │   │   │   │   ├── SelectionPageContentSpace.tsx
│   │   │   │   │   ├── SelectionPageCategory.tsx
│   │   │   │   │   ├── CategoryHeader.tsx
│   │   │   │   │   ├── SubCategoryHeader.tsx
│   │   │   │   │   └── SelectionListItem.tsx
│   │   │   │   └── drawer/
│   │   │   │       ├── index.ts   # Export drawer components
│   │   │   │       ├── SideDrawerHeader.tsx
│   │   │   │       ├── SideDrawerContentSpace.tsx
│   │   │   │       └── FilterElement.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useSelectionData.ts
│   │   │   │   ├── useSelectionFilters.ts
│   │   │   │   └── index.ts
│   │   │   └── api/
│   │   │       ├── queries.ts
│   │   │       ├── mutations.ts
│   │   │       └── index.ts
│   │   │
│   │   └── detail/
│   │       ├── index.ts
│   │       ├── screens/
│   │       │   ├── ProductDetailScreen.tsx
│   │       │   ├── MarketDetailScreen.tsx
│   │       │   ├── InsumoDetailScreen.tsx
│   │       │   └── index.ts
│   │       ├── components/
│   │       │   ├── index.ts                  # Export all components
│   │       │   ├── DetailScreen.tsx          # High level component
│   │       │   ├── DetailPageModal.tsx       # High level component
│   │       │   ├── MarketComparisonTable.tsx # High level component
│   │       │   ├── AIInsights.tsx            # High level component
│   │       │   ├── header/
│   │       │   │   ├── index.ts              # Export header components
│   │       │   │   ├── DetailPageHeader.tsx
│   │       │   │   ├── BackArrow.tsx
│   │       │   │   ├── CurrentPriceDetail.tsx
│   │       │   │   ├── DateStamp.tsx
│   │       │   │   ├── PriceDetailHeaderFooters.tsx
│   │       │   │   ├── SelectedCity.tsx
│   │       │   │   └── SelectCityIcon.tsx
│   │       │   ├── modal/
│   │       │   │   ├── index.ts              # Export modal components 
│   │       │   │   ├── DetailPageModalHeader.tsx
│   │       │   │   ├── ModalContentSpace.tsx
│   │       │   │   └── FilterElement.tsx
│   │       │   ├── body/
│   │       │   │   ├── index.ts              # Export body components
│   │       │   │   ├── DetailPageContentSpace.tsx
│   │       │   │   ├── MarketComparisonTableHeader.tsx
│   │       │   │   ├── MarketComparisonTableSection.tsx
│   │       │   │   ├── MarketComparisonTableEntry.tsx
│   │       │   │   ├── TableVerMas.tsx
│   │       │   │   ├── HistoricalPriceContent.tsx
│   │       │   │   └── MarketPriceDistributionContent.tsx
│   │       ├── hooks/
│   │       │   ├── useDetailData.ts
│   │       │   ├── useDetailFilters.ts
│   │       │   └── index.ts
│   │       └── api/
│   │           ├── queries.ts
│   │           ├── mutations.ts
│   │           └── index.ts
│   │
│   ├── services/
│   │   ├── index.ts               # Export all services
│   │   ├── supabase/
│   │   │   ├── client.ts          # Supabase client setup
│   │   │   ├── auth.ts            # Authentication methods
│   │   │   ├── db.ts              # General database utility functions
│   │   │   ├── entities/          # Entity-specific database operations
│   │   │   │   ├── users.ts       # User-related queries
│   │   │   │   ├── products.ts    # Product-related queries
│   │   │   │   ├── markets.ts     # Market-related queries
│   │   │   │   ├── insumos.ts     # Insumo-related queries
│   │   │   │   ├── prices.ts      # Price-related queries
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── ai/
│   │   │   ├── client.ts          # ChatGPT API client
│   │   │   ├── insights.ts        # AI insights generation
│   │   │   └── index.ts
│   │   ├── location/
│   │   │   ├── client.ts          # Google Places API client
│   │   │   ├── geolocation.ts     # Device geolocation utilities
│   │   │   └── index.ts
│   │   ├── api.ts                 # Base API setup
│   │   └── cache/
│   │       ├── index.ts
│   │       ├── storage.ts
│   │       └── strategies/
│   │           ├── memoryCacheStrategy.ts
│   │           ├── asyncStorageStrategy.ts
│   │           └── index.ts
│   │
│   ├── utils/
│   │   ├── index.ts               # Export all utilities
│   │   ├── formatters.ts          # Data formatting utilities
│   │   ├── validators.ts          # Input validation utilities
│   │   └── dateHelpers.ts         # Date manipulation utilities
│   │
│   ├── store/
│   │   ├── index.ts               # Export all stores
│   │   ├── userStore.ts           # User-related global state
│   │   ├── locationStore.ts       # Location-related global state
│   │   ├── filterStore.ts         # Filter-related global state
│   │   └── themeStore.ts          # Theme preferences global state
│   │
│   └── constants/
│       ├── index.ts               # Export all constants
│       ├── routes.ts              # Route constants
│       ├── apiEndpoints.ts        # API endpoint constants
│       └── config.ts              # App configuration constants
│
├── babel.config.js                # Babel configuration
├── metro.config.js                # Metro bundler configuration
├── app.json                       # Expo application configuration
├── tsconfig.json                  # TypeScript configuration
├── package.json                   # Project dependencies
└── README.md                      # Project documentation
```